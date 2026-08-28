import { Archive, Building2, Download, Filter, HardDrive, MoreHorizontal, Plus, Search, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/shared/components/PageHeader"
import { StatusBadge } from "@/shared/components/StatusBadge"

const workspacesData = [
  { name: "Acme Design", code: "AC", owner: "Linh Tran", plan: "Enterprise", members: 428, storage: 84, status: "active" as const, activity: "2 min ago" },
  { name: "Northstar Labs", code: "NL", owner: "Minh Hoang", plan: "Business", members: 216, storage: 62, status: "active" as const, activity: "18 min ago" },
  { name: "Paper Street", code: "PS", owner: "Sofia Wilson", plan: "Business", members: 184, storage: 57, status: "active" as const, activity: "1 hour ago" },
  { name: "Mori Studio", code: "MS", owner: "Quang Le", plan: "Pro", members: 98, storage: 46, status: "warning" as const, activity: "Yesterday" },
  { name: "Pixel Works", code: "PW", owner: "Ava Robinson", plan: "Pro", members: 74, storage: 31, status: "active" as const, activity: "2 hours ago" },
  { name: "Legacy Sandbox", code: "LS", owner: "Tuan Pham", plan: "Free", members: 4, storage: 12, status: "suspended" as const, activity: "21 days ago" },
]

export function WorkspacesPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title="Workspaces" description="Monitor tenant health, plans, membership, usage, storage, and workspace status across Taskmanly."
        actions={<><Button variant="outline"><Download className="size-4" /> Export</Button><Button><Plus className="size-4" /> Create workspace</Button></>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total workspaces", value: "4,128", detail: "+8.7% this month", icon: Building2 },
          { label: "Active workspaces", value: "3,842", detail: "93.1% of total", icon: Users },
          { label: "Storage allocated", value: "30.2 TB", detail: "18.4 TB used", icon: HardDrive },
          { label: "Suspended", value: "86", detail: "12 pending review", icon: Archive },
        ].map(({ label, value, detail, icon: Icon }) => <Card key={label} className="py-0 shadow-none"><CardContent className="flex items-start justify-between p-5"><div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p><p className="mt-2 text-[11px] text-muted-foreground">{detail}</p></div><div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></div></CardContent></Card>)}
      </div>
      <Card className="gap-0 py-0 shadow-none">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-60 flex-1 lg:max-w-sm"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search workspace, owner or ID..." /></div>
          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <Select defaultValue="all"><SelectTrigger className="w-[135px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="suspended">Suspended</SelectItem></SelectContent></Select>
            <Select defaultValue="plans"><SelectTrigger className="w-[125px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="plans">All plans</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem><SelectItem value="business">Business</SelectItem><SelectItem value="pro">Pro</SelectItem></SelectContent></Select>
            <Button variant="outline"><Filter className="size-4" /> Filters</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead className="min-w-56 pl-6">Workspace</TableHead><TableHead>Owner</TableHead><TableHead>Plan</TableHead><TableHead>Members</TableHead><TableHead className="min-w-36">Storage usage</TableHead><TableHead>Status</TableHead><TableHead className="min-w-28">Last activity</TableHead><TableHead className="w-14" /></TableRow></TableHeader>
            <TableBody>{workspacesData.map((workspace) => <TableRow key={workspace.name}>
              <TableCell className="pl-6"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">{workspace.code}</div><div><p className="text-sm font-medium">{workspace.name}</p><p className="font-mono text-[10px] text-muted-foreground">ws_{workspace.code.toLowerCase()}_2026</p></div></div></TableCell>
              <TableCell className="text-sm">{workspace.owner}</TableCell><TableCell><Badge variant="secondary" className="font-normal">{workspace.plan}</Badge></TableCell><TableCell>{workspace.members}</TableCell>
              <TableCell><div className="w-28"><div className="mb-1 flex justify-between text-[10px] text-muted-foreground"><span>{workspace.storage}% used</span></div><Progress value={workspace.storage} className={workspace.storage > 80 ? "[&>div]:bg-amber-500" : ""} /></div></TableCell>
              <TableCell><StatusBadge status={workspace.status} /></TableCell><TableCell className="text-xs text-muted-foreground">{workspace.activity}</TableCell>
              <TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={`Actions for ${workspace.name}`}><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>View workspace</DropdownMenuItem><DropdownMenuItem>Inspect usage</DropdownMenuItem><DropdownMenuItem>Transfer ownership</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive">Suspend workspace</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-3 border-t px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>Showing 1–6 of 4,128 workspaces</span><div className="flex gap-2"><Button variant="outline" size="sm" disabled>Previous</Button><Button variant="outline" size="sm">Next</Button></div></div>
      </Card>
    </div>
  )
}
