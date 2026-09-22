export function formatCurrency(amount: number, currency: string): string {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: currency.toUpperCase(),
		maximumFractionDigits: currency.toUpperCase() === "VND" ? 0 : 2,
	}).format(amount);
}

export function formatNumber(value: number): string {
	return new Intl.NumberFormat("vi-VN").format(value);
}

export function formatDateTime(value: string | null | undefined): string {
	if (!value) {
		return "—";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "—";
	}

	return new Intl.DateTimeFormat("vi-VN", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

export function formatDateRange(
	start: string | null,
	end: string | null,
): string {
	if (!start && !end) {
		return "—";
	}

	return `${formatDateTime(start)} – ${formatDateTime(end)}`;
}
