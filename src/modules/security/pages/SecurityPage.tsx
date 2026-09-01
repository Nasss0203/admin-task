import { Ban, KeyRound, ScrollText, ShieldAlert } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Trust & safety",
  title: "Audit & security",
  description: "Investigate immutable audit events, active sessions, authentication risk, blocked resources, and moderation cases.",
  primaryAction: "Export audit events",
  secondaryAction: "Refresh risk signals",
  metrics: [
    { label: "Admin actions (24h)", value: "18,426", detail: "99.91% successful", icon: ScrollText, tone: "info" },
    { label: "Active sessions", value: "46,284", detail: "128 admin sessions", icon: KeyRound, tone: "success" },
    { label: "Risk events", value: "84", detail: "12 require investigation", icon: ShieldAlert, tone: "warning" },
    { label: "Blocked resources", value: "316", detail: "24 blocks expire this week", icon: Ban, tone: "danger" },
  ],
  tabs: [{ value: "audit", label: "Audit logs" }, { value: "sessions", label: "Sessions" }, { value: "login", label: "Login events", count: "84" }, { value: "blocks", label: "Blocked resources" }, { value: "reports", label: "Moderation", count: "26" }],
  table: {
    title: "Privileged audit trail",
    description: "Append-only activity with actor, resource, reason, request, and outcome context.",
    searchPlaceholder: "Search action, actor, request or resource ID...",
    filterLabel: "All audit results",
    filterOptions: ["Success", "Denied", "Failed"],
    columns: [{ key: "event", label: "Event", className: "min-w-64" }, { key: "actor", label: "Actor" }, { key: "resource", label: "Resource" }, { key: "workspace", label: "Workspace" }, { key: "result", label: "Result" }, { key: "time", label: "Timestamp" }],
    rows: [
      { id: "audit_88af", cells: { event: { primary: "WORKSPACE_QUOTA_UPDATED", secondary: "req_88af21 · quota override", mono: true }, actor: "Alex Nguyen", resource: "ws_ac_2026", workspace: "Acme Design", result: { badge: "SUCCESS", tone: "success" }, time: "2 min ago" } },
      { id: "audit_194c", cells: { event: { primary: "SENSITIVE_CONTENT_VIEWED", secondary: "req_194ca2 · case SUP-1024", mono: true }, actor: "Mia Chen", resource: "page_8af2", workspace: "Northstar Labs", result: { badge: "SUCCESS", tone: "success" }, time: "11 min ago" } },
      { id: "audit_70de", cells: { event: { primary: "ADMIN_ROLE_GRANT_DENIED", secondary: "req_70de91 · authority exceeded", mono: true }, actor: "Quang Le", resource: "usr_admin_28", workspace: "Platform", result: { badge: "DENIED", tone: "danger" }, time: "18 min ago" } },
      { id: "audit_b201", cells: { event: { primary: "PUBLISHED_SITE_BLOCKED", secondary: "req_b2016f · phishing", mono: true }, actor: "System policy", resource: "site_7d31", workspace: "Legacy Sandbox", result: { badge: "SUCCESS", tone: "success" }, time: "26 min ago" } },
    ],
    totalLabel: "Showing latest 4 of 18,426 privileged events",
    rowActions: ["View event detail", "Open request trace", "View resource history", "Inspect actor activity"],
  },
  insight: {
    title: "Security posture",
    description: "Authentication, session, and enforcement indicators.",
    items: [
      { label: "Admin MFA coverage", value: "100%", progress: 100, tone: "success" },
      { label: "Failed admin logins", value: "18", detail: "Last 24 hours", tone: "warning" },
      { label: "New-device admin sessions", value: "4", status: "REVIEWED", tone: "info" },
      { label: "Audit write health", value: "99.999%", status: "HEALTHY", tone: "success" },
    ],
    note: { title: "Audit records are not editable", description: "Privileged actions and sensitive reads remain searchable but have no normal update or delete path.", tone: "violet" },
  },
}

export function SecurityPage() {
  return <AdminModulePage config={config} />
}
