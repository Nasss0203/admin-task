import { Bot, BrainCircuit, Gauge, TriangleAlert } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "AI & RAG",
  title: "AI operations",
  description: "Observe generation quality, model health, token usage, RAG indexing, and evaluation signals without exposing prompt bodies.",
  primaryAction: "Run evaluation",
  secondaryAction: "Refresh model health",
  metrics: [
    { label: "Requests today", value: "284,621", detail: "38.4M total tokens", icon: Bot, tone: "info" },
    { label: "Success rate", value: "98.72%", detail: "+0.31% over 7 days", icon: Gauge, tone: "success" },
    { label: "P95 latency", value: "2.84s", detail: "Target below 3.2s", icon: BrainCircuit, tone: "violet" },
    { label: "Failed requests", value: "3,642", detail: "812 retryable failures", icon: TriangleAlert, tone: "warning" },
  ],
  tabs: [{ value: "overview", label: "Overview" }, { value: "generations", label: "Generations" }, { value: "rag", label: "RAG index", count: "184" }, { value: "models", label: "Models" }, { value: "evaluations", label: "Evaluations" }],
  table: {
    title: "AI service activity",
    description: "Privacy-safe request metadata across generation, embedding, and retrieval workloads.",
    searchPlaceholder: "Search request, workspace or model...",
    filterLabel: "All AI features",
    filterOptions: ["Page generation", "Chat", "Embedding", "Semantic search"],
    columns: [{ key: "request", label: "Request", className: "min-w-56" }, { key: "workspace", label: "Workspace" }, { key: "feature", label: "Feature" }, { key: "model", label: "Model" }, { key: "tokens", label: "Tokens" }, { key: "latency", label: "Latency" }, { key: "status", label: "Status" }],
    rows: [
      { id: "req_91ab", cells: { request: { primary: "req_91ab7c", secondary: "2 min ago", mono: true }, workspace: "Acme Design", feature: "Page generation", model: "Qwen 2.5 32B", tokens: "8,420", latency: "2.18s", status: { badge: "SUCCEEDED", tone: "success" } } },
      { id: "req_62fe", cells: { request: { primary: "req_62fe11", secondary: "4 min ago", mono: true }, workspace: "Northstar Labs", feature: "Semantic search", model: "Qwen Embed v2", tokens: "1,284", latency: "486ms", status: { badge: "SUCCEEDED", tone: "success" } } },
      { id: "req_20dd", cells: { request: { primary: "req_20dd84", secondary: "7 min ago", mono: true }, workspace: "Paper Street", feature: "AI chat", model: "Qwen 2.5 32B", tokens: "12,604", latency: "8.42s", status: { badge: "TIMEOUT", tone: "danger" } } },
      { id: "req_b403", cells: { request: { primary: "req_b4030a", secondary: "9 min ago", mono: true }, workspace: "Mori Studio", feature: "Embedding", model: "Qwen Embed v2", tokens: "3,140", latency: "612ms", status: { badge: "RETRYING", tone: "warning" } } },
    ],
    totalLabel: "Showing latest 4 of 284,621 AI requests today",
    rowActions: ["View request metadata", "Inspect trace", "View model metrics", "Open workspace usage"],
  },
  insight: {
    title: "Inference & RAG health",
    description: "Serving capacity and indexing readiness.",
    items: [
      { label: "Qwen 2.5 32B", value: "71% VRAM", progress: 71, tone: "violet" },
      { label: "Embedding service", value: "Healthy", status: "HEALTHY", tone: "success" },
      { label: "RAG index coverage", value: "99.2%", progress: 99.2, tone: "success" },
      { label: "Stale index backlog", value: "184 resources", status: "DEGRADED", tone: "warning" },
    ],
    note: { title: "Prompt content stays protected", description: "Overview and operations pages use request metadata; sensitive messages require separate permission and audit.", tone: "violet" },
  },
}

export function AiOperationsPage() {
  return <AdminModulePage config={config} />
}
