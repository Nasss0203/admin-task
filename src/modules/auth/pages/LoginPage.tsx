import { ArrowRight, Building2, Clock3, LockKeyhole, Mail, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function LoginPage() {
  return (
    <div className="auth-form-shell">
      <div className="mb-6">
        <Badge variant="outline" className="mb-4 gap-1.5 border-primary/20 bg-primary/5 text-[11px] font-medium text-primary">
          <ShieldCheck className="size-3.5" /> Restricted admin access
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">Sign in to Taskmanly</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Use your authorized organization account to access the control center.</p>
      </div>

      <Card className="gap-0 border-border/80 py-0 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.16)]">
        <CardHeader className="p-6 pb-5">
          <CardTitle className="text-base">Administrator sign in</CardTitle>
          <CardDescription>Your organization security policies will apply.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 p-6 pt-0">
          <Button variant="outline" size="lg" className="w-full justify-center">
            <Building2 className="size-4 text-primary" /> Continue with company SSO
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">or use credentials</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Work email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="admin-email" type="email" autoComplete="email" placeholder="name@company.com" className="h-10 pl-9" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="admin-password">Password</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="admin-password" type="password" autoComplete="current-password" placeholder="Enter your password" className="h-10 pl-9" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember-device" />
              <Label htmlFor="remember-device" className="text-xs font-normal text-muted-foreground">Trust this device for 12 hours</Label>
            </div>

            <Button type="button" size="lg" className="w-full justify-center">
              Continue securely <ArrowRight className="size-4" />
            </Button>
          </form>

          <div className="rounded-lg border border-primary/15 bg-primary/[0.035] p-3.5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-medium text-foreground">Protected administrator session</p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Two-factor verification is required. Sign-in attempts and privileged activity are recorded in the audit log.</p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground"><Clock3 className="size-3" /> Sessions expire after 30 minutes of inactivity</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Access issue? <a href="#" className="font-medium text-foreground hover:text-primary">Contact IT support</a>
      </p>
    </div>
  )
}
