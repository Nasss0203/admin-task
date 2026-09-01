import { Activity, Cpu, Database, Server } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Platform observability",
  title: "System monitoring",
  description: "Observe API, PostgreSQL, Redis, BullMQ, AI inference, storage, and application error health from one read-only control plane.",
  primaryAction: "Open incident view",
  secondaryAction: "Refresh telemetry",
  metrics: [
    { label: "Request rate", value: "18.4K/s", detail: "99.94% successful", icon: Activity, tone: "success" },
    { label: "API P95", value: "286ms", detail: "34ms under SLO", icon: Server, tone: "info" },
    { label: "Database connections", value: "284 / 500", detail: "56.8% capacity", icon: Database, tone: "violet" },
    { label: "AI GPU utilization", value: "78%", detail: "2 models serving", icon: Cpu, tone: "warning" },
  ],
  tabs: [{ value: "services", label: "Service health" }, { value: "api", label: "API endpoints" }, { value: "database", label: "PostgreSQL" }, { value: "redis", label: "Redis" }, { value: "ai", label: "AI serving" }, { value: "errors", label: "Errors", count: "18" }],
  table: {
    title: "Service health",
    description: "Dependency status, latency, traffic, and error rate from observability adapters.",
    searchPlaceholder: "Search service, endpoint or environment...",
    filterLabel: "All service states",
    filterOptions: ["Healthy", "Degraded", "Down", "Unknown"],
    columns: [{ key: "service", label: "Service", className: "min-w-52" }, { key: "dependency", label: "Runtime / dependency" }, { key: "requests", label: "Requests/s" }, { key: "p95", label: "P95" }, { key: "errors", label: "Error rate" }, { key: "status", label: "Status" }],
    rows: [
      { id: "nestjs-api", cells: { service: { primary: "NestJS API", secondary: "api-prod-01 · v2.18.4", mono: true }, dependency: "Node.js", requests: "12.8K", p95: "284ms", errors: "0.06%", status: { badge: "HEALTHY", tone: "success" } } },
      { id: "postgresql", cells: { service: { primary: "PostgreSQL", secondary: "primary · pg 17", mono: true }, dependency: "RDS / pgvector", requests: "8.4K tx", p95: "42ms", errors: "0.01%", status: { badge: "HEALTHY", tone: "success" } } },
      { id: "redis", cells: { service: { primary: "Redis", secondary: "cache-queue-prod", mono: true }, dependency: "BullMQ", requests: "31.2K", p95: "8ms", errors: "0.00%", status: { badge: "HEALTHY", tone: "success" } } },
      { id: "qwen-serving", cells: { service: { primary: "Qwen inference", secondary: "vllm-qwen-prod", mono: true }, dependency: "vLLM · 2×GPU", requests: "42", p95: "2.84s", errors: "1.28%", status: { badge: "DEGRADED", tone: "warning" } } },
    ],
    totalLabel: "Showing 4 of 9 monitored platform services",
    rowActions: ["View service metrics", "Inspect recent traces", "Open error groups", "View dependency history"],
  },
  insight: {
    title: "Capacity & SLO",
    description: "Current saturation and reliability guardrails.",
    items: [
      { label: "API success SLO", value: "99.94%", progress: 99.94, tone: "success" },
      { label: "PostgreSQL storage", value: "62%", progress: 62, tone: "info" },
      { label: "Redis memory", value: "71%", progress: 71, tone: "warning" },
      { label: "AI waiting requests", value: "38", status: "ELEVATED", tone: "warning" },
    ],
    note: { title: "Monitoring remains read-only", description: "The admin UI consumes aggregate telemetry and traces; it does not expose arbitrary SQL or Redis key access.", tone: "info" },
  },
}

export function MonitoringPage() {
  return <AdminModulePage config={config} />
}
