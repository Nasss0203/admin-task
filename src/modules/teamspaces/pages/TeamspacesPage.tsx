import { Archive, FileStack, ShieldCheck, Users } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Platform governance",
  title: "Teamspaces",
  description: "Inspect collaboration spaces, visibility, membership, page ownership, and integrity without changing workspace governance.",
  primaryAction: "Run integrity scan",
  secondaryAction: "Refresh metadata",
  metrics: [
    { label: "Total teamspaces", value: "12,846", detail: "Across 4,128 workspaces", icon: FileStack, tone: "info" },
    { label: "Private spaces", value: "7,204", detail: "56.1% of all teamspaces", icon: ShieldCheck, tone: "violet" },
    { label: "Active members", value: "86,420", detail: "+5.8% over 30 days", icon: Users, tone: "success" },
    { label: "Integrity issues", value: "23", detail: "4 high-priority findings", icon: Archive, tone: "warning" },
  ],
  tabs: [{ value: "all", label: "All teamspaces", count: "12.8K" }, { value: "private", label: "Private" }, { value: "integrity", label: "Integrity review", count: "23" }, { value: "archived", label: "Archived" }],
  table: {
    title: "Teamspace inventory",
    description: "Metadata-only view. Private content requires a separate sensitive-content permission.",
    searchPlaceholder: "Search teamspace, workspace or creator...",
    filterLabel: "All visibility",
    filterOptions: ["Open", "Closed", "Private"],
    columns: [{ key: "teamspace", label: "Teamspace", className: "min-w-56" }, { key: "workspace", label: "Workspace" }, { key: "visibility", label: "Visibility" }, { key: "members", label: "Members" }, { key: "pages", label: "Pages" }, { key: "integrity", label: "Integrity" }],
    rows: [
      { id: "ts_product", cells: { teamspace: { primary: "Product strategy", secondary: "ts_8f21", mono: true }, workspace: "Acme Design", visibility: { badge: "PRIVATE", tone: "violet" }, members: "38", pages: "126", integrity: { badge: "HEALTHY", tone: "success" } } },
      { id: "ts_research", cells: { teamspace: { primary: "Research lab", secondary: "ts_7c04", mono: true }, workspace: "Northstar Labs", visibility: { badge: "CLOSED", tone: "warning" }, members: "24", pages: "89", integrity: { badge: "REVIEW", tone: "warning" } } },
      { id: "ts_marketing", cells: { teamspace: { primary: "Marketing hub", secondary: "ts_19ab", mono: true }, workspace: "Paper Street", visibility: { badge: "OPEN", tone: "info" }, members: "61", pages: "203", integrity: { badge: "HEALTHY", tone: "success" } } },
      { id: "ts_archive", cells: { teamspace: { primary: "Legacy projects", secondary: "ts_42de", mono: true }, workspace: "Mori Studio", visibility: { badge: "PRIVATE", tone: "violet" }, members: "7", pages: "44", integrity: { badge: "2 ISSUES", tone: "danger" } } },
    ],
    totalLabel: "Showing 1–4 of 12,846 teamspaces",
    rowActions: ["View metadata", "Inspect effective access", "Preview repair", "View audit history"],
  },
  insight: {
    title: "Integrity coverage",
    description: "Latest automated scan across collaboration spaces.",
    items: [
      { label: "Orphan members", value: "9 findings", progress: 18, tone: "warning" },
      { label: "Orphan pages", value: "4 findings", progress: 8, tone: "danger" },
      { label: "Invalid parents", value: "10 findings", progress: 20, tone: "warning" },
      { label: "Last platform scan", value: "18 min ago", status: "COMPLETED", tone: "success" },
    ],
    note: { title: "Repair remains dry-run first", description: "Admin repair previews affected records before any mutation is allowed.", tone: "info" },
  },
}

export function TeamspacesPage() {
  return <AdminModulePage config={config} />
}
