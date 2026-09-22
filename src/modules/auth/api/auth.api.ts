import { apiClient } from "../../../shared/api";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export const authApi = {
	login(payload: LoginRequest): Promise<LoginResponse> {
		return apiClient.post<LoginResponse, LoginRequest>(
			"/auth/login",
			payload,
			{
				auth: false,
			},
		);
	},
};
