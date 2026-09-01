import { CircleDollarSign, CreditCard, ReceiptText, WalletCards } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "SaaS operations",
  title: "Plans & billing",
  description: "Review plan versions, subscription lifecycle, invoices, payments, and effective workspace quotas.",
  primaryAction: "Create plan version",
  secondaryAction: "Reconcile billing",
  metrics: [
    { label: "Monthly recurring revenue", value: "$428.6K", detail: "+11.2% month over month", icon: CircleDollarSign, tone: "success" },
    { label: "Active subscriptions", value: "3,284", detail: "79.6% paid workspaces", icon: CreditCard, tone: "info" },
    { label: "Past due", value: "42", detail: "$8,940 outstanding", icon: ReceiptText, tone: "danger" },
    { label: "Trialing", value: "318", detail: "64 expire this week", icon: WalletCards, tone: "violet" },
  ],
  tabs: [{ value: "subscriptions", label: "Subscriptions", count: "3.6K" }, { value: "plans", label: "Plans" }, { value: "invoices", label: "Invoices", count: "42" }, { value: "quotas", label: "Quota overrides" }],
  table: {
    title: "Subscription overview",
    description: "Workspace-plan mapping with billing period and provider synchronization state.",
    searchPlaceholder: "Search workspace, customer or subscription...",
    filterLabel: "All subscription states",
    filterOptions: ["Active", "Trialing", "Past due", "Canceled"],
    columns: [{ key: "workspace", label: "Workspace", className: "min-w-52" }, { key: "plan", label: "Plan version" }, { key: "status", label: "Status" }, { key: "mrr", label: "MRR" }, { key: "period", label: "Current period" }, { key: "provider", label: "Provider sync" }],
    rows: [
      { id: "sub_acme", cells: { workspace: { primary: "Acme Design", secondary: "cus_A18F2", mono: true }, plan: "Enterprise v3", status: { badge: "ACTIVE", tone: "success" }, mrr: "$4,280", period: "Aug 01 – Sep 01", provider: { badge: "SYNCED", tone: "success" } } },
      { id: "sub_northstar", cells: { workspace: { primary: "Northstar Labs", secondary: "cus_B70D1", mono: true }, plan: "Business v5", status: { badge: "ACTIVE", tone: "success" }, mrr: "$2,840", period: "Aug 12 – Sep 12", provider: { badge: "SYNCED", tone: "success" } } },
      { id: "sub_paper", cells: { workspace: { primary: "Paper Street", secondary: "cus_910CE", mono: true }, plan: "Business v5", status: { badge: "PAST DUE", tone: "danger" }, mrr: "$2,120", period: "Jul 28 – Aug 28", provider: { badge: "ACTION NEEDED", tone: "warning" } } },
      { id: "sub_mori", cells: { workspace: { primary: "Mori Studio", secondary: "cus_4C2A8", mono: true }, plan: "Pro v4", status: { badge: "TRIALING", tone: "violet" }, mrr: "$0", period: "Trial ends Sep 04", provider: { badge: "LOCAL", tone: "neutral" } } },
    ],
    totalLabel: "Showing 1–4 of 3,602 subscriptions",
    rowActions: ["View subscription", "Open invoice timeline", "Inspect effective quota", "Preview plan change"],
  },
  insight: {
    title: "Revenue & entitlement health",
    description: "Commercial lifecycle and effective quota signals.",
    items: [
      { label: "Enterprise MRR", value: "54%", progress: 54, tone: "violet" },
      { label: "Business MRR", value: "31%", progress: 31, tone: "info" },
      { label: "Pro MRR", value: "15%", progress: 15, tone: "success" },
      { label: "Expired quota overrides", value: "7", status: "REVIEW", tone: "warning" },
    ],
    note: { title: "Plan versions preserve history", description: "Limit or entitlement changes create a new effective version instead of mutating active historical plans.", tone: "info" },
  },
}

export function BillingPage() {
  return <AdminModulePage config={config} />
}
