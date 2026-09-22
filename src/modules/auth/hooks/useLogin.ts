import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { tokenStorage } from "../../../shared/api";
import { authApi } from "../api";
import type { LoginRequest } from "../types";

export function useLogin() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (payload: LoginRequest) => authApi.login(payload),

		onSuccess: (response) => {
			tokenStorage.setAccessToken(response.access_token);
			navigate("/", {
				replace: true,
			});
		},
	});
}
