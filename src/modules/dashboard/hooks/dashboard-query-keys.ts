export const dashboardQueryKeys = {
	all: ["admin", "dashboard"] as const,

	overview: () => [...dashboardQueryKeys.all, "overview"] as const,
};
