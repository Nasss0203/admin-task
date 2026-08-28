import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type MetricCardProps = {
  label: string
  value: string
  change: string
  trend?: "up" | "down"
  note: string
  freshness?: string
  icon: LucideIcon
  iconClassName?: string
}

export function MetricCard({ label, value, change, trend = "up", note, freshness = "Updated 43s ago", icon: Icon, iconClassName }: MetricCardProps) {
  const positive = trend === "up"
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="border-border/80 py-0 shadow-none transition-shadow hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{label}</span>
              <Tooltip>
                <TooltipTrigger aria-label={`About ${label}`}><Info className="size-3.5" /></TooltipTrigger>
                <TooltipContent className="max-w-60">{note}</TooltipContent>
              </Tooltip>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className={cn("grid size-10 place-items-center rounded-xl bg-primary/10 text-primary", iconClassName)}>
            <Icon className="size-[18px]" />
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className={cn("flex items-center gap-0.5 text-xs font-medium", positive ? "text-emerald-600" : "text-rose-600")}>
            <TrendIcon className="size-3.5" /> {change}
            <span className="ml-1 font-normal text-muted-foreground">vs previous period</span>
          </div>
          <span className="whitespace-nowrap text-[10px] text-muted-foreground">{freshness}</span>
        </div>
      </CardContent>
    </Card>
  )
}
