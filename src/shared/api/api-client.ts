import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type InternalAxiosRequestConfig,
} from "axios";

import { authGateway } from "@/modules/auth/api/auth-gateway";
import { authStore } from "@/modules/auth/store/auth-store";

import type { ApiResponse } from "../types";
import { API_CONFIG } from "./api-config";
import { ApiError } from "./api-error";
import { normalizeApiError } from "./normalize-api-error";
import { createSingleFlight } from "./single-flight";

interface ApiRequestConfig extends Omit<
	AxiosRequestConfig,
	"url" | "method" | "data" | "auth"
> {
	auth?: boolean;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const publicInstance = axios.create(API_CONFIG);
const authenticatedInstance = axios.create(API_CONFIG);
const refreshFlight = createSingleFlight<string>();

function normalizePath(path: string): string {
	return path.startsWith("/") ? path : `/${path}`;
}

export function refreshAccessToken(): Promise<string> {
	return refreshFlight.run(async () => {
		const response = await authGateway.refresh();
		authStore.setAccessToken(response.access_token);
		return response.access_token;
	});
}

authenticatedInstance.interceptors.request.use(
	(config) => {
		const { accessToken } = authStore.getState();

		if (accessToken) {
			config.headers.set("Authorization", `Bearer ${accessToken}`);
		}

		return config;
	},
	(error: unknown) => {
		return Promise.reject(normalizeApiError(error));
	},
);

function configurePublicResponseInterceptor(instance: AxiosInstance): void {
	instance.interceptors.response.use(
		(response) => response,
		(error: unknown) => Promise.reject(normalizeApiError(error)),
	);
}

configurePublicResponseInterceptor(publicInstance);

authenticatedInstance.interceptors.response.use(
	(response) => response,
	async (error: unknown) => {
		const apiError = normalizeApiError(error);
		const requestConfig = axios.isAxiosError(error)
			? (error.config as RetryableRequestConfig | undefined)
			: undefined;

		if (apiError.statusCode !== 401 || !requestConfig || requestConfig._retry) {
			return Promise.reject(apiError);
		}

		requestConfig._retry = true;

		try {
			const accessToken = await refreshAccessToken();
			requestConfig.headers.set(
				"Authorization",
				`Bearer ${accessToken}`,
			);
			return await authenticatedInstance.request(requestConfig);
		} catch (refreshError) {
			authStore.clear();
			return Promise.reject(normalizeApiError(refreshError));
		}
	},
);

async function request<T>(
	method: AxiosRequestConfig["method"],
	path: string,
	body?: unknown,
	config: ApiRequestConfig = {},
): Promise<T> {
	const { auth = true, ...axiosConfig } = config;

	const instance = auth ? authenticatedInstance : publicInstance;

	const response = await instance.request<ApiResponse<T>>({
		...axiosConfig,
		method,
		url: normalizePath(path),
		data: body,
	});

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

export const apiClient = {
	get<T>(path: string, config?: ApiRequestConfig): Promise<T> {
		return request<T>("GET", path, undefined, config);
	},

	post<TResponse, TBody = unknown>(
		path: string,
		body?: TBody,
		config?: ApiRequestConfig,
	): Promise<TResponse> {
		return request<TResponse>("POST", path, body, config);
	},

	patch<TResponse, TBody = unknown>(
		path: string,
		body?: TBody,
		config?: ApiRequestConfig,
	): Promise<TResponse> {
		return request<TResponse>("PATCH", path, body, config);
	},

	put<TResponse, TBody = unknown>(
		path: string,
		body?: TBody,
		config?: ApiRequestConfig,
	): Promise<TResponse> {
		return request<TResponse>("PUT", path, body, config);
	},

	delete<T>(path: string, config?: ApiRequestConfig): Promise<T> {
		return request<T>("DELETE", path, undefined, config);
	},
};
