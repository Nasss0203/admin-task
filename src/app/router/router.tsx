import { createBrowserRouter, Navigate } from "react-router-dom";

import { AdminLayout } from "@/app/layouts/AdminLayout/AdminLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout/AuthLayout";
import { AdminRouteFallback } from "@/shared/components/AdminRouteFallback";

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
			{
				path: "teamspaces",
				lazy: async () => {
					const module = await import("@/modules/teamspaces/pages/TeamspacesPage");
					return { Component: module.TeamspacesPage };
				},
			},
			{
				path: "content",
				lazy: async () => {
					const module = await import("@/modules/content/pages/ContentPage");
					return { Component: module.ContentPage };
				},
			},
			{
				path: "published-sites",
				lazy: async () => {
					const module = await import("@/modules/published-sites/pages/PublishedSitesPage");
					return { Component: module.PublishedSitesPage };
				},
			},
			{
				path: "templates",
				lazy: async () => {
					const module = await import("@/modules/templates/pages/TemplatesPage");
					return { Component: module.TemplatesPage };
				},
			},
			{
				path: "ai",
				lazy: async () => {
					const module = await import("@/modules/ai/pages/AiOperationsPage");
					return { Component: module.AiOperationsPage };
				},
			},
			{
				path: "search",
				lazy: async () => {
					const module = await import("@/modules/search/pages/SearchOperationsPage");
					return { Component: module.SearchOperationsPage };
				},
			},
			{
				path: "billing",
				lazy: async () => {
					const module = await import("@/modules/billing/pages/BillingPage");
					return { Component: module.BillingPage };
				},
			},
			{
				path: "feature-flags",
				lazy: async () => {
					const module = await import("@/modules/feature-flags/pages/FeatureFlagsPage");
					return { Component: module.FeatureFlagsPage };
				},
			},
			{
				path: "notifications",
				lazy: async () => {
					const module = await import("@/modules/notifications/pages/NotificationsPage");
					return { Component: module.NotificationsPage };
				},
			},
			{
				path: "jobs",
				lazy: async () => {
					const module = await import("@/modules/jobs/pages/JobsPage");
					return { Component: module.JobsPage };
				},
			},
			{
				path: "security",
				lazy: async () => {
					const module = await import("@/modules/security/pages/SecurityPage");
					return { Component: module.SecurityPage };
				},
			},
			{
				path: "support",
				lazy: async () => {
					const module = await import("@/modules/support/pages/SupportPage");
					return { Component: module.SupportPage };
				},
			},
			{
				path: "monitoring",
				lazy: async () => {
					const module = await import("@/modules/monitoring/pages/MonitoringPage");
					return { Component: module.MonitoringPage };
				},
			},
			{
				path: "access-control",
				lazy: async () => {
					const module = await import("@/modules/access-control/pages/AccessControlPage");
					return { Component: module.AccessControlPage };
				},
			},
			{
				path: "system",
				lazy: async () => {
					const module = await import("@/modules/system/pages/SystemSettingsPage");
					return { Component: module.SystemSettingsPage };
				},
			},
		],
	},
	{ path: "*", element: <Navigate to='/' replace /> },
]);
