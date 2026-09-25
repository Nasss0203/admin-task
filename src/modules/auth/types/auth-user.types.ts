import type { SystemRole } from "@/shared/permissions";

export interface AuthUser {
	id: string;
	email: string;
	username: string;
	avatarUrl: string | null;
	isActive: boolean;
	systemRole: SystemRole;
	lastActiveWorkspaceId: string | null;
	createdAt: string;
	updatedAt: string;
}
