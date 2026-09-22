import { apiClient } from "@/shared/api";
import type { AdminDashboardOverview } from "../types";

export const dashboardApi = {
	getOverview(): Promise<AdminDashboardOverview> {
		return apiClient.get<AdminDashboardOverview>(
			"/admin/dashboard/overview",
		);
	},
};
