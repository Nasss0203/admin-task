import { ArchiveRestore, Clock3, DatabaseBackup, Settings2 } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Runtime configuration",
  title: "System settings",
  description: "Control safe runtime product settings, maintenance windows, backup health, and data-retention policies without exposing secrets.",
  primaryAction: "Schedule maintenance",
  secondaryAction: "Refresh configuration",
  metrics: [
    { label: "Runtime settings", value: "48", detail: "3 environments", icon: Settings2, tone: "info" },
    { label: "Maintenance mode", value: "OFF", detail: "Next window Sep 02, 02:00", icon: Clock3, tone: "success" },
    { label: "Last backup", value: "42m ago", detail: "Succeeded in 8m 12s", icon: DatabaseBackup, tone: "success" },
    { label: "Retention policies", value: "12", detail: "2 dry-runs pending review", icon: ArchiveRestore, tone: "violet" },
  ],
  tabs: [{ value: "settings", label: "Runtime settings" }, { value: "maintenance", label: "Maintenance" }, { value: "backups", label: "Backups" }, { value: "retention", label: "Data retention" }, { value: "history", label: "Change history" }],
  table: {
    title: "Safe runtime configuration",
    description: "Versioned product behavior settings. Credentials and infrastructure secrets never appear here.",
    searchPlaceholder: "Search setting key, scope or description...",
    filterLabel: "All setting scopes",
    filterOptions: ["Global", "Environment", "Plan", "Workspace"],
    columns: [{ key: "setting", label: "Setting", className: "min-w-64" }, { key: "scope", label: "Scope" }, { key: "value", label: "Current value" }, { key: "version", label: "Version" }, { key: "updated", label: "Updated by" }, { key: "time", label: "Last changed" }],
    rows: [
      { id: "registration_enabled", cells: { setting: { primary: "registration.enabled", secondary: "Allow new account registration", mono: true }, scope: { badge: "GLOBAL", tone: "info" }, value: { badge: "TRUE", tone: "success" }, version: "v12", updated: "Alex Nguyen", time: "Aug 24, 2026" } },
      { id: "upload_max_bytes", cells: { setting: { primary: "upload.max_bytes", secondary: "Maximum accepted upload size", mono: true }, scope: { badge: "PLAN: PRO", tone: "violet" }, value: "104,857,600", version: "v8", updated: "Quang Le", time: "Aug 20, 2026" } },
      { id: "ai_prompt_length", cells: { setting: { primary: "ai.max_prompt_length", secondary: "Maximum prompt characters", mono: true }, scope: { badge: "PRODUCTION", tone: "warning" }, value: "32,000", version: "v5", updated: "Alex Nguyen", time: "Aug 18, 2026" } },
      { id: "publish_enabled", cells: { setting: { primary: "publish.enabled", secondary: "Enable public site publishing", mono: true }, scope: { badge: "GLOBAL", tone: "info" }, value: { badge: "TRUE", tone: "success" }, version: "v16", updated: "System rollout", time: "Aug 14, 2026" } },
    ],
    totalLabel: "Showing 4 of 48 runtime settings",
    rowActions: ["View setting detail", "Open version history", "Preview rollback", "View audit events"],
  },
  insight: {
    title: "Operational safeguards",
    description: "Maintenance, backup, and retention readiness.",
    items: [
      { label: "Backup success (30d)", value: "100%", progress: 100, tone: "success" },
      { label: "Last restore drill", value: "Aug 12, 2026", status: "PASSED", tone: "success" },
      { label: "Eligible cleanup records", value: "18,240", detail: "842 MB in next retention run", tone: "violet" },
      { label: "Records excluded by hold", value: "31", status: "PROTECTED", tone: "warning" },
    ],
    note: { title: "Secrets stay in a secret manager", description: "JWT, database, storage, OAuth, SMTP, billing, and model credentials are never runtime UI settings.", tone: "danger" },
  },
}

export function SystemSettingsPage() {
  return <AdminModulePage config={config} />
}
