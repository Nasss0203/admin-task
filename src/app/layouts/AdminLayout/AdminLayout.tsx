import { Outlet } from "react-router-dom"

import { AdminHeader } from "./AdminHeader"
import { AdminSidebar } from "./AdminSidebar"

export function AdminLayout() {
  return (
    <div className="min-h-svh bg-background lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <AdminSidebar className="hidden lg:sticky lg:top-0 lg:flex lg:h-svh" />
      <div className="min-w-0">
        <AdminHeader />
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
