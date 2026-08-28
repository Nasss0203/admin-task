import {
  Activity, AlertTriangle, ArrowRight, Bot, Building2, CalendarDays,
  CheckCircle2, Clock3, Cpu, Database, DollarSign, MoreHorizontal,
  RefreshCw, Server, Users, Zap,
} from "lucide-react"

import { TrendChart } from "@/modules/dashboard/components/TrendChart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MetricCard } from "@/shared/components/MetricCard"
import { PageHeader } from "@/shared/components/PageHeader"
import { StatusBadge } from "@/shared/components/StatusBadge"

const services = [
  { name: "Public API", icon: Server, uptime: "99.99%", latency: "128ms", status: "healthy" as const },
  { name: "PostgreSQL", icon: Database, uptime: "99.98%", latency: "18ms", status: "healthy" as const },
  { name: "Redis", icon: Zap, uptime: "99.99%", latency: "4ms", status: "healthy" as const },
  { name: "AI service", icon: Bot, uptime: "99.72%", latency: "1.83s", status: "warning" as const },
]

const workspaces = [
  { name: "Acme Design", plan: "Enterprise", users: "428", ai: "2.8M", storage: 84, amount: "$4,280" },
  { name: "Northstar Labs", plan: "Business", users: "216", ai: "1.9M", storage: 62, amount: "$2,840" },
  { name: "Paper Street", plan: "Business", users: "184", ai: "1.4M", storage: 57, amount: "$2,120" },
  { name: "Mori Studio", plan: "Pro", users: "98", ai: "948K", storage: 46, amount: "$980" },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Friday, August 28"
        title="Good evening, Alex"
        description="Here’s what’s happening across the Taskmanly platform today."
        actions={<Button variant="outline"><RefreshCw className="size-4" /> Refresh data</Button>}
      />

      <Card className="py-0 shadow-none">
        <CardContent className="flex flex-wrap items-center gap-3 p-3">
          <div className="flex items-center gap-2 px-1 text-xs font-medium text-muted-foreground"><CalendarDays className="size-4" /> Global filters</div>
          <Select defaultValue="7d"><SelectTrigger className="h-8 w-[142px] text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="today">Today</SelectItem><SelectItem value="7d">Last 7 days</SelectItem><SelectItem value="30d">Last 30 days</SelectItem></SelectContent></Select>
          <Select defaultValue="prod"><SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="prod">Production</SelectItem><SelectItem value="stage">Staging</SelectItem></SelectContent></Select>
          <Select defaultValue="all"><SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All plans</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem><SelectItem value="business">Business</SelectItem></SelectContent></Select>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground"><Clock3 className="size-3.5" /> Data fresh as of 20:41</span>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Platform metrics">
        <MetricCard label="Total users" value="128,420" change="12.4%" note="All registered user accounts across the platform." icon={Users} iconClassName="bg-blue-50 text-blue-600" />
        <MetricCard label="Active workspaces" value="3,842" change="8.7%" note="Workspaces with at least one tracked activity in the selected period." icon={Building2} iconClassName="bg-violet-50 text-violet-600" />
        <MetricCard label="AI requests" value="1.28M" change="17.2%" note="Completed and failed AI generation requests in the selected period." icon={Bot} iconClassName="bg-amber-50 text-amber-600" />
        <MetricCard label="API error rate" value="0.42%" change="0.08%" trend="down" note="Percentage of 5xx responses across platform APIs." icon={Activity} iconClassName="bg-emerald-50 text-emerald-600" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,1fr)]">
        <Card className="shadow-none">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div><CardTitle>Platform growth</CardTitle><CardDescription>Active users and workspace adoption</CardDescription></div>
            <Select defaultValue="users"><SelectTrigger className="h-8 w-[126px] text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="users">Active users</SelectItem><SelectItem value="workspaces">Workspaces</SelectItem></SelectContent></Select>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex items-baseline gap-3"><span className="text-3xl font-semibold tracking-tight">42,680</span><Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">+11.8%</Badge></div>
            <TrendChart />
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex-row items-start justify-between"><div><CardTitle>Platform health</CardTitle><CardDescription>Live service availability</CardDescription></div><Badge variant="outline" className="gap-1.5 border-emerald-200 bg-emerald-50 text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" /> Operational</Badge></CardHeader>
          <CardContent className="space-y-1">
            {services.map(({ name, icon: Icon, uptime, latency, status }) => (
              <div key={name} className="flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-muted/50">
                <div className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground"><Icon className="size-4" /></div>
                <div className="min-w-0 flex-1"><p className="text-sm font-medium">{name}</p><p className="text-[11px] text-muted-foreground">{uptime} uptime</p></div>
                <div className="text-right"><StatusBadge status={status} /><p className="mt-1 text-[10px] text-muted-foreground">{latency}</p></div>
              </div>
            ))}
            <Button variant="ghost" className="mt-2 w-full justify-between text-xs text-muted-foreground">View system monitoring <ArrowRight className="size-4" /></Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,1fr)]">
        <Card className="shadow-none">
          <CardHeader className="flex-row items-center justify-between"><div><CardTitle>Top consuming workspaces</CardTitle><CardDescription>Ranked by AI usage in the last 7 days</CardDescription></div><Button variant="outline" size="sm">View all</Button></CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader><TableRow><TableHead className="pl-6">Workspace</TableHead><TableHead>Members</TableHead><TableHead>AI tokens</TableHead><TableHead>Storage</TableHead><TableHead className="pr-6 text-right">MRR</TableHead></TableRow></TableHeader>
              <TableBody>{workspaces.map((workspace, index) => <TableRow key={workspace.name}>
                <TableCell className="pl-6"><div className="flex items-center gap-3"><div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">{workspace.name.slice(0, 2).toUpperCase()}</div><div><p className="text-sm font-medium">{workspace.name}</p><p className="text-[11px] text-muted-foreground">{workspace.plan}</p></div></div></TableCell>
                <TableCell>{workspace.users}</TableCell><TableCell className="font-mono text-xs">{workspace.ai}</TableCell>
                <TableCell><div className="w-24"><div className="mb-1 flex justify-between text-[10px] text-muted-foreground"><span>{workspace.storage}%</span></div><Progress value={workspace.storage} className={index === 0 ? "[&>div]:bg-amber-500" : ""} /></div></TableCell>
                <TableCell className="pr-6 text-right font-medium">{workspace.amount}</TableCell>
              </TableRow>)}</TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex-row items-start justify-between"><div><CardTitle>Open alerts</CardTitle><CardDescription>Events requiring admin attention</CardDescription></div><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3.5"><div className="flex gap-3"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-rose-600" /><div><div className="flex items-center gap-2"><p className="text-sm font-medium">RAG indexing failures</p><Badge variant="destructive" className="h-5 text-[10px]">Critical</Badge></div><p className="mt-1 text-xs leading-5 text-muted-foreground">24 documents failed across 3 workspaces.</p><p className="mt-2 text-[10px] text-muted-foreground">8 minutes ago</p></div></div></div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3.5"><div className="flex gap-3"><Cpu className="mt-0.5 size-4 shrink-0 text-amber-600" /><div><p className="text-sm font-medium">Queue backlog increasing</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Email delivery queue has 1,428 waiting jobs.</p><p className="mt-2 text-[10px] text-muted-foreground">22 minutes ago</p></div></div></div>
            <div className="rounded-lg border p-3.5"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" /><div><p className="text-sm font-medium">Database recovery complete</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Read replica latency has returned to normal.</p><p className="mt-2 text-[10px] text-muted-foreground">1 hour ago</p></div></div></div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[{ title: "AI cost", value: "$18,420", note: "72% of monthly budget", icon: DollarSign, progress: 72 }, { title: "Queue throughput", value: "42.8K/hr", note: "4 queues, 1 warning", icon: Zap, progress: 86 }, { title: "Storage used", value: "18.4 TB", note: "61% of allocated capacity", icon: Database, progress: 61 }].map(({ title, value, note, icon: Icon, progress }) => (
          <Card key={title} className="py-0 shadow-none"><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">{title}</p><p className="mt-1 text-xl font-semibold">{value}</p></div><Icon className="size-5 text-muted-foreground" /></div><Progress value={progress} className="mt-4" /><p className="mt-2 text-[11px] text-muted-foreground">{note}</p></CardContent></Card>
        ))}
      </section>
    </div>
  )
}
