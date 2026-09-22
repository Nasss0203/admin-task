import type { AdminPermission, SystemRole } from "../../../shared/permissions";

export interface AdminAccess {
	userId: string;
	systemRole: SystemRole;
	permissions: readonly AdminPermission[];
}
