import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { authLifecycle } from "../services/auth-lifecycle";
import type { LoginRequest } from "../types";

export function useLogin() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (payload: LoginRequest) => authLifecycle.login(payload),

		onSuccess: () => {
			navigate("/", {
				replace: true,
			});
		},
	});
}
