import { Clock3, DatabaseZap, Search, SearchX } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Discovery quality",
  title: "Search operations",
  description: "Track keyword, semantic, and hybrid search quality while keeping stored query samples redacted by default.",
  primaryAction: "Start workspace reindex",
  secondaryAction: "Refresh analytics",
  metrics: [
    { label: "Searches today", value: "1.42M", detail: "+9.8% from last Friday", icon: Search, tone: "info" },
    { label: "Zero-result rate", value: "3.18%", detail: "Target below 4%", icon: SearchX, tone: "warning" },
    { label: "P95 latency", value: "184ms", detail: "Hybrid search 242ms", icon: Clock3, tone: "success" },
    { label: "Index lag", value: "6m 42s", detail: "14 workspaces over SLO", icon: DatabaseZap, tone: "danger" },
  ],
  tabs: [{ value: "analytics", label: "Analytics" }, { value: "zero-results", label: "Zero results", count: "45.2K" }, { value: "indexes", label: "Index health", count: "14" }, { value: "quality", label: "Quality evaluation" }],
  table: {
    title: "Recent redacted queries",
    description: "Query text is minimized and only exposed to privileged search-quality reviewers.",
    searchPlaceholder: "Search query hash, workspace or mode...",
    filterLabel: "All search modes",
    filterOptions: ["Keyword", "Semantic", "Hybrid"],
    columns: [{ key: "query", label: "Query sample", className: "min-w-64" }, { key: "workspace", label: "Workspace" }, { key: "mode", label: "Mode" }, { key: "results", label: "Results" }, { key: "latency", label: "Latency" }, { key: "time", label: "Time" }],
    rows: [
      { id: "qry_a812", cells: { query: { primary: "quarterly product r…", secondary: "hash_a8129f", mono: true }, workspace: "Acme Design", mode: { badge: "HYBRID", tone: "violet" }, results: "24", latency: "216ms", time: "1 min ago" } },
      { id: "qry_72cb", cells: { query: { primary: "api authentication e…", secondary: "hash_72cb14", mono: true }, workspace: "Northstar Labs", mode: { badge: "SEMANTIC", tone: "info" }, results: "18", latency: "284ms", time: "3 min ago" } },
      { id: "qry_194e", cells: { query: { primary: "invoice june 2025", secondary: "hash_194e70", mono: true }, workspace: "Paper Street", mode: { badge: "KEYWORD", tone: "neutral" }, results: "0", latency: "92ms", time: "6 min ago" } },
      { id: "qry_b61d", cells: { query: { primary: "onboarding checkl…", secondary: "hash_b61d02", mono: true }, workspace: "Mori Studio", mode: { badge: "HYBRID", tone: "violet" }, results: "7", latency: "198ms", time: "8 min ago" } },
    ],
    totalLabel: "Showing privacy-safe samples from 1.42M searches",
    rowActions: ["Inspect query metadata", "Open index state", "View workspace trends", "Add to evaluation set"],
  },
  insight: {
    title: "Mode distribution",
    description: "Search traffic and index freshness by strategy.",
    items: [
      { label: "Keyword", value: "44%", progress: 44, tone: "neutral" },
      { label: "Semantic", value: "21%", progress: 21, tone: "info" },
      { label: "Hybrid", value: "35%", progress: 35, tone: "violet" },
      { label: "Permission-filter coverage", value: "100%", status: "ENFORCED", tone: "success" },
    ],
    note: { title: "Raw queries have limited retention", description: "Search text may contain sensitive information, so analytics favors hashes and redacted samples.", tone: "warning" },
  },
}

export function SearchOperationsPage() {
  return <AdminModulePage config={config} />
}
