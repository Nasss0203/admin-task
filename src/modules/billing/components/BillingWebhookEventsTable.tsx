import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

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
import { cn } from "@/lib/utils";

import { useAdminBillingWebhookEvents } from "../hooks/useAdminBillingWebhookEvents";
import type {
	BillingProvider,
	BillingWebhookStatus,
} from "../types/billing.types";
import { formatDateTime } from "../utils/billing-formatters";
import { BillingPagination } from "./BillingPagination";
import { BillingStatusBadge } from "./BillingStatusBadge";

const PAGE_SIZE = 20;

type EventTypeFilter =
	| "ALL"
	| "checkout.session.completed"
	| "checkout.session.expired"
	| "PAYMENT_GATEWAY_ORDER_PAID"
	| "PAYMENT_GATEWAY_PAYMENT_SUCCESS"
	| "BANK_TRANSACTION";

function getEventTypeLabel(eventType: string): string {
	switch (eventType) {
		case "checkout.session.completed":
			return "Stripe checkout completed";

		case "checkout.session.expired":
			return "Stripe checkout expired";

		case "PAYMENT_GATEWAY_ORDER_PAID":
			return "SePay order paid";

		case "PAYMENT_GATEWAY_PAYMENT_SUCCESS":
			return "SePay payment success";

		case "BANK_TRANSACTION":
			return "SePay bank transaction";

		default:
			return eventType;
	}
}

