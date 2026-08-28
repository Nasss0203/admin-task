import { Download, Filter, MoreHorizontal, Plus, Search, ShieldCheck, UserCheck, UserRoundX, Users } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/shared/components/PageHeader"
import { StatusBadge } from "@/shared/components/StatusBadge"

const usersData = [
  { name: "Linh Tran", initials: "LT", email: "l***@acme.design", role: "Member", workspace: "Acme Design", status: "active" as const, lastActive: "2 min ago", joined: "Aug 12, 2026" },
  { name: "Minh Hoang", initials: "MH", email: "m***@northstar.io", role: "Owner", workspace: "Northstar Labs", status: "active" as const, lastActive: "18 min ago", joined: "Jul 28, 2026" },
  { name: "Sofia Wilson", initials: "SW", email: "s***@paper.st", role: "Admin", workspace: "Paper Street", status: "pending" as const, lastActive: "Yesterday", joined: "Jul 21, 2026" },
  { name: "Quang Le", initials: "QL", email: "q***@mori.co", role: "Member", workspace: "Mori Studio", status: "suspended" as const, lastActive: "6 days ago", joined: "Jun 08, 2026" },
  { name: "Ava Robinson", initials: "AR", email: "a***@pixel.dev", role: "Owner", workspace: "Pixel Works", status: "active" as const, lastActive: "1 hour ago", joined: "May 19, 2026" },
  { name: "Tuan Pham", initials: "TP", email: "t***@orbit.vn", role: "Member", workspace: "Orbit Vietnam", status: "active" as const, lastActive: "3 hours ago", joined: "Apr 03, 2026" },
]

export function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title="Users" description="Inspect accounts, status, workspace membership, and platform access. Sensitive fields are masked by default."
        actions={<><Button variant="outline"><Download className="size-4" /> Export</Button><Button><Plus className="size-4" /> Add user</Button></>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total users", value: "128,420", change: "+12.4%", icon: Users, color: "bg-blue-50 text-blue-600" },
          { label: "Active (30d)", value: "42,680", change: "+8.1%", icon: UserCheck, color: "bg-emerald-50 text-emerald-600" },
          { label: "Pending verification", value: "1,284", change: "-3.2%", icon: ShieldCheck, color: "bg-amber-50 text-amber-600" },
          { label: "Suspended", value: "342", change: "+0.8%", icon: UserRoundX, color: "bg-rose-50 text-rose-600" },
        ].map(({ label, value, change, icon: Icon, color }) => <Card key={label} className="py-0 shadow-none"><CardContent className="flex items-center gap-4 p-5"><div className={`grid size-10 place-items-center rounded-xl ${color}`}><Icon className="size-[18px]" /></div><div className="min-w-0 flex-1"><p className="text-xs text-muted-foreground">{label}</p><div className="mt-1 flex items-baseline justify-between gap-2"><p className="text-xl font-semibold">{value}</p><span className="text-[11px] font-medium text-emerald-600">{change}</span></div></div></CardContent></Card>)}
      </div>

      <Card className="gap-0 py-0 shadow-none">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
          <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All users</TabsTrigger><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="pending">Pending</TabsTrigger><TabsTrigger value="suspended">Suspended</TabsTrigger></TabsList></Tabs>
          <div className="flex flex-1 flex-wrap items-center gap-2 lg:justify-end">
            <div className="relative min-w-56 flex-1 lg:max-w-xs"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search name, email or ID..." /></div>
            <Select defaultValue="all"><SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All plans</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem><SelectItem value="business">Business</SelectItem></SelectContent></Select>
            <Button variant="outline"><Filter className="size-4" /> More filters</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead className="min-w-64 pl-6">User</TableHead><TableHead>Role</TableHead><TableHead className="min-w-44">Primary workspace</TableHead><TableHead>Status</TableHead><TableHead className="min-w-28">Last active</TableHead><TableHead className="min-w-32">Joined</TableHead><TableHead className="w-14" /></TableRow></TableHeader>
            <TableBody>{usersData.map((user, index) => <TableRow key={user.email}>
              <TableCell className="pl-6"><div className="flex items-center gap-3"><Avatar className="size-8"><AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">{user.initials}</AvatarFallback></Avatar><div><p className="text-sm font-medium">{user.name}</p><p className="font-mono text-[11px] text-muted-foreground">{user.email}</p></div></div></TableCell>
              <TableCell><Badge variant="secondary" className="font-normal">{user.role}</Badge></TableCell><TableCell className="text-sm">{user.workspace}</TableCell><TableCell><StatusBadge status={user.status} /></TableCell><TableCell className="text-xs text-muted-foreground">{user.lastActive}</TableCell><TableCell className="text-xs text-muted-foreground">{user.joined}</TableCell>
              <TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.name}`}><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>View profile</DropdownMenuItem><DropdownMenuItem>View audit history</DropdownMenuItem><DropdownMenuItem>Reveal PII</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive">{index === 3 ? "Restore account" : "Suspend account"}</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-3 border-t px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>Showing 1–6 of 128,420 users</span><div className="flex gap-2"><Button variant="outline" size="sm" disabled>Previous</Button><Button variant="outline" size="sm">Next</Button></div></div>
      </Card>
    </div>
  )
}
