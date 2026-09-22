import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

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

import { useAdminBillingSubscriptions } from "../hooks";
import type { BillingProvider, SubscriptionStatus } from "../types";
import {
	formatCurrency,
	formatDateRange,
	formatDateTime,
} from "../utils/billing-formatters";
import { BillingPagination } from "./BillingPagination";
import { BillingStatusBadge } from "./BillingStatusBadge";

const PAGE_SIZE = 10;

export function BillingSubscriptionsTable() {
	const [page, setPage] = useState(1);
	const [draftSearch, setDraftSearch] = useState("");
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState<SubscriptionStatus | "ALL">("ALL");
	const [provider, setProvider] = useState<BillingProvider | "ALL">("ALL");

	const query = useAdminBillingSubscriptions({
		page,
		limit: PAGE_SIZE,
		search: search || undefined,
		status: status === "ALL" ? undefined : status,
		provider: provider === "ALL" ? undefined : provider,
	});

	function handleSearch(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setPage(1);
		setSearch(draftSearch.trim());
	}

	const items = query.data?.items ?? [];

	return (
		<Card className='gap-0 overflow-hidden py-0 shadow-none'>
			<CardHeader className='border-b py-4'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						<CardTitle>Subscription overview</CardTitle>

						<CardDescription>
							Workspace plans, billing periods and latest payment
							state.
						</CardDescription>
					</div>

					{query.isFetching ? (
						<span className='text-xs text-muted-foreground'>
							Updating…
						</span>
					) : null}
				</div>
			</CardHeader>

			<div className='flex flex-col gap-3 border-b p-4 xl:flex-row'>
				<form
					onSubmit={handleSearch}
					className='flex min-w-64 flex-1 gap-2'
				>
					<div className='relative flex-1'>
						<Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />

						<Input
							value={draftSearch}
							onChange={(event) =>
								setDraftSearch(event.target.value)
							}
							className='pl-9'
							placeholder='Search workspace, plan or order code...'
						/>
					</div>

					<Button type='submit' variant='outline'>
						Search
					</Button>
				</form>

				<div className='flex flex-wrap gap-2'>
					<Select
						value={status}
						onValueChange={(value) => {
							setStatus(value as SubscriptionStatus | "ALL");
							setPage(1);
						}}
					>
						<SelectTrigger className='w-44'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='ALL'>All statuses</SelectItem>
							<SelectItem value='ACTIVE'>Active</SelectItem>
							<SelectItem value='PENDING'>Pending</SelectItem>
							<SelectItem value='PAST_DUE'>Past due</SelectItem>
							<SelectItem value='CANCELED'>Canceled</SelectItem>
							<SelectItem value='EXPIRED'>Expired</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={provider}
						onValueChange={(value) => {
							setProvider(value as BillingProvider | "ALL");
							setPage(1);
						}}
					>
						<SelectTrigger className='w-40'>
							<SelectValue placeholder='Provider' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='ALL'>All providers</SelectItem>
							<SelectItem value='STRIPE'>Stripe</SelectItem>
							<SelectItem value='SEPAY'>SePay</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='min-w-56 pl-6'>
								Workspace
							</TableHead>
							<TableHead className='min-w-48'>Plan</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Provider</TableHead>
							<TableHead className='min-w-64'>
								Current period
							</TableHead>
							<TableHead className='min-w-52'>
								Latest payment
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{query.isPending ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className='h-32 text-center text-muted-foreground'
								>
									Loading subscriptions…
								</TableCell>
							</TableRow>
						) : query.isError ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className='h-32 text-center text-rose-600'
								>
									{query.error instanceof Error
										? query.error.message
										: "Unable to load subscriptions"}
								</TableCell>
							</TableRow>
						) : items.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className='h-32 text-center text-muted-foreground'
								>
									No subscriptions found.
								</TableCell>
							</TableRow>
						) : (
							items.map((subscription) => (
								<TableRow key={subscription.id}>
									<TableCell className='pl-6'>
										<p className='font-medium'>
											{subscription.workspace.name}
										</p>
										<p className='mt-0.5 font-mono text-[11px] text-muted-foreground'>
											{subscription.workspace.slug}
										</p>
									</TableCell>

									<TableCell>
										<p className='font-medium'>
											{subscription.plan.name}
										</p>

										{subscription.planPrice ? (
											<p className='mt-0.5 text-xs text-muted-foreground'>
												{formatCurrency(
													subscription.planPrice
														.amount,
													subscription.planPrice
														.currency,
												)}
												{" · "}
												{
													subscription.planPrice
														.billingInterval
												}
											</p>
										) : (
											<p className='text-xs text-muted-foreground'>
												No price
											</p>
										)}
									</TableCell>

									<TableCell>
										<BillingStatusBadge
											status={subscription.status}
										/>
									</TableCell>

									<TableCell>
										{subscription.provider ?? "—"}
									</TableCell>

									<TableCell className='text-xs'>
										{formatDateRange(
											subscription.currentPeriodStart,
											subscription.currentPeriodEnd,
										)}
									</TableCell>

									<TableCell>
										{subscription.latestPayment ? (
											<div className='space-y-1'>
												<BillingStatusBadge
													status={
														subscription
															.latestPayment
															.status
													}
												/>
												<p className='text-xs text-muted-foreground'>
													{formatDateTime(
														subscription
															.latestPayment
															.paidAt ??
															subscription
																.latestPayment
																.createdAt,
													)}
												</p>
											</div>
										) : (
											<span className='text-muted-foreground'>
												—
											</span>
										)}
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
	);
}
