import { Flag, Gauge, Layers3, UsersRound } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Release control",
  title: "Feature flags",
  description: "Coordinate global, plan, workspace, user, and percentage rollouts independently from commercial entitlements.",
  primaryAction: "Create feature flag",
  secondaryAction: "Refresh evaluations",
  metrics: [
    { label: "Active flags", value: "42", detail: "18 enabled in production", icon: Flag, tone: "info" },
    { label: "Targeting rules", value: "186", detail: "Across 3 environments", icon: Layers3, tone: "violet" },
    { label: "Users exposed", value: "38.4K", detail: "Last 24-hour evaluations", icon: UsersRound, tone: "success" },
    { label: "Partial rollouts", value: "7", detail: "2 require review this week", icon: Gauge, tone: "warning" },
  ],
  tabs: [{ value: "production", label: "Production", count: "18" }, { value: "staging", label: "Staging" }, { value: "development", label: "Development" }, { value: "history", label: "Change history" }],
  table: {
    title: "Production flags",
    description: "Effective rollout state after default values and contextual targeting rules.",
    searchPlaceholder: "Search flag key, owner or description...",
    filterLabel: "All flag states",
    filterOptions: ["Enabled", "Disabled", "Partial rollout"],
    columns: [{ key: "flag", label: "Flag", className: "min-w-64" }, { key: "default", label: "Default" }, { key: "rules", label: "Rules" }, { key: "rollout", label: "Exposure" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" }],
    rows: [
      { id: "AI_PAGE_GENERATION_V2", cells: { flag: { primary: "AI_PAGE_GENERATION_V2", secondary: "Next generation page composer", mono: true }, default: { badge: "OFF", tone: "neutral" }, rules: "4", rollout: { primary: "10%", progress: 10, tone: "violet" }, owner: "AI Platform", status: { badge: "ROLLING OUT", tone: "warning" } } },
      { id: "SEMANTIC_SEARCH_V2", cells: { flag: { primary: "SEMANTIC_SEARCH_V2", secondary: "Hybrid semantic ranking", mono: true }, default: { badge: "OFF", tone: "neutral" }, rules: "8", rollout: { primary: "48%", progress: 48, tone: "info" }, owner: "Search", status: { badge: "ROLLING OUT", tone: "warning" } } },
      { id: "CUSTOM_DOMAIN_V2", cells: { flag: { primary: "CUSTOM_DOMAIN_V2", secondary: "New domain verification flow", mono: true }, default: { badge: "ON", tone: "success" }, rules: "2", rollout: { primary: "100%", progress: 100, tone: "success" }, owner: "Publishing", status: { badge: "ENABLED", tone: "success" } } },
      { id: "DATABASE_CALENDAR", cells: { flag: { primary: "DATABASE_CALENDAR", secondary: "Calendar database view", mono: true }, default: { badge: "OFF", tone: "neutral" }, rules: "1", rollout: { primary: "Internal", secondary: "Employees only" }, owner: "Databases", status: { badge: "INTERNAL", tone: "violet" } } },
    ],
    totalLabel: "Showing 1–4 of 42 feature flags",
    rowActions: ["Edit targeting rules", "Preview evaluation", "View change history", "Duplicate flag"],
  },
  insight: {
    title: "Evaluation summary",
    description: "Last 24 hours across the production environment.",
    items: [
      { label: "Evaluations", value: "18.2M", detail: "12.6K per minute" },
      { label: "Workspace-target matches", value: "31%", progress: 31, tone: "info" },
      { label: "Plan-target matches", value: "24%", progress: 24, tone: "violet" },
      { label: "Evaluation errors", value: "0.002%", status: "HEALTHY", tone: "success" },
    ],
    note: { title: "Flags do not replace entitlements", description: "A feature is available only when rollout, plan entitlement, context, and safety policy all allow it.", tone: "warning" },
  },
}

export function FeatureFlagsPage() {
  return <AdminModulePage config={config} />
}
