import { Activity, Globe2, ShieldAlert, WifiOff } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Public surface",
  title: "Published sites",
  description: "Monitor public sites, custom domains, publishing health, traffic, and platform enforcement across Taskmanly.",
  primaryAction: "Review risk queue",
  secondaryAction: "Refresh domains",
  metrics: [
    { label: "Active sites", value: "8,492", detail: "+312 this month", icon: Globe2, tone: "success" },
    { label: "Public requests", value: "12.8M", detail: "Last 24 hours", icon: Activity, tone: "info" },
    { label: "Publish failures", value: "37", detail: "0.21% failure rate", icon: WifiOff, tone: "warning" },
    { label: "Risk review", value: "14", detail: "3 possible phishing sites", icon: ShieldAlert, tone: "danger" },
  ],
  tabs: [{ value: "sites", label: "Sites", count: "8.5K" }, { value: "domains", label: "Domains" }, { value: "publishing", label: "Publishing failures", count: "37" }, { value: "risk", label: "Risk queue", count: "14" }],
  table: {
    title: "Site inventory",
    description: "Live publication state, access mode, domain, traffic, and risk signals.",
    searchPlaceholder: "Search site, hostname or workspace...",
    filterLabel: "All site statuses",
    filterOptions: ["Active", "Draft", "Disabled", "Blocked", "Failed"],
    columns: [{ key: "site", label: "Site", className: "min-w-60" }, { key: "workspace", label: "Workspace" }, { key: "domain", label: "Domain", className: "min-w-48" }, { key: "access", label: "Access" }, { key: "traffic", label: "24h traffic" }, { key: "status", label: "Status" }, { key: "risk", label: "Risk" }],
    rows: [
      { id: "site_docs", cells: { site: { primary: "Northstar Docs", secondary: "site_a182 · 42 pages", mono: true }, workspace: "Northstar Labs", domain: "docs.northstar.io", access: { badge: "PUBLIC", tone: "info" }, traffic: "184.2K", status: { badge: "ACTIVE", tone: "success" }, risk: { badge: "LOW", tone: "success" } } },
      { id: "site_portfolio", cells: { site: { primary: "Mori Portfolio", secondary: "site_8be0 · 18 pages", mono: true }, workspace: "Mori Studio", domain: "mori.taskmanly.site", access: { badge: "PUBLIC", tone: "info" }, traffic: "28.6K", status: { badge: "ACTIVE", tone: "success" }, risk: { badge: "LOW", tone: "success" } } },
      { id: "site_portal", cells: { site: { primary: "Client Portal", secondary: "site_20ff · 67 pages", mono: true }, workspace: "Acme Design", domain: "portal.acme.design", access: { badge: "AUTH", tone: "violet" }, traffic: "92.1K", status: { badge: "DISABLED", tone: "warning" }, risk: { badge: "MEDIUM", tone: "warning" } } },
      { id: "site_offer", cells: { site: { primary: "Rewards center", secondary: "site_7d31 · 3 pages", mono: true }, workspace: "Legacy Sandbox", domain: "claim-rewards-now.site", access: { badge: "PUBLIC", tone: "info" }, traffic: "4.8K", status: { badge: "BLOCKED", tone: "danger" }, risk: { badge: "PHISHING", tone: "danger" } } },
    ],
    totalLabel: "Showing 1–4 of 8,492 published sites",
    rowActions: ["Inspect site", "View security signals", "Purge cache", "View audit history"],
  },
  insight: {
    title: "Domain & publish health",
    description: "Edge readiness and public rendering indicators.",
    items: [
      { label: "TLS certificates healthy", value: "99.7%", progress: 99.7, tone: "success" },
      { label: "DNS verification pending", value: "26", detail: "11 older than 24 hours", tone: "warning" },
      { label: "Public 5xx rate", value: "0.08%", progress: 8, tone: "success" },
      { label: "Cache revalidation queue", value: "124 jobs", status: "NORMAL", tone: "info" },
    ],
    note: { title: "Blocks are enforced at render time", description: "A platform block invalidates public caches immediately and preserves evidence for review.", tone: "danger" },
  },
}

export function PublishedSitesPage() {
  return <AdminModulePage config={config} />
}
