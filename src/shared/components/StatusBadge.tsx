import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Status = "active" | "healthy" | "warning" | "suspended" | "failed" | "pending"

const styles: Record<Status, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  healthy: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  suspended: "border-slate-200 bg-slate-100 text-slate-600",
  failed: "border-rose-200 bg-rose-50 text-rose-700",
  pending: "border-blue-200 bg-blue-50 text-blue-700",
}

export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  return (
    <Badge variant="outline" className={cn("gap-1.5 rounded-md px-2 py-0.5 font-medium capitalize", styles[status])}>
      <span className="size-1.5 rounded-full bg-current opacity-75" />
      {label ?? status}
    </Badge>
  )
}
