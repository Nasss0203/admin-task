import axios from "axios";

import type { ApiErrorResponse } from "../types";
import { ApiError } from "./api-error";

export function normalizeApiError(error: unknown): ApiError {
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
