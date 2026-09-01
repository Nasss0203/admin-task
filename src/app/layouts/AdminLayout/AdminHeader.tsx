import { useState } from "react"
import { Bell, Check, ChevronDown, Menu, Search, Settings2 } from "lucide-react"

import { AdminSidebar } from "./AdminSidebar"
import { AccountSettingsDialog } from "./AccountSettingsDialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminHeader() {
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <Sheet>
        <SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation"><Menu className="size-4" /></Button></SheetTrigger>
        <SheetContent side="left" className="w-[280px] border-none bg-sidebar p-0 [&>button]:text-white"><AdminSidebar className="h-full" /></SheetContent>
      </Sheet>
      <button type="button" className="hidden h-9 w-full max-w-sm items-center gap-2 rounded-lg border bg-muted/40 px-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted md:flex">
        <Search className="size-4" /><span className="flex-1">Search users, workspaces, IDs...</span><kbd className="rounded border bg-card px-1.5 py-0.5 font-mono text-[10px]">⌘ K</kbd>
      </button>
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Badge variant="outline" className="hidden gap-1.5 rounded-md py-1 font-normal text-muted-foreground sm:flex"><span className="size-1.5 rounded-full bg-emerald-500" /> Production</Badge>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications"><Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive ring-2 ring-card" /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 px-1.5 sm:px-2">
              <Avatar className="size-7"><AvatarFallback className="bg-primary text-[11px] font-semibold text-primary-foreground">AN</AvatarFallback></Avatar>
              <span className="hidden text-left sm:block"><span className="block text-xs font-medium leading-4">Alex Nguyen</span><span className="block text-[10px] text-muted-foreground">Super Admin</span></span>
              <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin account</DropdownMenuLabel><DropdownMenuSeparator />
            <DropdownMenuItem><Check className="size-4" /> Security verified</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAccountSettingsOpen(true)}><Settings2 className="size-4" /> Account settings</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </header>
      <AccountSettingsDialog open={accountSettingsOpen} onOpenChange={setAccountSettingsOpen} />
    </>
  )
}
