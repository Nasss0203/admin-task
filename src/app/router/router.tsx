import { createBrowserRouter, Navigate } from "react-router-dom";

import { AdminLayout } from "@/app/layouts/AdminLayout/AdminLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout/AuthLayout";
import { AdminRouteFallback } from "@/shared/components/AdminRouteFallback";
import { ModuleOverviewPage } from "@/shared/components/ModuleOverviewPage";

const overviewRoutes = [
	[
		"teamspaces",
		"Teamspaces",
		"Organize and inspect collaboration spaces across every workspace.",
	],
	[
		"content",
		"Content integrity",
		"Inspect pages, blocks, databases, and files across the platform.",
	],
	[
		"published-sites",
		"Published sites",
		"Monitor public sites, custom domains, abuse signals, and availability.",
	],
	[
		"templates",
		"Templates",
		"Review, moderate, and manage the platform template catalog.",
	],
	[
		"ai",
		"AI operations",
		"Monitor generations, models, RAG indexing, usage, and evaluations.",
	],
	[
		"search",
		"Search operations",
		"Track search quality, indexing health, and zero-result queries.",
	],
	[
		"billing",
		"Plans & billing",
		"Manage plans, subscriptions, invoices, quotas, and usage.",
	],
	[
		"feature-flags",
		"Feature flags",
		"Coordinate staged rollouts by environment, plan, and tenant.",
	],
	[
		"notifications",
		"Notifications",
		"Manage system announcements, delivery health, and email operations.",
	],
	[
		"jobs",
		"Background jobs",
		"Inspect queue throughput, scheduled jobs, retries, and failures.",
	],
	[
		"security",
		"Audit & security",
		"Investigate audit logs, sessions, login events, and blocked resources.",
	],
	[
		"support",
		"Support lookup",
		"Find accounts and workspaces while preserving a complete audit trail.",
	],
	[
		"monitoring",
		"System monitoring",
		"Observe API, PostgreSQL, Redis, AI services, and application errors.",
	],
	[
		"access-control",
		"Access control",
		"Manage admin roles, permissions, and privileged access reviews.",
	],
	[
		"system",
		"System settings",
		"Control platform settings, maintenance, retention, and backups.",
	],
] as const;

export const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		HydrateFallback: AdminRouteFallback,
		children: [
			{
				path: "/login",
				lazy: async () => {
					const module =
						await import("@/modules/auth/pages/LoginPage");
					return { Component: module.LoginPage };
				},
			},
		],
	},
	{
		path: "/",
		element: <AdminLayout />,
		HydrateFallback: AdminRouteFallback,
		children: [
			{
				index: true,
				lazy: async () => {
					const module =
						await import("@/modules/dashboard/pages/DashboardPage");
					return { Component: module.DashboardPage };
				},
			},
			{
				path: "users",
				lazy: async () => {
					const module =
						await import("@/modules/users/pages/UsersPage");
					return { Component: module.UsersPage };
				},
			},
			{
				path: "workspaces",
				lazy: async () => {
					const module =
						await import("@/modules/workspaces/pages/WorkspacesPage");
					return { Component: module.WorkspacesPage };
				},
			},
			...overviewRoutes.map(([path, title, description]) => ({
				path,
				element: (
					<ModuleOverviewPage
						title={title}
						description={description}
					/>
				),
			})),
		],
	},
	{ path: "*", element: <Navigate to='/' replace /> },
]);
