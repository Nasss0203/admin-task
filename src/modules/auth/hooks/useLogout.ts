import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { authLifecycle } from "../services/auth-lifecycle";
import { authQueryKeys } from "./auth-query-keys";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => authLifecycle.logout(),

		onSettled: () => {
			queryClient.removeQueries({ queryKey: authQueryKeys.all });
			navigate("/login", { replace: true });
		},
	});
}
