import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import type { ApiErrorResponse, ApiResponse } from "../types";
import { ApiError } from "./api-error";
import { tokenStorage } from "./token-storage";

interface ApiRequestConfig extends Omit<
	AxiosRequestConfig,
	"url" | "method" | "data" | "auth"
> {
	auth?: boolean;
}

const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

if (!baseURL) {
	throw new Error("VITE_API_BASE_URL is not configured");
}

const publicInstance = axios.create({
	baseURL,
	timeout: 10_000,
	headers: {
		Accept: "application/json",
	},
});

const authenticatedInstance = axios.create({
	baseURL,
	timeout: 10_000,
	headers: {
		Accept: "application/json",
	},
});

function normalizePath(path: string): string {
	return path.startsWith("/") ? path : `/${path}`;
}

function normalizeAxiosError(error: unknown): ApiError {
	if (error instanceof ApiError) {
		return error;
	}

	if (!axios.isAxiosError(error)) {
		return new ApiError({
			statusCode: 0,
			code: "UNKNOWN_ERROR",
			message: "An unexpected error occurred",
		});
	}

	const statusCode = error.response?.status ?? 0;
	const rawPayload = error.response?.data as unknown;

	const errorPayload =
		rawPayload && typeof rawPayload === "object"
			? (rawPayload as Partial<ApiErrorResponse>)
			: undefined;

	let message: string | string[];

	if (errorPayload?.message) {
		message = errorPayload.message;
	} else if (typeof rawPayload === "string") {
		message = rawPayload;
	} else if (statusCode === 0) {
		message = "Cannot connect to the server";
	} else {
		message = error.message || "Request failed";
	}

	return new ApiError({
		statusCode: errorPayload?.statusCode ?? statusCode,
		code:
			errorPayload?.code ??
			(statusCode === 0 ? "NETWORK_ERROR" : error.code),
		message,
		path: errorPayload?.path,
		timestamp: errorPayload?.timestamp,
	});
}

authenticatedInstance.interceptors.request.use(
	(config) => {
		const accessToken = tokenStorage.getAccessToken();

		if (accessToken) {
			config.headers.set("Authorization", `Bearer ${accessToken}`);
		}

		return config;
	},
	(error: unknown) => {
		return Promise.reject(normalizeAxiosError(error));
	},
);

function configureResponseInterceptor(
	instance: AxiosInstance,
	clearTokenOnUnauthorized: boolean,
): void {
	instance.interceptors.response.use(
		(response) => response,
		(error: unknown) => {
			const apiError = normalizeAxiosError(error);

			if (clearTokenOnUnauthorized && apiError.statusCode === 401) {
				tokenStorage.removeAccessToken();

				if (
					typeof window !== "undefined" &&
					window.location.pathname !== "/login"
				) {
					window.location.assign("/login");
				}
			}

			return Promise.reject(apiError);
		},
	);
}

configureResponseInterceptor(publicInstance, false);
configureResponseInterceptor(authenticatedInstance, true);

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
