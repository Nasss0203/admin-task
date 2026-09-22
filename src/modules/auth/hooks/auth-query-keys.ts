export const authQueryKeys = {
	all: ["auth"] as const,

	adminAccess: () => [...authQueryKeys.all, "admin-access"] as const,
};
