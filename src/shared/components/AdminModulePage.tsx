import type { LucideIcon } from "lucide-react";
import { Filter, MoreHorizontal, RefreshCw, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/shared/components/PageHeader";

type Tone = "neutral" | "info" | "success" | "warning" | "danger" | "violet";

export type ModuleMetric = {
	label: string;
	value: string;
	detail: string;
	icon: LucideIcon;
	tone?: Tone;
};

export type ModuleTableCell =
	| string
	| {
			primary?: string;
			secondary?: string;
			badge?: string;
			tone?: Tone;
			mono?: boolean;
			progress?: number;
	  };

export type ModuleTableRow = {
	id: string;
	cells: Record<string, ModuleTableCell>;
};

export type ModulePageConfig = {
	eyebrow: string;
	title: string;
	description: string;
	primaryAction: string;
	secondaryAction?: string;

	metrics: ModuleMetric[];

	tabs: {
		value: string;
		label: string;
		count?: string;
	}[];

	table: {
		title: string;
		description: string;
		searchPlaceholder: string;
		filterLabel: string;
		filterOptions: string[];
		columns: {
			key: string;
			label: string;
			className?: string;
		}[];
		rows: ModuleTableRow[];
		totalLabel: string;
		rowActions: string[];
	};

	insight: {
		title: string;
		description: string;
		items: {
			label: string;
			value: string;
			detail?: string;
			progress?: number;
			status?: string;
			tone?: Tone;
		}[];
		note: {
			title: string;
			description: string;
			tone?: Tone;
		};
	};
};

const toneStyles: Record<
	Tone,
	{
		icon: string;
		badge: string;
		note: string;
		progress: string;
	}
> = {
	neutral: {
		icon: "bg-slate-100 text-slate-600",
		badge: "border-slate-200 bg-slate-50 text-slate-700",
		note: "border-slate-200 bg-slate-50/70",
		progress: "[&>div]:bg-slate-500",
	},
	info: {
		icon: "bg-blue-50 text-blue-600",
		badge: "border-blue-200 bg-blue-50 text-blue-700",
		note: "border-blue-200 bg-blue-50/70",
		progress: "[&>div]:bg-blue-500",
	},
	success: {
		icon: "bg-emerald-50 text-emerald-600",
		badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
		note: "border-emerald-200 bg-emerald-50/70",
		progress: "[&>div]:bg-emerald-500",
	},
	warning: {
		icon: "bg-amber-50 text-amber-600",
		badge: "border-amber-200 bg-amber-50 text-amber-700",
		note: "border-amber-200 bg-amber-50/70",
		progress: "[&>div]:bg-amber-500",
	},
	danger: {
		icon: "bg-rose-50 text-rose-600",
		badge: "border-rose-200 bg-rose-50 text-rose-700",
		note: "border-rose-200 bg-rose-50/70",
		progress: "[&>div]:bg-rose-500",
	},
	violet: {
		icon: "bg-violet-50 text-violet-600",
		badge: "border-violet-200 bg-violet-50 text-violet-700",
		note: "border-violet-200 bg-violet-50/70",
		progress: "[&>div]:bg-violet-500",
	},
};

function TableValue({ value }: { value: ModuleTableCell }) {
	if (typeof value === "string") {
		return <span className='text-sm'>{value}</span>;
	}

	const tone = value.tone ?? "neutral";

	return (
		<div className='min-w-0'>
			<div className='flex items-center gap-2'>
				{value.primary ? (
					<span
						className={cn(
							"text-sm font-medium",
							value.mono && "font-mono text-xs",
						)}
					>
						{value.primary}
					</span>
				) : null}

				{value.badge ? (
					<Badge
						variant='outline'
						className={cn(
							"rounded-md font-medium",
							toneStyles[tone].badge,
						)}
					>
						{value.badge}
					</Badge>
				) : null}
			</div>

			{value.secondary ? (
				<p
					className={cn(
						"mt-0.5 text-xs text-muted-foreground",
						value.mono && "font-mono text-[11px]",
					)}
				>
					{value.secondary}
				</p>
			) : null}

			{typeof value.progress === "number" ? (
				<Progress
					value={value.progress}
					className={cn("mt-2 h-1.5 w-28", toneStyles[tone].progress)}
				/>
			) : null}
		</div>
	);
}

export function AdminModulePage({ config }: { config: ModulePageConfig }) {
	return (
		<div className='space-y-6'>
			<PageHeader
				eyebrow={config.eyebrow}
				title={config.title}
				description={config.description}
				actions={
					<>
						{config.secondaryAction ? (
							<Button variant='outline'>
								<RefreshCw className='size-4' />
								{config.secondaryAction}
							</Button>
						) : null}

						<Button>{config.primaryAction}</Button>
					</>
				}
			/>

			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{config.metrics.map(
					({ label, value, detail, icon: Icon, tone = "info" }) => (
						<Card key={label} className='py-0 shadow-none'>
							<CardContent className='flex items-start justify-between gap-4 p-5'>
								<div className='min-w-0'>
									<p className='text-xs text-muted-foreground'>
										{label}
									</p>

									<p className='mt-1 text-xl font-semibold tracking-tight'>
										{value}
									</p>

									<p className='mt-2 truncate text-[11px] text-muted-foreground'>
										{detail}
									</p>
								</div>

								<div
									className={cn(
										"grid size-10 shrink-0 place-items-center rounded-xl",
										toneStyles[tone].icon,
									)}
								>
									<Icon className='size-4.5' />
								</div>
							</CardContent>
						</Card>
					),
				)}
			</div>

			<Tabs defaultValue={config.tabs[0].value}>
				<TabsList className='max-w-full justify-start overflow-x-auto'>
					{config.tabs.map((tab) => (
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.label}

							{tab.count ? (
								<span className='text-[10px] text-muted-foreground'>
									{tab.count}
								</span>
							) : null}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<div className='grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]'>
				<Card className='gap-0 py-0 shadow-none'>
					<CardHeader className='border-b py-4'>
						<CardTitle>{config.table.title}</CardTitle>

						<CardDescription>
							{config.table.description}
						</CardDescription>
					</CardHeader>

					<div className='flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center'>
						<div className='relative min-w-56 flex-1'>
							<Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />

							<Input
								className='pl-9'
								placeholder={config.table.searchPlaceholder}
							/>
						</div>

						<div className='flex gap-2'>
							<Select defaultValue='all'>
								<SelectTrigger className='w-37.5'>
									<SelectValue
										placeholder={config.table.filterLabel}
									/>
								</SelectTrigger>

								<SelectContent>
									<SelectItem value='all'>
										{config.table.filterLabel}
									</SelectItem>

									{config.table.filterOptions.map(
										(option) => (
											<SelectItem
												key={option}
												value={option
													.toLowerCase()
													.replaceAll(" ", "-")}
											>
												{option}
											</SelectItem>
										),
									)}
								</SelectContent>
							</Select>

							<Button
								variant='outline'
								size='icon'
								aria-label='More filters'
							>
								<Filter className='size-4' />
							</Button>
						</div>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								{config.table.columns.map((column, index) => (
									<TableHead
										key={column.key}
										className={cn(
											index === 0 && "pl-6",
											column.className,
										)}
									>
										{column.label}
									</TableHead>
								))}

								<TableHead className='w-12' />
							</TableRow>
						</TableHeader>

						<TableBody>
							{config.table.rows.map((row) => (
								<TableRow key={row.id}>
									{config.table.columns.map(
										(column, index) => (
											<TableCell
												key={column.key}
												className={cn(
													index === 0 && "pl-6",
													column.className,
												)}
											>
												<TableValue
													value={
														row.cells[column.key]
													}
												/>
											</TableCell>
										),
									)}

									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='ghost'
													size='icon-sm'
													aria-label={`Actions for ${row.id}`}
												>
													<MoreHorizontal className='size-4' />
												</Button>
											</DropdownMenuTrigger>

											<DropdownMenuContent align='end'>
												{config.table.rowActions.map(
													(action) => (
														<DropdownMenuItem
															key={action}
														>
															{action}
														</DropdownMenuItem>
													),
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<div className='flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground'>
						<span>{config.table.totalLabel}</span>

						<div className='flex gap-2'>
							<Button variant='outline' size='sm' disabled>
								Previous
							</Button>

							<Button variant='outline' size='sm'>
								Next
							</Button>
						</div>
					</div>
				</Card>

				<Card className='h-fit shadow-none'>
					<CardHeader>
						<CardTitle>{config.insight.title}</CardTitle>

						<CardDescription>
							{config.insight.description}
						</CardDescription>
					</CardHeader>

					<CardContent className='space-y-5'>
						{config.insight.items.map((item) => {
							const tone = item.tone ?? "info";

							return (
								<div key={item.label}>
									<div className='flex items-start justify-between gap-3'>
										<div>
											<p className='text-sm font-medium'>
												{item.label}
											</p>

											{item.detail ? (
												<p className='mt-0.5 text-xs text-muted-foreground'>
													{item.detail}
												</p>
											) : null}
										</div>

										{item.status ? (
											<Badge
												variant='outline'
												className={cn(
													"rounded-md",
													toneStyles[tone].badge,
												)}
											>
												{item.status}
											</Badge>
										) : (
											<span className='text-sm font-semibold'>
												{item.value}
											</span>
										)}
									</div>

									{typeof item.progress === "number" ? (
										<div className='mt-2'>
											<div className='mb-1 text-right text-[10px] text-muted-foreground'>
												{item.value}
											</div>

											<Progress
												value={item.progress}
												className={
													toneStyles[tone].progress
												}
											/>
										</div>
									) : null}
								</div>
							);
						})}

						<div
							className={cn(
								"rounded-lg border p-4",
								toneStyles[config.insight.note.tone ?? "info"]
									.note,
							)}
						>
							<p className='text-sm font-medium'>
								{config.insight.note.title}
							</p>

							<p className='mt-1 text-xs leading-5 text-muted-foreground'>
								{config.insight.note.description}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
