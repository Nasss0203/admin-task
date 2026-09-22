import { Button } from "@/components/ui/button";

interface BillingPaginationProps {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	isFetching?: boolean;
	onPageChange: (page: number) => void;
}

export function BillingPagination({
	page,
	limit,
	total,
	totalPages,
	isFetching = false,
	onPageChange,
}: BillingPaginationProps) {
	const firstItem = total === 0 ? 0 : (page - 1) * limit + 1;

	const lastItem = Math.min(page * limit, total);

	return (
		<div className='flex flex-col gap-3 border-t px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
			<span>
				Showing {firstItem}–{lastItem} of {total} records
			</span>

			<div className='flex items-center gap-2'>
				<span>
					Page {totalPages === 0 ? 0 : page} of {totalPages}
				</span>

				<Button
					variant='outline'
					size='sm'
					disabled={page <= 1 || isFetching}
					onClick={() => onPageChange(page - 1)}
				>
					Previous
				</Button>

				<Button
					variant='outline'
					size='sm'
					disabled={
						totalPages === 0 || page >= totalPages || isFetching
					}
					onClick={() => onPageChange(page + 1)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
