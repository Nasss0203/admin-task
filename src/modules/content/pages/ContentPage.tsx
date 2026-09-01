import { Blocks, Database, FileStack, TriangleAlert } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Content integrity",
  title: "Content",
  description: "Inspect page metadata, block structure, databases, and files while keeping sensitive content bodies permission-gated.",
  primaryAction: "Scan content integrity",
  secondaryAction: "Refresh index",
  metrics: [
    { label: "Pages", value: "2.84M", detail: "126K updated this week", icon: FileStack, tone: "info" },
    { label: "Blocks", value: "48.2M", detail: "16.9 blocks per page", icon: Blocks, tone: "violet" },
    { label: "Databases", value: "184,206", detail: "22.6M total rows", icon: Database, tone: "success" },
    { label: "Integrity findings", value: "148", detail: "7 high severity", icon: TriangleAlert, tone: "danger" },
  ],
  tabs: [{ value: "pages", label: "Pages", count: "2.84M" }, { value: "blocks", label: "Blocks" }, { value: "databases", label: "Databases" }, { value: "files", label: "Files & storage" }],
  table: {
    title: "Page inventory",
    description: "Cross-platform page metadata with publication and integrity state.",
    searchPlaceholder: "Search page ID, title or workspace...",
    filterLabel: "All statuses",
    filterOptions: ["Active", "Archived", "Quarantined", "Trashed"],
    columns: [{ key: "page", label: "Page", className: "min-w-64" }, { key: "workspace", label: "Workspace" }, { key: "blocks", label: "Blocks" }, { key: "published", label: "Published" }, { key: "updated", label: "Updated" }, { key: "integrity", label: "Integrity" }],
    rows: [
      { id: "page_8af2", cells: { page: { primary: "Q4 Product Roadmap", secondary: "page_8af2 · Product strategy", mono: true }, workspace: "Acme Design", blocks: "286", published: { badge: "NO", tone: "neutral" }, updated: "3 min ago", integrity: { badge: "HEALTHY", tone: "success" } } },
      { id: "page_19dc", cells: { page: { primary: "Public API handbook", secondary: "page_19dc · Developer docs", mono: true }, workspace: "Northstar Labs", blocks: "412", published: { badge: "YES", tone: "info" }, updated: "21 min ago", integrity: { badge: "HEALTHY", tone: "success" } } },
      { id: "page_44be", cells: { page: { primary: "Legacy campaign", secondary: "page_44be · Marketing hub", mono: true }, workspace: "Paper Street", blocks: "97", published: { badge: "NO", tone: "neutral" }, updated: "Yesterday", integrity: { badge: "BROKEN PARENT", tone: "danger" } } },
      { id: "page_70a1", cells: { page: { primary: "Customer onboarding", secondary: "page_70a1 · Operations", mono: true }, workspace: "Mori Studio", blocks: "164", published: { badge: "YES", tone: "info" }, updated: "2 days ago", integrity: { badge: "REVIEW", tone: "warning" } } },
    ],
    totalLabel: "Showing 1–4 of 2,842,190 pages",
    rowActions: ["View metadata", "Inspect hierarchy", "Inspect permissions", "Run integrity check"],
  },
  insight: {
    title: "Content health",
    description: "Current platform-wide consistency indicators.",
    items: [
      { label: "Healthy pages", value: "99.94%", progress: 99.94, tone: "success" },
      { label: "Orphan blocks", value: "63", detail: "Across 18 workspaces", tone: "warning" },
      { label: "Broken relations", value: "41", detail: "12 database schemas", tone: "danger" },
      { label: "Storage scanned", value: "18.4 TB", progress: 82, tone: "info" },
    ],
    note: { title: "Sensitive body access is separated", description: "Page metadata access never grants permission to reveal page or block content.", tone: "violet" },
  },
}

export function ContentPage() {
  return <AdminModulePage config={config} />
}
