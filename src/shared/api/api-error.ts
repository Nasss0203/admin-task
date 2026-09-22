import type { ApiErrorResponse } from "../types";

export class ApiError extends Error {
	readonly statusCode: number;
	readonly code?: string;
	readonly path?: string;
	readonly timestamp?: string;

	constructor(payload: ApiErrorResponse) {
		const message = Array.isArray(payload.message)
			? payload.message.join(", ")
			: payload.message;

		super(message);

		this.name = "ApiError";
		this.statusCode = payload.statusCode;
		this.code = payload.code;
		this.path = payload.path;
		this.timestamp = payload.timestamp;
	}

	get isUnauthorized(): boolean {
		return this.statusCode === 401;
	}

	get isForbidden(): boolean {
		return this.statusCode === 403;
	}

	get isNotFound(): boolean {
		return this.statusCode === 404;
	}
}