export function BillingWebhookEventsTable() {
	const [page, setPage] = useState(1);
	const [draftSearch, setDraftSearch] = useState("");
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState<BillingWebhookStatus | "ALL">("ALL");
	const [provider, setProvider] = useState<BillingProvider | "ALL">("ALL");
	const [eventType, setEventType] = useState<EventTypeFilter>("ALL");

	const query = useAdminBillingWebhookEvents({
		page,
		limit: PAGE_SIZE,
		search: search || undefined,
		status: status === "ALL" ? undefined : status,
		provider: provider === "ALL" ? undefined : provider,
		eventType: eventType === "ALL" ? undefined : eventType,
	});

	const hasFilters =
		search.length > 0 ||
		status !== "ALL" ||
		provider !== "ALL" ||
		eventType !== "ALL";

	function handleSearch(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setPage(1);
		setSearch(draftSearch.trim());
	}

	function handleResetFilters() {
		setPage(1);
		setDraftSearch("");
		setSearch("");
		setStatus("ALL");
		setProvider("ALL");
		setEventType("ALL");
	}

	const items = query.data?.items ?? [];

	return (
		<Card className='gap-0 overflow-hidden py-0 shadow-none'>
			<CardHeader className='border-b py-4'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						<CardTitle>Webhook events</CardTitle>

						<CardDescription>
							Review Stripe and SePay webhook processing, matching
							and delivery results.
						</CardDescription>
					</div>

					{query.isFetching ? (
						<span className='text-xs text-muted-foreground'>
							Updating…
						</span>
					) : null}
				</div>
			</CardHeader>

			<div className='flex flex-col gap-3 border-b p-4'>
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
							placeholder='Search event ID, order code, workspace or plan...'
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
							setStatus(value as BillingWebhookStatus | "ALL");
							setPage(1);
						}}
					>
						<SelectTrigger className='w-44'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='ALL'>All statuses</SelectItem>
							<SelectItem value='PROCESSED'>Processed</SelectItem>
							<SelectItem value='PENDING'>Pending</SelectItem>
							<SelectItem value='FAILED'>Failed</SelectItem>
							<SelectItem value='IGNORED'>Ignored</SelectItem>
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

					<Select
						value={eventType}
						onValueChange={(value) => {
							setEventType(value as EventTypeFilter);
							setPage(1);
						}}
					>
						<SelectTrigger className='w-64'>
							<SelectValue placeholder='Event type' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='ALL'>All event types</SelectItem>

							<SelectItem value='checkout.session.completed'>
								Stripe checkout completed
							</SelectItem>

							<SelectItem value='checkout.session.expired'>
								Stripe checkout expired
							</SelectItem>

							<SelectItem value='PAYMENT_GATEWAY_ORDER_PAID'>
								SePay order paid
							</SelectItem>

							<SelectItem value='PAYMENT_GATEWAY_PAYMENT_SUCCESS'>
								SePay payment success
							</SelectItem>

							<SelectItem value='BANK_TRANSACTION'>
								SePay bank transaction
							</SelectItem>
						</SelectContent>
					</Select>

					{hasFilters ? (
						<Button
							type='button'
							variant='ghost'
							onClick={handleResetFilters}
						>
							Reset filters
						</Button>
					) : null}
				</div>
			</div>

			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='min-w-80 pl-6'>
								Event
							</TableHead>
							<TableHead>Provider</TableHead>
							<TableHead>Processing</TableHead>
							<TableHead className='min-w-72'>
								Payment order
							</TableHead>
							<TableHead className='min-w-56'>
								Workspace &amp; plan
							</TableHead>
							<TableHead className='min-w-52'>
								Timestamps
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
									Loading webhook events…
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
										: "Unable to load webhook events"}
								</TableCell>
							</TableRow>
						) : items.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className='h-32 text-center text-muted-foreground'
								>
									No webhook events found.
								</TableCell>
							</TableRow>
						) : (
							items.map((webhookEvent) => (
								<TableRow key={webhookEvent.id}>
									<TableCell className='pl-6 align-top'>
										<p className='font-medium'>
											{getEventTypeLabel(
												webhookEvent.eventType,
											)}
										</p>

										<p className='mt-1 break-all font-mono text-[11px] text-muted-foreground'>
											{webhookEvent.eventType}
										</p>

										<p className='mt-1 break-all font-mono text-[11px] text-muted-foreground'>
											{webhookEvent.providerEventId}
										</p>
									</TableCell>

									<TableCell className='align-top'>
										<Badge
											variant='outline'
											className={cn(
												"rounded-md",
												webhookEvent.provider ===
													"STRIPE"
													? "border-violet-200 bg-violet-50 text-violet-700"
													: "border-blue-200 bg-blue-50 text-blue-700",
											)}
										>
											{webhookEvent.provider}
										</Badge>
									</TableCell>

									<TableCell className='align-top'>
										<BillingStatusBadge
											status={webhookEvent.status}
										/>
									</TableCell>

									<TableCell className='align-top'>
										{webhookEvent.paymentOrder ? (
											<div className='space-y-1.5'>
												<p className='break-all font-mono text-xs font-medium'>
													{
														webhookEvent
															.paymentOrder
															.orderCode
													}
												</p>

												<div>
													<BillingStatusBadge
														status={
															webhookEvent
																.paymentOrder
																.status
														}
													/>
												</div>

												<p className='break-all font-mono text-[11px] text-muted-foreground'>
													{
														webhookEvent
															.paymentOrder.id
													}
												</p>
											</div>
										) : (
											<div className='space-y-1.5'>
												<Badge
													variant='outline'
													className='border-slate-200 bg-slate-100 text-slate-600'
												>
													Unlinked
												</Badge>

												<p className='text-xs text-muted-foreground'>
													No matching payment order
												</p>
											</div>
										)}
									</TableCell>

									<TableCell className='align-top'>
										{webhookEvent.paymentOrder ? (
											<div>
												<p className='font-medium'>
													{
														webhookEvent
															.paymentOrder
															.workspace.name
													}
												</p>

												<p className='mt-0.5 text-xs text-muted-foreground'>
													{
														webhookEvent
															.paymentOrder
															.workspace.slug
													}
												</p>

												<p className='mt-2 text-xs'>
													{
														webhookEvent
															.paymentOrder.plan
															.name
													}
													{" · "}
													<span className='font-mono text-muted-foreground'>
														{
															webhookEvent
																.paymentOrder
																.plan.code
														}
													</span>
												</p>
											</div>
										) : (
											<span className='text-muted-foreground'>
												—
											</span>
										)}
									</TableCell>

									<TableCell className='align-top'>
										<div className='space-y-1 text-xs'>
											<p>
												<span className='text-muted-foreground'>
													Received:{" "}
												</span>
												{formatDateTime(
													webhookEvent.createdAt,
												)}
											</p>

											<p>
												<span className='text-muted-foreground'>
													Processed:{" "}
												</span>
												{webhookEvent.processedAt
													? formatDateTime(
															webhookEvent.processedAt,
														)
													: "—"}
											</p>
										</div>
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
