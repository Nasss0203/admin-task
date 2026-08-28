import type { LucideIcon } from "lucide-react"
import {
  Activity, BellRing, Blocks, Bot, Building2, Command, CreditCard,
  FileStack, Flag, FolderKanban, Gauge, LifeBuoy, LockKeyhole,
  Search, Settings2, ShieldCheck, Sparkles, Users, Workflow,
} from "lucide-react"

export type NavigationItem = { label: string; href: string; icon: LucideIcon }
export type NavigationGroup = { label: string; items: NavigationItem[] }

export const adminNavigation: NavigationGroup[] = [
  { label: "Overview", items: [{ label: "Dashboard", href: "/", icon: Gauge }] },
  { label: "Platform", items: [
    { label: "Users", href: "/users", icon: Users },
    { label: "Workspaces", href: "/workspaces", icon: Building2 },
    { label: "Teamspaces", href: "/teamspaces", icon: FolderKanban },
  ] },
  { label: "Content", items: [
    { label: "Content", href: "/content", icon: FileStack },
    { label: "Published sites", href: "/published-sites", icon: Blocks },
    { label: "Templates", href: "/templates", icon: Sparkles },
  ] },
  { label: "Intelligence", items: [
    { label: "AI operations", href: "/ai", icon: Bot },
    { label: "Search", href: "/search", icon: Search },
  ] },
  { label: "SaaS & operations", items: [
    { label: "Plans & billing", href: "/billing", icon: CreditCard },
    { label: "Feature flags", href: "/feature-flags", icon: Flag },
    { label: "Notifications", href: "/notifications", icon: BellRing },
    { label: "Background jobs", href: "/jobs", icon: Workflow },
  ] },
  { label: "Trust & system", items: [
    { label: "Audit & security", href: "/security", icon: ShieldCheck },
    { label: "Support", href: "/support", icon: LifeBuoy },
    { label: "Monitoring", href: "/monitoring", icon: Activity },
    { label: "Access control", href: "/access-control", icon: LockKeyhole },
    { label: "System settings", href: "/system", icon: Settings2 },
  ] },
]

export const productIcon = Command
