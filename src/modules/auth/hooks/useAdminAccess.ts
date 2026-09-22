import { useQuery } from "@tanstack/react-query";

import { ApiError, tokenStorage } from "../../../shared/api";
import { adminAccessApi } from "../api";
import { authQueryKeys } from "./auth-query-keys";

export function useAdminAccess() {
	const hasAccessToken = tokenStorage.getAccessToken() !== null;

	return useQuery({
		queryKey: authQueryKeys.adminAccess(),
		queryFn: () => adminAccessApi.getMyAccess(),
		enabled: hasAccessToken,
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
