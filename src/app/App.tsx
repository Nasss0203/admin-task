import { RouterProvider } from "react-router-dom"

import { TooltipProvider } from "@/components/ui/tooltip"
import { router } from "@/app/router/router"

export function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}
