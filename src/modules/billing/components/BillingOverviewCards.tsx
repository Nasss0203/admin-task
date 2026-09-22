import {
	CircleDollarSign,
	Clock3,
	CreditCard,
	TriangleAlert,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { AdminBillingOverview } from "../types";
import { formatCurrency, formatNumber } from "../utils/billing-formatters";

interface BillingOverviewCardsProps {
	data?: AdminBillingOverview;
	isLoading: boolean;
}

export function BillingOverviewCards({
	data,
	isLoading,
}: BillingOverviewCardsProps) {
	const metrics = [
		{
			label: "Paid revenue this month",
			value: data
				? formatCurrency(data.paidRevenueThisMonth, data.currency)
				: "—",
			detail: "Revenue from paid payment orders",
			icon: CircleDollarSign,
			iconClassName: "bg-emerald-50 text-emerald-600",
		},
		{
			label: "Active subscriptions",
			value: data ? formatNumber(data.activeSubscriptions) : "—",
			detail: "Currently active workspace plans",
			icon: CreditCard,
			iconClassName: "bg-blue-50 text-blue-600",
		},
		{
			label: "Pending payments",
			value: data ? formatNumber(data.pendingPayments) : "—",
			detail: "Pending orders that have not expired",
			icon: Clock3,
			iconClassName: "bg-violet-50 text-violet-600",
		},
		{
			label: "Failed or expired",
			value: data ? formatNumber(data.failedOrExpiredPayments) : "—",
			detail: data
				? `${formatNumber(data.failedWebhookEvents)} failed webhook events`
				: "Payment and webhook health",
			icon: TriangleAlert,
			iconClassName: "bg-rose-50 text-rose-600",
		},
	];

	return (
		<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
			{metrics.map(
				({ label, value, detail, icon: Icon, iconClassName }) => (
					<Card key={label} className='py-0 shadow-none'>
						<CardContent className='flex items-start justify-between gap-4 p-5'>
							<div className='min-w-0'>
								<p className='text-xs text-muted-foreground'>
									{label}
								</p>

								<p
									className={cn(
										"mt-1 text-xl font-semibold tracking-tight",
										isLoading &&
											"animate-pulse text-muted-foreground",
									)}
								>
									{isLoading ? "—" : value}
								</p>

								<p className='mt-2 truncate text-[11px] text-muted-foreground'>
									{detail}
								</p>
							</div>

							<div
								className={cn(
									"grid size-10 shrink-0 place-items-center rounded-xl",
									iconClassName,
								)}
							>
								<Icon className='size-4.5' />
							</div>
						</CardContent>
					</Card>
				),
			)}
		</div>
	);
}
