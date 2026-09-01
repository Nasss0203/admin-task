import { KeySquare, LockKeyhole, ShieldCheck, UserCog } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Privileged access",
  title: "Access control",
  description: "Manage granular admin roles, effective permissions, temporary grants, and deny-by-default authorization decisions.",
  primaryAction: "Assign admin role",
  secondaryAction: "Refresh permissions",
  metrics: [
    { label: "Admin accounts", value: "28", detail: "7 roles across production", icon: UserCog, tone: "info" },
    { label: "Active role grants", value: "42", detail: "6 temporary grants", icon: KeySquare, tone: "violet" },
    { label: "Sensitive permissions", value: "18", detail: "Require elevated authority", icon: LockKeyhole, tone: "warning" },
    { label: "Denied decisions (24h)", value: "126", detail: "No privilege escalation", icon: ShieldCheck, tone: "success" },
  ],
  tabs: [{ value: "admins", label: "Admin accounts", count: "28" }, { value: "roles", label: "Roles", count: "7" }, { value: "permissions", label: "Permissions" }, { value: "decisions", label: "Access decisions" }],
  table: {
    title: "Administrator access",
    description: "Role assignments, effective permission counts, grant provenance, expiry, and recent activity.",
    searchPlaceholder: "Search admin, role or permission...",
    filterLabel: "All admin roles",
    filterOptions: ["Super admin", "Platform admin", "Support admin", "Content moderator", "Auditor"],
    columns: [{ key: "admin", label: "Administrator", className: "min-w-56" }, { key: "roles", label: "Roles" }, { key: "permissions", label: "Effective permissions" }, { key: "granted", label: "Granted by" }, { key: "expires", label: "Expires" }, { key: "activity", label: "Last activity" }],
    rows: [
      { id: "admin_alex", cells: { admin: { primary: "Alex Nguyen", secondary: "alex.nguyen@taskmanly.com" }, roles: { badge: "SUPER ADMIN", tone: "violet" }, permissions: "64", granted: "System bootstrap", expires: "Never", activity: "Now" } },
      { id: "admin_mia", cells: { admin: { primary: "Mia Chen", secondary: "mia.chen@taskmanly.com" }, roles: { badge: "SUPPORT ADMIN", tone: "info" }, permissions: "18", granted: "Alex Nguyen", expires: "Sep 05, 2026", activity: "4 min ago" } },
      { id: "admin_quang", cells: { admin: { primary: "Quang Le", secondary: "quang.le@taskmanly.com" }, roles: { badge: "PLATFORM ADMIN", tone: "success" }, permissions: "46", granted: "Alex Nguyen", expires: "Never", activity: "18 min ago" } },
      { id: "admin_sofia", cells: { admin: { primary: "Sofia Wilson", secondary: "sofia.wilson@taskmanly.com" }, roles: { badge: "CONTENT MODERATOR", tone: "warning" }, permissions: "14", granted: "Quang Le", expires: "Oct 01, 2026", activity: "1 hour ago" } },
    ],
    totalLabel: "Showing 4 of 28 administrator accounts",
    rowActions: ["Inspect effective permissions", "View role history", "Evaluate permission", "View admin audit"],
  },
  insight: {
    title: "Role distribution",
    description: "Privileged access by responsibility and grant duration.",
    items: [
      { label: "Super admins", value: "2", detail: "Last-admin protection enabled", tone: "violet" },
      { label: "Platform admins", value: "6", progress: 21, tone: "success" },
      { label: "Support admins", value: "12", progress: 43, tone: "info" },
      { label: "Temporary grants", value: "6", status: "ACTIVE", tone: "warning" },
    ],
    note: { title: "No policy match means deny", description: "Frontend visibility improves UX, while backend policy remains the authoritative security boundary.", tone: "danger" },
  },
}

export function AccessControlPage() {
  return <AdminModulePage config={config} />
}
