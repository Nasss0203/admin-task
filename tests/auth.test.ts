import assert from "node:assert/strict";
import test from "node:test";

import {
	createLoginRequest,
	createLogoutRequest,
	createRefreshRequest,
} from "../src/shared/api/auth-request.ts";
import { createSingleFlight } from "../src/shared/api/single-flight.ts";
import {
	createAuthLifecycle,
	type LifecycleState,
} from "../src/modules/auth/services/auth-lifecycle-core.ts";
import { getAuthRouteDecision } from "../src/modules/auth/services/auth-route.ts";

interface TestUser {
	id: string;
	email: string;
}

interface Credentials {
	email: string;
	password: string;
}

function createTestStore() {
	let state: LifecycleState<TestUser> & { isBootstrapping: boolean } = {
		accessToken: null,
		user: null,
		isBootstrapped: false,
		isBootstrapping: false,
	};

	return {
		getState: () => state,
		setAccessToken: (accessToken: string) => {
			state = { ...state, accessToken };
		},
		setUser: (user: TestUser) => {
			state = { ...state, user };
		},
		startBootstrap: () => {
			state = {
				...state,
				isBootstrapping: true,
				isBootstrapped: false,
			};
		},
		finishBootstrap: () => {
			state = {
				...state,
				isBootstrapping: false,
				isBootstrapped: true,
			};
		},
		clear: () => {
			state = { ...state, accessToken: null, user: null };
		},
	};
}

function createDependencies(overrides: Record<string, unknown> = {}) {
	return {
		login: async () => ({
			access_token: "login-access",
		}),
		refresh: async () => ({ access_token: "refreshed-access" }),
		getMe: async () => ({
			id: "user-1",
			email: "admin@example.com",
		}),
		logout: async () => undefined,
		...overrides,
	};
}

test("login stores only the access token and current user in memory", async () => {
	const store = createTestStore();
	const lifecycle = createAuthLifecycle<Credentials, TestUser>(
		store,
		createDependencies({
			login: async () => ({
				access_token: "login-access",
				refresh_token: "must-be-ignored",
			}),
		}),
	);

	await lifecycle.login({ email: "admin@example.com", password: "secret" });

	assert.deepEqual(store.getState(), {
		accessToken: "login-access",
		user: { id: "user-1", email: "admin@example.com" },
		isBootstrapped: false,
		isBootstrapping: false,
	});
});

test("refresh and logout requests send an empty body with credentials", () => {
	assert.deepEqual(createRefreshRequest(), {
		method: "POST",
		url: "/auth/refresh",
		data: {},
		withCredentials: true,
	});
	assert.deepEqual(createLogoutRequest(), {
		method: "POST",
		url: "/auth/logout",
		data: {},
		withCredentials: true,
	});
	assert.equal(
		createLoginRequest({ email: "admin@example.com" }).withCredentials,
		true,
	);
});

test("concurrent unauthorized requests share one refresh operation", async () => {
	const singleFlight = createSingleFlight<string>();
	let refreshCalls = 0;
	let resolveRefresh: ((value: string) => void) | undefined;
	const task = () => {
		refreshCalls += 1;
		return new Promise<string>((resolve) => {
			resolveRefresh = resolve;
		});
	};

	const first = singleFlight.run(task);
	const second = singleFlight.run(task);

	assert.equal(refreshCalls, 1);
	assert.equal(first, second);
	resolveRefresh?.("new-access");
	assert.deepEqual(await Promise.all([first, second]), [
		"new-access",
		"new-access",
	]);
});

test("reload bootstrap refreshes first and then loads /auth/me", async () => {
	const store = createTestStore();
	const calls: string[] = [];
	const lifecycle = createAuthLifecycle<Credentials, TestUser>(
		store,
		createDependencies({
			refresh: async () => {
				calls.push("refresh");
				return { access_token: "refreshed-access" };
			},
			getMe: async (accessToken: string) => {
				calls.push(`me:${accessToken}`);
				return { id: "user-1", email: "admin@example.com" };
			},
		}),
	);

	assert.equal(await lifecycle.bootstrap(), true);
	assert.deepEqual(calls, ["refresh", "me:refreshed-access"]);
	assert.equal(store.getState().isBootstrapped, true);
	assert.equal(store.getState().user?.id, "user-1");
});

test("failed refresh clears auth and makes the guard choose login", async () => {
	const store = createTestStore();
	const lifecycle = createAuthLifecycle<Credentials, TestUser>(
		store,
		createDependencies({
			refresh: async () => {
				throw new Error("expired");
			},
		}),
	);

	assert.equal(await lifecycle.bootstrap(), false);
	assert.equal(
		getAuthRouteDecision(store.getState()),
		"login",
	);
	assert.equal(store.getState().user, null);
});

test("logout clears local auth even when the server request fails", async () => {
	const store = createTestStore();
	store.setAccessToken("existing-access");
	store.setUser({ id: "user-1", email: "admin@example.com" });
	const lifecycle = createAuthLifecycle<Credentials, TestUser>(
		store,
		createDependencies({
			logout: async () => {
				throw new Error("network error");
			},
		}),
	);

	await assert.rejects(lifecycle.logout(), /network error/);
	assert.equal(store.getState().accessToken, null);
	assert.equal(store.getState().user, null);
});
