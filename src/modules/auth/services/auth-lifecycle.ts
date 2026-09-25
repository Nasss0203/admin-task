import { refreshAccessToken } from "@/shared/api/api-client";

import { authGateway } from "../api/auth-gateway";
import { authStore } from "../store/auth-store";
import type { AuthUser } from "../types/auth-user.types";
import type { LoginRequest } from "../types/auth.types";
import { createAuthLifecycle } from "./auth-lifecycle-core";

export const authLifecycle = createAuthLifecycle<LoginRequest, AuthUser>(
	authStore,
	{
		login: (credentials) => authGateway.login(credentials),
		refresh: async () => ({
			access_token: await refreshAccessToken(),
		}),
		getMe: (accessToken) => authGateway.getMe(accessToken),
		logout: () => authGateway.logout(),
	},
);
