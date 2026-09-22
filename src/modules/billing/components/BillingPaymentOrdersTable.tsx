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

import { useAdminBillingPaymentOrders } from "../hooks/useAdminBillingPaymentOrders";
import type {
	BillingProvider,
	PaymentOrderStatus,
} from "../types/billing.types";
import { formatCurrency, formatDateTime } from "../utils/billing-formatters";
import { BillingPagination } from "./BillingPagination";
import { BillingStatusBadge } from "./BillingStatusBadge";

const PAGE_SIZE = 10;

export function BillingPaymentOrdersTable() {
	const [page, setPage] = useState(1);
	const [draftSearch, setDraftSearch] = useState("");
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState<PaymentOrderStatus | "ALL">("ALL");
	const [provider, setProvider] = useState<BillingProvider | "ALL">("ALL");

	const query = useAdminBillingPaymentOrders({
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
						<CardTitle>Payment orders</CardTitle>
						<CardDescription>
							Review Stripe and SePay payment attempts, amounts
							and effective processing status.
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
							placeholder='Search order code, workspace, plan or ID...'
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
							setStatus(value as PaymentOrderStatus | "ALL");
							setPage(1);
						}}
					>
						<SelectTrigger className='w-44'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='ALL'>All statuses</SelectItem>
							<SelectItem value='PENDING'>Pending</SelectItem>
							<SelectItem value='PAID'>Paid</SelectItem>
							<SelectItem value='FAILED'>Failed</SelectItem>
							<SelectItem value='EXPIRED'>Expired</SelectItem>
							<SelectItem value='CANCELED'>Canceled</SelectItem>
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
							<TableHead className='min-w-72 pl-6'>
								Order
							</TableHead>
							<TableHead className='min-w-52'>
								Workspace
							</TableHead>
							<TableHead className='min-w-44'>Plan</TableHead>
							<TableHead className='min-w-32'>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Provider</TableHead>
							<TableHead className='min-w-52'>Timeline</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{query.isPending ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className='h-32 text-center text-muted-foreground'
								>
									Loading payment orders…
								</TableCell>
							</TableRow>
						) : query.isError ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className='h-32 text-center text-rose-600'
								>
									{query.error instanceof Error
										? query.error.message
										: "Unable to load payment orders"}
								</TableCell>
							</TableRow>
						) : items.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className='h-32 text-center text-muted-foreground'
								>
									No payment orders found.
								</TableCell>
							</TableRow>
						) : (
							items.map((order) => (
								<TableRow key={order.id}>
									<TableCell className='pl-6'>
										<p className='break-all font-mono text-xs font-medium'>
											{order.orderCode}
										</p>

										<p className='mt-1 font-mono text-[11px] text-muted-foreground'>
											{order.id}
										</p>
									</TableCell>

									<TableCell>
										<p className='font-medium'>
											{order.workspace.name}
										</p>

										<p className='mt-0.5 text-xs text-muted-foreground'>
											{order.workspace.slug}
										</p>
									</TableCell>

									<TableCell>
										<p className='font-medium'>
											{order.plan.name}
										</p>

										<p className='mt-0.5 text-xs text-muted-foreground'>
											{order.planPrice.billingInterval}
										</p>
									</TableCell>

									<TableCell>
										<p className='font-medium'>
											{formatCurrency(
												order.amount,
												order.currency,
											)}
										</p>

										{order.planPrice.amount !==
										order.amount ? (
											<p className='mt-0.5 text-xs text-muted-foreground'>
												Plan price:{" "}
												{formatCurrency(
													order.planPrice.amount,
													order.planPrice.currency,
												)}
											</p>
										) : null}
									</TableCell>

									<TableCell>
										<BillingStatusBadge
											status={order.status}
										/>
									</TableCell>

									<TableCell>
										<span className='text-sm'>
											{order.provider}
										</span>
									</TableCell>

									<TableCell>
										<div className='space-y-1 text-xs'>
											<p>
												<span className='text-muted-foreground'>
													Created:{" "}
												</span>
												{formatDateTime(
													order.createdAt,
												)}
											</p>

											{order.paidAt ? (
												<p>
													<span className='text-muted-foreground'>
														Paid:{" "}
													</span>
													{formatDateTime(
														order.paidAt,
													)}
												</p>
											) : null}

											{!order.paidAt &&
											order.expiresAt ? (
												<p>
													<span className='text-muted-foreground'>
														{order.status ===
														"EXPIRED"
															? "Expired: "
															: "Expires: "}
													</span>
													{formatDateTime(
														order.expiresAt,
													)}
												</p>
											) : null}
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
