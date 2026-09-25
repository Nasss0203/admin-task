export type AuthRouteDecision = "loading" | "login" | "authorized";

export function getAuthRouteDecision(state: {
	isBootstrapped: boolean;
	accessToken: string | null;
}): AuthRouteDecision {
	if (!state.isBootstrapped) {
		return "loading";
	}

	return state.accessToken ? "authorized" : "login";
}
