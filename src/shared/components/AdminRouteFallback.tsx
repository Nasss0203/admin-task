import { LoaderCircle } from "lucide-react"

export function AdminRouteFallback() {
  return (
    <div className="grid min-h-svh place-items-center bg-background">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin text-primary" />
        Loading admin workspace...
      </div>
    </div>
  )
}
