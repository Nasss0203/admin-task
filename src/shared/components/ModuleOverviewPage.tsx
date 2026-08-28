import { Activity, ArrowUpRight, Database, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/shared/components/PageHeader"

type ModuleOverviewPageProps = { title: string; description: string }

export function ModuleOverviewPage({ title, description }: ModuleOverviewPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform module" title={title} description={description}
        actions={<><Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button><Button><Plus className="size-4" /> New action</Button></>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total records", "24,892", "+8.4%"], ["Active", "21,046", "+4.2%"], ["Needs review", "148", "-12.8%"], ["Success rate", "99.82%", "+0.04%"],
        ].map(([label, value, change]) => (
          <Card key={label} className="py-0 shadow-none"><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><div className="mt-2 flex items-end justify-between"><p className="text-2xl font-semibold tracking-tight">{value}</p><Badge variant="secondary" className="text-emerald-700">{change}</Badge></div></CardContent></Card>
        ))}
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>
        <TabsContent value="overview" className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
          <Card className="shadow-none">
            <CardHeader className="flex-row items-center justify-between"><div><CardTitle>Recent records</CardTitle><CardDescription>Static layout ready for module data.</CardDescription></div><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></CardHeader>
            <CardContent>
              <div className="relative mb-4"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder={`Search ${title.toLowerCase()}...`} /></div>
              <div className="divide-y rounded-lg border">
                {["Primary platform record", "Quarterly review queue", "Automated integrity check", "Operational policy set"].map((name, index) => (
                  <div key={name} className="flex items-center gap-3 p-3.5"><div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Database className="size-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{name}</p><p className="text-xs text-muted-foreground">ID • tm_{8240 + index} · Updated {index + 1}h ago</p></div><Badge variant={index === 2 ? "outline" : "secondary"}>{index === 2 ? "Review" : "Active"}</Badge><ArrowUpRight className="size-4 text-muted-foreground" /></div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none"><CardHeader><CardTitle>Module health</CardTitle><CardDescription>Current operating indicators</CardDescription></CardHeader><CardContent className="space-y-5">
            {[['Availability', 99], ['Data freshness', 92], ['Policy coverage', 84]].map(([label, value]) => <div key={label as string}><div className="mb-2 flex justify-between text-sm"><span>{label}</span><span className="font-medium">{value}%</span></div><Progress value={value as number} /></div>)}
            <div className="rounded-lg border bg-muted/35 p-4"><div className="flex items-center gap-2 text-sm font-medium"><Activity className="size-4 text-emerald-600" /> All systems normal</div><p className="mt-1 text-xs leading-5 text-muted-foreground">No critical operational events have been detected in the last 24 hours.</p></div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="activity"><Card className="shadow-none"><CardContent className="p-8 text-sm text-muted-foreground">Activity timeline layout is ready for backend data.</CardContent></Card></TabsContent>
        <TabsContent value="settings"><Card className="shadow-none"><CardContent className="p-8 text-sm text-muted-foreground">Module settings layout is ready for form integration.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  )
}
