export interface ApiResponse<T> {
	statusCode: number;
	message: string;
	data: T;
}

export interface ApiErrorResponse {
	statusCode: number;
	code?: string;
	message: string | string[];
	path?: string;
	timestamp?: string;
}
