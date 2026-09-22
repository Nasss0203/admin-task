import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type {
	BillingWebhookStatus,
	PaymentOrderStatus,
	PaymentTransactionStatus,
	SubscriptionStatus,
} from "../types";

type BillingStatus =
	| BillingWebhookStatus
	| PaymentOrderStatus
	| PaymentTransactionStatus
	| SubscriptionStatus;

const statusStyles: Record<BillingStatus, string> = {
	ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700",
	PAID: "border-emerald-200 bg-emerald-50 text-emerald-700",
	SUCCESS: "border-emerald-200 bg-emerald-50 text-emerald-700",
	PROCESSED: "border-emerald-200 bg-emerald-50 text-emerald-700",

	PENDING: "border-blue-200 bg-blue-50 text-blue-700",

	PAST_DUE: "border-amber-200 bg-amber-50 text-amber-700",
	EXPIRED: "border-amber-200 bg-amber-50 text-amber-700",

	FAILED: "border-rose-200 bg-rose-50 text-rose-700",

	CANCELED: "border-slate-200 bg-slate-100 text-slate-600",
	IGNORED: "border-slate-200 bg-slate-100 text-slate-600",
};

export function BillingStatusBadge({ status }: { status: BillingStatus }) {
	return (
		<Badge
			variant='outline'
			className={cn(
				"gap-1.5 rounded-md px-2 py-0.5 font-medium",
				statusStyles[status],
			)}
		>
			<span className='size-1.5 rounded-full bg-current opacity-75' />

			{status.replaceAll("_", " ")}
		</Badge>
	);
}
