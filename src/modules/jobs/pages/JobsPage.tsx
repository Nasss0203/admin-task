import { CircleCheck, Clock3, ListRestart, TriangleAlert } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Background operations",
  title: "Background jobs",
  description: "Inspect BullMQ queue depth, processing rate, delayed work, retries, and terminal failures across Taskmanly services.",
  primaryAction: "Retry selected failures",
  secondaryAction: "Refresh queues",
  metrics: [
    { label: "Processed (24h)", value: "4.82M", detail: "1,340 jobs per second", icon: CircleCheck, tone: "success" },
    { label: "Waiting", value: "12,482", detail: "Oldest age 2m 18s", icon: Clock3, tone: "warning" },
    { label: "Retrying", value: "684", detail: "Exponential backoff active", icon: ListRestart, tone: "info" },
    { label: "Failed", value: "128", detail: "41 terminal failures", icon: TriangleAlert, tone: "danger" },
  ],
  tabs: [{ value: "queues", label: "Queues" }, { value: "active", label: "Active jobs", count: "246" }, { value: "failed", label: "Failed", count: "128" }, { value: "delayed", label: "Scheduled & delayed" }],
  table: {
    title: "Queue health",
    description: "Queue throughput and backlog with retryability separated from terminal errors.",
    searchPlaceholder: "Search queue, job type or error code...",
    filterLabel: "All queue states",
    filterOptions: ["Healthy", "Degraded", "Paused"],
    columns: [{ key: "queue", label: "Queue", className: "min-w-52" }, { key: "waiting", label: "Waiting" }, { key: "active", label: "Active" }, { key: "completed", label: "Completed 24h" }, { key: "failed", label: "Failed" }, { key: "oldest", label: "Oldest waiting" }, { key: "health", label: "Health" }],
    rows: [
      { id: "ai-generation", cells: { queue: { primary: "ai-generation", secondary: "12 workers", mono: true }, waiting: "8,204", active: "124", completed: "1.26M", failed: "82", oldest: "2m 18s", health: { badge: "DEGRADED", tone: "warning" } } },
      { id: "embedding", cells: { queue: { primary: "embedding", secondary: "8 workers", mono: true }, waiting: "2,842", active: "64", completed: "984K", failed: "24", oldest: "58s", health: { badge: "HEALTHY", tone: "success" } } },
      { id: "publish-site", cells: { queue: { primary: "publish-site", secondary: "6 workers", mono: true }, waiting: "916", active: "28", completed: "48.2K", failed: "18", oldest: "41s", health: { badge: "HEALTHY", tone: "success" } } },
      { id: "email", cells: { queue: { primary: "email", secondary: "4 workers", mono: true }, waiting: "520", active: "30", completed: "1.84M", failed: "4", oldest: "12s", health: { badge: "HEALTHY", tone: "success" } } },
    ],
    totalLabel: "Showing 4 of 9 active queues",
    rowActions: ["View jobs", "Inspect failures", "View worker metrics", "Open queue audit"],
  },
  insight: {
    title: "Failure classification",
    description: "Retry decisions from failures recorded in the last hour.",
    items: [
      { label: "Model timeout", value: "54 retryable", progress: 54, tone: "warning" },
      { label: "Network error", value: "33 retryable", progress: 33, tone: "info" },
      { label: "Invalid schema", value: "26 terminal", progress: 26, tone: "danger" },
      { label: "Missing resource", value: "15 terminal", progress: 15, tone: "danger" },
    ],
    note: { title: "Bulk retry is always filtered", description: "Terminal permission, schema, and deleted-resource failures cannot be retried indiscriminately.", tone: "warning" },
  },
}

export function JobsPage() {
  return <AdminModulePage config={config} />
}
