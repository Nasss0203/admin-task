import { Search, Settings2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminBillingPlans } from "../hooks/useAdminBillingPlans";
import type {
  AdminBillingPlan,
  BillingInterval,
  BillingProvider,
} from "../types/billing.types";
import { formatCurrency, formatDateTime } from "../utils/billing-formatters";
import { BillingPagination } from "./BillingPagination";
import { BillingPlanManageDialog } from "./BillingPlanManageDialog";

const PAGE_SIZE = 10;

type ActivityFilter = "ALL" | "ACTIVE" | "INACTIVE";
type VisibilityFilter = "ALL" | "PUBLIC" | "PRIVATE";
type PlanPrice = AdminBillingPlan["prices"][number];

interface PriceListProps {
  prices: PlanPrice[];
  interval: BillingInterval;
}

function PriceList({ prices, interval }: PriceListProps) {
  const intervalPrices = prices.filter(
    (price) => price.isActive && price.billingInterval === interval,
  );

  if (intervalPrices.length === 0) {
    return (
      <span className="text-xs text-muted-foreground">
        No {interval.toLowerCase()} price
      </span>
    );
  }

  return (
    <div className="space-y-2">
      {intervalPrices.map((price) => (
        <div
          key={price.id}
          className="min-w-44 rounded-md border bg-muted/20 px-3 py-2"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="whitespace-nowrap text-sm font-medium">
              {formatCurrency(price.amount, price.currency)}
            </span>

            <Badge
              variant="outline"
              className={
                price.provider === "STRIPE"
                  ? "rounded-md border-violet-200 bg-violet-50 text-[10px] text-violet-700"
                  : "rounded-md border-blue-200 bg-blue-50 text-[10px] text-blue-700"
              }
            >
              {price.provider}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BillingPlansTable() {
  const [page, setPage] = useState(1);
  const [draftSearch, setDraftSearch] = useState("");
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<BillingProvider | "ALL">("ALL");
  const [billingInterval, setBillingInterval] = useState<
    BillingInterval | "ALL"
  >("ALL");
  const [activity, setActivity] = useState<ActivityFilter>("ALL");
  const [visibility, setVisibility] = useState<VisibilityFilter>("ALL");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const query = useAdminBillingPlans({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    provider: provider === "ALL" ? undefined : provider,
    billingInterval: billingInterval === "ALL" ? undefined : billingInterval,
    isActive: activity === "ALL" ? undefined : activity === "ACTIVE",
    isPublic: visibility === "ALL" ? undefined : visibility === "PUBLIC",
  });

  const hasFilters =
    search.length > 0 ||
    provider !== "ALL" ||
    billingInterval !== "ALL" ||
    activity !== "ALL" ||
    visibility !== "ALL";

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(draftSearch.trim());
  }

  function handleResetFilters() {
    setPage(1);
    setDraftSearch("");
    setSearch("");
    setProvider("ALL");
    setBillingInterval("ALL");
    setActivity("ALL");
    setVisibility("ALL");
  }

  const items = query.data?.items ?? [];

  return (
    <>
      <Card className="gap-0 overflow-hidden py-0 shadow-none">
        <CardHeader className="border-b py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Plans &amp; prices</CardTitle>

              <CardDescription>
                Review plan visibility, feature limits and provider-specific
                monthly or yearly prices.
              </CardDescription>
            </div>

            {query.isFetching ? (
              <span className="text-xs text-muted-foreground">Updating…</span>
            ) : null}
          </div>
        </CardHeader>

        <div className="flex flex-col gap-3 border-b p-4">
          <form onSubmit={handleSearch} className="flex min-w-64 flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={draftSearch}
                onChange={(event) => setDraftSearch(event.target.value)}
                className="pl-9"
                placeholder="Search plan name, code or ID..."
              />
            </div>

            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap gap-2">
            <Select
              value={provider}
              onValueChange={(value) => {
                setProvider(value as BillingProvider | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All providers</SelectItem>
                <SelectItem value="STRIPE">Stripe</SelectItem>
                <SelectItem value="SEPAY">SePay</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={billingInterval}
              onValueChange={(value) => {
                setBillingInterval(value as BillingInterval | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Interval" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All intervals</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={activity}
              onValueChange={(value) => {
                setActivity(value as ActivityFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Activity" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All activity</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={visibility}
              onValueChange={(value) => {
                setVisibility(value as VisibilityFilter);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All visibility</SelectItem>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>

            {hasFilters ? (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResetFilters}
              >
                Reset filters
              </Button>
            ) : null}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-64 pl-6">Plan</TableHead>

                <TableHead className="min-w-44">Availability</TableHead>

                <TableHead className="min-w-52">Monthly prices</TableHead>

                <TableHead className="min-w-52">Yearly prices</TableHead>

                <TableHead className="min-w-44">Updated</TableHead>

                <TableHead className="w-28 pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {query.isPending ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Loading plans…
                  </TableCell>
                </TableRow>
              ) : query.isError ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-rose-600"
                  >
                    {query.error instanceof Error
                      ? query.error.message
                      : "Unable to load billing plans"}
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No plans found.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{plan.name}</p>

                        <Badge
                          variant="outline"
                          className="rounded-md font-mono text-[10px]"
                        >
                          {plan.code}
                        </Badge>
                      </div>

                      <p className="mt-1 max-w-80 text-xs text-muted-foreground">
                        {plan.description ?? "No description"}
                      </p>

                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                        {plan.id}
                      </p>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className={
                            plan.isActive
                              ? "rounded-md border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "rounded-md border-slate-200 bg-slate-100 text-slate-600"
                          }
                        >
                          {plan.isActive ? "Active" : "Inactive"}
                        </Badge>

                        <Badge
                          variant="outline"
                          className={
                            plan.isPublic
                              ? "rounded-md border-blue-200 bg-blue-50 text-blue-700"
                              : "rounded-md border-amber-200 bg-amber-50 text-amber-700"
                          }
                        >
                          {plan.isPublic ? "Public" : "Private"}
                        </Badge>
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {plan.prices.filter((price) => price.isActive).length}{" "}
                        {plan.prices.filter((price) => price.isActive)
                          .length === 1
                          ? "active price"
                          : "active prices"}
                      </p>
                    </TableCell>

                    <TableCell className="align-top">
                      <PriceList prices={plan.prices} interval="MONTHLY" />
                    </TableCell>

                    <TableCell className="align-top">
                      <PriceList prices={plan.prices} interval="YEARLY" />
                    </TableCell>

                    <TableCell className="text-xs">
                      {formatDateTime(plan.updatedAt)}
                    </TableCell>

                    <TableCell className="pr-6 text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedPlanId(plan.id)}
                      >
                        <Settings2 className="size-4" />
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <BillingPagination
          page={query.data?.page ?? page}
          limit={query.data?.limit ?? PAGE_SIZE}
          total={query.data?.total ?? 0}
          totalPages={query.data?.totalPages ?? 0}
          isFetching={query.isFetching}
          onPageChange={setPage}
        />
      </Card>

      <BillingPlanManageDialog
        planId={selectedPlanId}
        open={selectedPlanId !== null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setSelectedPlanId(null);
          }
        }}
      />
    </>
  );
}
