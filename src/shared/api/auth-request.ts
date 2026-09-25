export interface AuthRequestSpec<TBody = undefined> {
	method: "GET" | "POST";
	url: string;
	data?: TBody;
	withCredentials: true;
	headers?: {
		Authorization: string;
	};
}

export function createLoginRequest<TBody>(
	payload: TBody,
): AuthRequestSpec<TBody> {
	return {
		method: "POST",
		url: "/auth/login",
		data: payload,
		withCredentials: true,
	};
}

export function createRefreshRequest(): AuthRequestSpec<
	Record<string, never>
> {
	return {
		method: "POST",
		url: "/auth/refresh",
		data: {},
		withCredentials: true,
	};
}

export function createLogoutRequest(): AuthRequestSpec<
	Record<string, never>
> {
	return {
		method: "POST",
		url: "/auth/logout",
		data: {},
		withCredentials: true,
	};
}

export function createMeRequest(accessToken: string): AuthRequestSpec {
	return {
		method: "GET",
		url: "/auth/me",
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
}
