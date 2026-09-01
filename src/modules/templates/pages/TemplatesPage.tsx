import { Archive, Download, LayoutTemplate, Sparkles } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Content catalog",
  title: "Templates",
  description: "Review official page, database, and workspace templates through a versioned publishing lifecycle.",
  primaryAction: "Create template",
  secondaryAction: "Refresh catalog",
  metrics: [
    { label: "Published", value: "184", detail: "32 featured templates", icon: LayoutTemplate, tone: "success" },
    { label: "In review", value: "12", detail: "4 awaiting security review", icon: Sparkles, tone: "warning" },
    { label: "Installs (30d)", value: "68,420", detail: "+18.6% from July", icon: Download, tone: "info" },
    { label: "Archived", value: "47", detail: "Retained for existing users", icon: Archive, tone: "neutral" },
  ],
  tabs: [{ value: "catalog", label: "Catalog" }, { value: "review", label: "Review queue", count: "12" }, { value: "versions", label: "Versions" }, { value: "categories", label: "Categories" }],
  table: {
    title: "Template catalog",
    description: "Versioned templates remain stable after publication and track clone usage.",
    searchPlaceholder: "Search template, category or owner...",
    filterLabel: "All template types",
    filterOptions: ["Page template", "Database template", "Workspace template"],
    columns: [{ key: "template", label: "Template", className: "min-w-60" }, { key: "type", label: "Type" }, { key: "version", label: "Version" }, { key: "category", label: "Category" }, { key: "installs", label: "Installs" }, { key: "status", label: "Status" }],
    rows: [
      { id: "tpl_product", cells: { template: { primary: "Product launch HQ", secondary: "tpl_102 · Featured", mono: true }, type: "Workspace", version: "v4", category: "Product", installs: "18,204", status: { badge: "PUBLISHED", tone: "success" } } },
      { id: "tpl_crm", cells: { template: { primary: "Lightweight CRM", secondary: "tpl_087", mono: true }, type: "Database", version: "v7", category: "Sales", installs: "12,882", status: { badge: "PUBLISHED", tone: "success" } } },
      { id: "tpl_retro", cells: { template: { primary: "Team retrospective", secondary: "tpl_194", mono: true }, type: "Page", version: "v2", category: "Teams", installs: "6,430", status: { badge: "IN REVIEW", tone: "warning" } } },
      { id: "tpl_agency", cells: { template: { primary: "Agency operating system", secondary: "tpl_041 · Legacy", mono: true }, type: "Workspace", version: "v3", category: "Operations", installs: "9,116", status: { badge: "ARCHIVED", tone: "neutral" } } },
    ],
    totalLabel: "Showing 1–4 of 243 template versions",
    rowActions: ["Preview template", "View versions", "Review metadata", "View usage"],
  },
  insight: {
    title: "Catalog performance",
    description: "Publishing quality and adoption by template type.",
    items: [
      { label: "Workspace templates", value: "43% of installs", progress: 43, tone: "violet" },
      { label: "Database templates", value: "34% of installs", progress: 34, tone: "info" },
      { label: "Page templates", value: "23% of installs", progress: 23, tone: "success" },
      { label: "Median review time", value: "6h 24m", status: "ON TARGET", tone: "success" },
    ],
    note: { title: "Published versions are immutable", description: "Edits create a new snapshot so existing template installs never change unexpectedly.", tone: "info" },
  },
}

export function TemplatesPage() {
  return <AdminModulePage config={config} />
}
