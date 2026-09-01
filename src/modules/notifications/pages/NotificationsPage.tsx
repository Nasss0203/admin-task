import { BellRing, CircleCheck, MailWarning, Send } from "lucide-react"

import { AdminModulePage, type ModulePageConfig } from "@/shared/components/AdminModulePage"

const config: ModulePageConfig = {
  eyebrow: "Communication operations",
  title: "Notifications",
  description: "Manage platform announcements and inspect notification and email delivery health across all channels.",
  primaryAction: "Create announcement",
  secondaryAction: "Refresh delivery logs",
  metrics: [
    { label: "Delivered today", value: "1.86M", detail: "99.42% delivery rate", icon: CircleCheck, tone: "success" },
    { label: "Queued", value: "8,204", detail: "Oldest message 42 seconds", icon: Send, tone: "info" },
    { label: "Failed", value: "10,842", detail: "0.58% of attempted deliveries", icon: MailWarning, tone: "danger" },
    { label: "Active announcements", value: "3", detail: "1 scheduled for tomorrow", icon: BellRing, tone: "violet" },
  ],
  tabs: [{ value: "delivery", label: "Delivery logs" }, { value: "announcements", label: "Announcements", count: "3" }, { value: "email", label: "Email operations" }, { value: "templates", label: "Templates" }],
  table: {
    title: "Recent deliveries",
    description: "Masked recipients, template version, provider, attempts, and final delivery state.",
    searchPlaceholder: "Search message ID, template or recipient...",
    filterLabel: "All delivery states",
    filterOptions: ["Queued", "Delivered", "Read", "Failed", "Expired"],
    columns: [{ key: "message", label: "Message", className: "min-w-56" }, { key: "recipient", label: "Recipient" }, { key: "type", label: "Type" }, { key: "channel", label: "Channel" }, { key: "attempts", label: "Attempts" }, { key: "status", label: "Status" }, { key: "time", label: "Queued" }],
    rows: [
      { id: "msg_840c", cells: { message: { primary: "msg_840c2e", secondary: "SECURITY_ALERT v3", mono: true }, recipient: "a***@acme.design", type: "Security", channel: "Email", attempts: "1", status: { badge: "DELIVERED", tone: "success" }, time: "1 min ago" } },
      { id: "msg_29ab", cells: { message: { primary: "msg_29ab17", secondary: "MENTION v8", mono: true }, recipient: "usr_72f…", type: "Mention", channel: "In-app", attempts: "1", status: { badge: "READ", tone: "info" }, time: "3 min ago" } },
      { id: "msg_61df", cells: { message: { primary: "msg_61df80", secondary: "WORKSPACE_INVITE v5", mono: true }, recipient: "m***@northstar.io", type: "Invite", channel: "Email", attempts: "3", status: { badge: "FAILED", tone: "danger" }, time: "8 min ago" } },
      { id: "msg_b129", cells: { message: { primary: "msg_b129ac", secondary: "SYSTEM_ANNOUNCEMENT", mono: true }, recipient: "plan:BUSINESS", type: "System", channel: "In-app", attempts: "0", status: { badge: "QUEUED", tone: "warning" }, time: "12 min ago" } },
    ],
    totalLabel: "Showing latest 4 of 1,879,046 delivery attempts today",
    rowActions: ["View delivery detail", "Inspect provider response", "Retry delivery", "View template version"],
  },
  insight: {
    title: "Channel health",
    description: "Delivery success and engagement over the last 24 hours.",
    items: [
      { label: "In-app delivery", value: "99.9%", progress: 99.9, tone: "success" },
      { label: "Email delivery", value: "98.7%", progress: 98.7, tone: "success" },
      { label: "Email bounce rate", value: "0.42%", progress: 4.2, tone: "warning" },
      { label: "Provider status", value: "Operational", status: "HEALTHY", tone: "success" },
    ],
    note: { title: "Credentials never enter delivery logs", description: "Password-reset URLs, tokens, and provider secrets are redacted before persistence.", tone: "violet" },
  },
}

export function NotificationsPage() {
  return <AdminModulePage config={config} />
}
