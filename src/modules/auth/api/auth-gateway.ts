import axios, { type AxiosRequestConfig } from "axios";

import { API_CONFIG } from "@/shared/api/api-config";
import {
	createLoginRequest,
	createLogoutRequest,
	createMeRequest,
	createRefreshRequest,
} from "@/shared/api/auth-request";
import { ApiError } from "@/shared/api/api-error";
import { normalizeApiError } from "@/shared/api/normalize-api-error";
import type { ApiResponse } from "@/shared/types";

import type { AuthUser } from "../types/auth-user.types";
import type {
	LoginRequest,
	LoginResponse,
} from "../types/auth.types";

const rawAuthInstance = axios.create(API_CONFIG);

rawAuthInstance.interceptors.response.use(
	(response) => response,
	(error: unknown) => Promise.reject(normalizeApiError(error)),
);

async function executeAuthRequest<T>(
	config: AxiosRequestConfig,
): Promise<T> {
	const response = await rawAuthInstance.request<ApiResponse<T>>(config);

	if (response.status === 204) {
		return undefined as T;
	}

	const payload = response.data as unknown;

	if (!payload || typeof payload !== "object" || !("data" in payload)) {
		throw new ApiError({
			statusCode: response.status,
			code: "INVALID_RESPONSE",
			message: "The server returned an invalid response",
		});
	}

	return (payload as ApiResponse<T>).data;
}

export const authGateway = {
	login(payload: LoginRequest): Promise<LoginResponse> {
		return executeAuthRequest<LoginResponse>(createLoginRequest(payload));
	},

	refresh(): Promise<LoginResponse> {
		return executeAuthRequest<LoginResponse>(createRefreshRequest());
	},

	getMe(accessToken: string): Promise<AuthUser> {
		return executeAuthRequest<AuthUser>(createMeRequest(accessToken));
	},

	logout(): Promise<void> {
		return executeAuthRequest<void>(createLogoutRequest());
	},
};
