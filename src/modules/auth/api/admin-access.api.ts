import { apiClient } from "../../../shared/api";
import type { AdminAccess } from "../types";

export const adminAccessApi = {
	getMyAccess(): Promise<AdminAccess> {
		return apiClient.get<AdminAccess>("/admin/access/me");
	},
};
