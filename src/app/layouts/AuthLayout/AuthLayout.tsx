import { Command } from "lucide-react"
import { Outlet } from "react-router-dom"

import { Badge } from "@/components/ui/badge"

export function AuthLayout() {
  return (
    <main className="flex min-h-svh flex-col bg-background">
      <header className="flex h-16 shrink-0 items-center border-b bg-card/90 px-5 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Command className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-tight">Taskmanly</p>
              <Badge variant="outline" className="h-5 px-1.5 text-[9px]">ADMIN</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">Platform control center</p>
          </div>
          <Badge variant="outline" className="ml-auto gap-1.5 border-emerald-200 bg-emerald-50 text-[10px] font-normal text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">All systems operational</span>
            <span className="sm:hidden">Operational</span>
          </Badge>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 sm:py-10">
        <Outlet />
      </section>

      <footer className="flex shrink-0 flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 py-5 text-[11px] text-muted-foreground">
        <span>© 2026 Taskmanly</span>
        <a href="#" className="hover:text-foreground">Security policy</a>
        <a href="#" className="hover:text-foreground">Contact IT support</a>
      </footer>
    </main>
  )
}
