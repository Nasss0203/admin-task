import { useSyncExternalStore } from "react";

import type { AuthUser } from "../types/auth-user.types";

export interface AuthState {
	accessToken: string | null;
	user: AuthUser | null;
	isBootstrapping: boolean;
	isBootstrapped: boolean;
}

const initialState: AuthState = {
	accessToken: null,
	user: null,
	isBootstrapping: false,
	isBootstrapped: false,
};

let state = initialState;
const listeners = new Set<() => void>();

function updateState(nextState: AuthState): void {
	state = nextState;
	listeners.forEach((listener) => listener());
}

export const authStore = {
	getState(): AuthState {
		return state;
	},

	subscribe(listener: () => void): () => void {
		listeners.add(listener);
		return () => listeners.delete(listener);
	},

	setAccessToken(accessToken: string): void {
		updateState({ ...state, accessToken });
	},

	setUser(user: AuthUser): void {
		updateState({ ...state, user });
	},

	startBootstrap(): void {
		updateState({
			...state,
			isBootstrapping: true,
			isBootstrapped: false,
		});
	},

	finishBootstrap(): void {
		updateState({
			...state,
			isBootstrapping: false,
			isBootstrapped: true,
		});
	},

	clear(): void {
		updateState({
			...state,
			accessToken: null,
			user: null,
		});
	},
};

export function useAuthStore(): AuthState {
	return useSyncExternalStore(
		authStore.subscribe,
		authStore.getState,
		authStore.getState,
	);
}
