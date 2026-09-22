import { useQuery } from "@tanstack/react-query";

import { dashboardApi } from "../api";
import { dashboardQueryKeys } from "./dashboard-query-keys";

export function useAdminDashboardOverview() {
	return useQuery({
		queryKey: dashboardQueryKeys.overview(),
		queryFn: dashboardApi.getOverview,
		staleTime: 60_000,
	});
}
