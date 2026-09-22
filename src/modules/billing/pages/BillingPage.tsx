import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, Webhook } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/shared/components/PageHeader";

import { BillingOverviewCards } from "../components/BillingOverviewCards";
import { BillingPaymentOrdersTable } from "../components/BillingPaymentOrdersTable";
import { BillingPlansTable } from "../components/BillingPlansTable";
import { BillingSubscriptionsTable } from "../components/BillingSubscriptionsTable";
import { BillingWebhookEventsTable } from "../components/BillingWebhookEventsTable";
import { billingQueryKeys, useAdminBillingOverview } from "../hooks";

type BillingTab =
	| "subscriptions"
	| "plans"
	| "payment-orders"
	| "webhook-events";

export function BillingPage() {
	const [activeTab, setActiveTab] = useState<BillingTab>("subscriptions");

	const queryClient = useQueryClient();
	const overviewQuery = useAdminBillingOverview();

	const billingRequestCount = useIsFetching({
		queryKey: billingQueryKeys.all,
	});

	const isRefreshing = billingRequestCount > 0;

	function handleRefresh() {
		void queryClient.invalidateQueries({
			queryKey: billingQueryKeys.all,
		});
	}

	return (
		<div className='space-y-6'>
			<PageHeader
				eyebrow='SaaS operations'
				title='Plans & billing'
				description='Monitor billing revenue, workspace subscriptions, payment orders, plan prices and provider webhook events.'
				actions={
					<Button
						variant='outline'
						disabled={isRefreshing}
						onClick={handleRefresh}
					>
						<RefreshCw
							className={cn(
								"size-4",
								isRefreshing && "animate-spin",
							)}
						/>

						{isRefreshing ? "Refreshing..." : "Refresh data"}
					</Button>
				}
			/>

			{overviewQuery.isError ? (
				<Card className='border-rose-200 bg-rose-50/50 shadow-none'>
					<CardContent className='flex flex-col gap-3 p-4 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between'>
						<span>
							{overviewQuery.error instanceof Error
								? overviewQuery.error.message
								: "Unable to load billing overview"}
						</span>

						<Button
							variant='outline'
							size='sm'
							onClick={() => void overviewQuery.refetch()}
						>
							Try again
						</Button>
					</CardContent>
				</Card>
			) : null}

			<BillingOverviewCards
				data={overviewQuery.data}
				isLoading={overviewQuery.isPending}
			/>

			<Tabs
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as BillingTab)}
			>
				<TabsList className='max-w-full justify-start overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
					<TabsTrigger value='subscriptions'>
						Subscriptions
					</TabsTrigger>

					<TabsTrigger value='plans'>Plans & prices</TabsTrigger>

					<TabsTrigger value='payment-orders'>
						Payment orders
					</TabsTrigger>

					<TabsTrigger value='webhook-events'>
						<Webhook className='size-3.5' />
						Webhook events
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{activeTab === "subscriptions" ? (
				<BillingSubscriptionsTable />
			) : null}

			{activeTab === "plans" ? <BillingPlansTable /> : null}

			{activeTab === "payment-orders" ? (
				<BillingPaymentOrdersTable />
			) : null}

			{activeTab === "webhook-events" ? (
				<BillingWebhookEventsTable />
			) : null}
		</div>
	);
}
