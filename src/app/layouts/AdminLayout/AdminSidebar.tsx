import { PanelLeftClose } from "lucide-react"
import { NavLink } from "react-router-dom"

import { adminNavigation, productIcon as ProductIcon } from "@/app/config/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type AdminSidebarProps = { className?: string; onNavigate?: () => void }

export function AdminSidebar({ className, onNavigate }: AdminSidebarProps) {
  return (
    <aside className={cn("flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground", className)}>
      <div className="flex h-16 shrink-0 items-center gap-3 px-4">
        <div className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
          <ProductIcon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold tracking-tight text-white">Taskmanly</p>
            <Badge className="h-5 border-white/10 bg-white/10 px-1.5 text-[10px] text-white hover:bg-white/10">ADMIN</Badge>
          </div>
          <p className="text-xs text-sidebar-foreground/55">Platform control center</p>
        </div>
        <Button variant="ghost" size="icon-sm" className="hidden text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-white lg:inline-flex" aria-label="Collapse sidebar">
          <PanelLeftClose className="size-4" />
        </Button>
      </div>
      <Separator className="bg-sidebar-border" />
      <nav className="scrollbar-subtle flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        <div className="space-y-5">
          {adminNavigation.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/40">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink key={item.href} to={item.href} end={item.href === "/"} onClick={onNavigate}
                      className={({ isActive }) => cn(
                        "group flex h-9 items-center gap-3 rounded-lg px-2.5 text-[13px] font-medium text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
                      )}
                    >
                      {({ isActive }) => <>
                        <Icon className={cn("size-4 shrink-0", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/45 group-hover:text-sidebar-foreground/80")} />
                        <span className="truncate">{item.label}</span>
                      </>}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <div className="rounded-xl bg-sidebar-accent/75 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-white">System status</span>
            <span className="flex items-center gap-1.5 text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-400" /> Operational</span>
          </div>
          <p className="text-[11px] leading-4 text-sidebar-foreground/50">Last health check 24 seconds ago</p>
        </div>
      </div>
    </aside>
  )
}
