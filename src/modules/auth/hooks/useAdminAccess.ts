import { useQuery } from "@tanstack/react-query";

import { ApiError } from "../../../shared/api";
import { adminAccessApi } from "../api";
import { useAuthStore } from "../store/auth-store";
import { authQueryKeys } from "./auth-query-keys";

export function useAdminAccess() {
	const { accessToken, isBootstrapped } = useAuthStore();

	return useQuery({
		queryKey: authQueryKeys.adminAccess(),
		queryFn: () => adminAccessApi.getMyAccess(),
		enabled: isBootstrapped && accessToken !== null,
		staleTime: 5 * 60 * 1000,

		retry: (failureCount, error) => {
			if (
				error instanceof ApiError &&
				(error.isUnauthorized || error.isForbidden)
			) {
				return false;
			}

			return failureCount < 1;
		},
	});
}
