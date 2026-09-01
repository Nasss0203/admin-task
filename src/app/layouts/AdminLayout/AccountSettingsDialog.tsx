import { BellRing, ExternalLink, ShieldCheck } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

type AccountSettingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountSettingsDialog({ open, onOpenChange }: AccountSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px]">
        <DialogHeader className="shrink-0 p-6 pb-5">
          <DialogTitle>Account settings</DialogTitle>
          <DialogDescription>Manage your profile and personal admin preferences.</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-6 [scrollbar-gutter:stable]">
          <section className="flex items-center gap-4">
            <Avatar className="size-12">
              <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">AN</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">Alex Nguyen</p>
                <Badge variant="secondary" className="text-[10px]">Super Admin</Badge>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">alex.nguyen@taskmanly.com</p>
            </div>
            <Button variant="outline" size="sm">Change photo</Button>
          </section>

          <section className="space-y-4" aria-labelledby="profile-settings-heading">
            <div>
              <h3 id="profile-settings-heading" className="text-sm font-medium">Profile</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Information displayed across the admin workspace.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="account-display-name">Display name</Label>
                <Input id="account-display-name" defaultValue="Alex Nguyen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-email">Work email</Label>
                <Input id="account-email" value="alex.nguyen@taskmanly.com" disabled />
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4" aria-labelledby="preference-settings-heading">
            <div>
              <h3 id="preference-settings-heading" className="text-sm font-medium">Preferences</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Used for timestamps, reports, and interface text.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="account-timezone">Timezone</Label>
                <Select defaultValue="asia-saigon">
                  <SelectTrigger id="account-timezone" className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-saigon">Asia/Ho Chi Minh</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="asia-singapore">Asia/Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-language">Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger id="account-language" className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="vietnamese">Tiếng Việt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4" aria-labelledby="notification-settings-heading">
            <div>
              <h3 id="notification-settings-heading" className="text-sm font-medium">Notifications</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Choose which operational updates reach your inbox.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><BellRing className="size-4" /></div>
              <div className="min-w-0 flex-1">
                <Label htmlFor="critical-alerts" className="text-sm font-medium">Critical platform alerts</Label>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Email me about service outages and security events.</p>
              </div>
              <Switch id="critical-alerts" defaultChecked aria-label="Critical platform alerts" />
            </div>
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground"><ShieldCheck className="size-4" /></div>
              <div className="min-w-0 flex-1">
                <Label htmlFor="security-summary" className="text-sm font-medium">Weekly security summary</Label>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Receive a weekly digest of privileged admin activity.</p>
              </div>
              <Switch id="security-summary" aria-label="Weekly security summary" />
            </div>
            <Button variant="link" className="h-auto px-0 text-xs">
              Open security settings <ExternalLink className="size-3.5" />
            </Button>
          </section>
        </div>

        <DialogFooter className="mx-0 mb-0 shrink-0 border-t bg-muted/25 p-4 sm:px-6">
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <DialogClose asChild><Button>Save changes</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
