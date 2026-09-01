import { CircleCheck, Clock3, Headphones, SearchCheck } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Support command center",
  title: "Support lookup",
  description: "Find users, workspaces, pages, jobs, requests, and traces from one read-mostly investigation surface.",
  primaryAction: "Start support case",
  secondaryAction: "Refresh cases",
  metrics: [
    { label: "Open cases", value: "184", detail: "26 high-priority cases", icon: Headphones, tone: "info" },
    { label: "Resolved today", value: "96", detail: "91% within SLA", icon: CircleCheck, tone: "success" },
    { label: "Median resolution", value: "3h 18m", detail: "42 minutes faster this week", icon: Clock3, tone: "violet" },
    { label: "Active investigations", value: "38", detail: "12 waiting on customer", icon: SearchCheck, tone: "warning" },
  ],
  tabs: [{ value: "lookup", label: "Universal lookup" }, { value: "cases", label: "Support cases", count: "184" }, { value: "requests", label: "Request & trace" }, { value: "impersonation", label: "Privileged sessions" }],
  table: {
    title: "Active support cases",
    description: "Cross-linked account context without collecting dangerous actions in a single screen.",
    searchPlaceholder: "Search email, user ID, workspace, page, job, request or trace...",
    filterLabel: "All case statuses",
    filterOptions: ["Open", "Investigating", "Waiting", "Resolved"],
    columns: [{ key: "case", label: "Case", className: "min-w-60" }, { key: "subject", label: "Subject", className: "min-w-48" }, { key: "workspace", label: "Workspace" }, { key: "owner", label: "Assigned admin" }, { key: "sla", label: "SLA" }, { key: "status", label: "Status" }],
    rows: [
      { id: "SUP-1042", cells: { case: { primary: "SUP-1042", secondary: "Editor sync issue · P1", mono: true }, subject: "l***@acme.design", workspace: "Acme Design", owner: "Mia Chen", sla: "42m remaining", status: { badge: "INVESTIGATING", tone: "warning" } } },
      { id: "SUP-1038", cells: { case: { primary: "SUP-1038", secondary: "AI generation timeout · P2", mono: true }, subject: "m***@northstar.io", workspace: "Northstar Labs", owner: "Quang Le", sla: "2h 14m", status: { badge: "OPEN", tone: "info" } } },
      { id: "SUP-1031", cells: { case: { primary: "SUP-1031", secondary: "Custom domain verification · P2", mono: true }, subject: "s***@paper.st", workspace: "Paper Street", owner: "Alex Nguyen", sla: "4h 02m", status: { badge: "WAITING", tone: "neutral" } } },
      { id: "SUP-1024", cells: { case: { primary: "SUP-1024", secondary: "Permission mismatch · P1", mono: true }, subject: "a***@pixel.dev", workspace: "Pixel Works", owner: "Mia Chen", sla: "Resolved in 1h 46m", status: { badge: "RESOLVED", tone: "success" } } },
    ],
    totalLabel: "Showing 4 most recently updated support cases",
    rowActions: ["Open case context", "View account summary", "Inspect recent incidents", "View case audit"],
  },
  insight: {
    title: "Case workload",
    description: "Current support distribution and investigation safety.",
    items: [
      { label: "Account & access", value: "38%", progress: 38, tone: "info" },
      { label: "Editor & content", value: "26%", progress: 26, tone: "violet" },
      { label: "AI & search", value: "21%", progress: 21, tone: "warning" },
      { label: "Billing & domains", value: "15%", progress: 15, tone: "neutral" },
    ],
    note: { title: "Sensitive reveals require a case", description: "PII or private-content access is tied to an active case ID, reason, permission check, and audit event.", tone: "warning" },
  },
}

export function SupportPage() {
  return <AdminModulePage config={config} />
}
