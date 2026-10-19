import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
	Archive,
	Building2,
	FileText,
	HardDrive,
	Layers3,
	Paperclip,
	RefreshCw,
	UserCheck,
	Users,
	UserX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAdminDashboardOverview } from "@/modules/dashboard/hooks";
import { PageHeader } from "@/shared/components/PageHeader";

const numberFormatter = new Intl.NumberFormat("en-US");

function formatNumber(value: number): string {
	return numberFormatter.format(value);
}

function formatBytes(bytes: number): string {
	if (!Number.isFinite(bytes) || bytes <= 0) {
		return "0 B";
	}

	const units = ["B", "KB", "MB", "GB", "TB"];
	const unitIndex = Math.min(
		Math.floor(Math.log(bytes) / Math.log(1024)),
		units.length - 1,
	);

	const convertedValue = bytes / 1024 ** unitIndex;

	return `${convertedValue.toLocaleString("en-US", {
		maximumFractionDigits: unitIndex === 0 ? 0 : 2,
	})} ${units[unitIndex]}`;
}

function percentOf(part: number, total: number): number {
	return total > 0 ? (part / total) * 100 : 0;
}

type Tone = "blue" | "emerald" | "rose" | "violet" | "amber" | "cyan" | "indigo" | "orange" | "slate";

const toneClassNames: Record<Tone, { icon: string; bar: string; dot: string }> = {
	blue: { icon: "bg-blue-500/10 text-blue-600 ring-blue-500/20", bar: "bg-blue-500", dot: "bg-blue-500" },
	emerald: { icon: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20", bar: "bg-emerald-500", dot: "bg-emerald-500" },
	rose: { icon: "bg-rose-500/10 text-rose-600 ring-rose-500/20", bar: "bg-rose-400", dot: "bg-rose-400" },
	violet: { icon: "bg-violet-500/10 text-violet-600 ring-violet-500/20", bar: "bg-violet-500", dot: "bg-violet-500" },
	amber: { icon: "bg-amber-500/10 text-amber-600 ring-amber-500/20", bar: "bg-amber-400", dot: "bg-amber-400" },
	cyan: { icon: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20", bar: "bg-cyan-500", dot: "bg-cyan-500" },
	indigo: { icon: "bg-indigo-500/10 text-indigo-600 ring-indigo-500/20", bar: "bg-indigo-500", dot: "bg-indigo-500" },
	orange: { icon: "bg-orange-500/10 text-orange-600 ring-orange-500/20", bar: "bg-orange-500", dot: "bg-orange-500" },
	slate: { icon: "bg-slate-500/10 text-slate-600 ring-slate-500/20", bar: "bg-slate-400", dot: "bg-slate-400" },
};

function IconBadge({ icon: Icon, tone, className }: { icon: LucideIcon; tone: Tone; className?: string }) {
	return (
		<div
			className={cn(
				"grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset",
				toneClassNames[tone].icon,
				className,
			)}
		>
			<Icon className='size-5' />
		</div>
	);
}

type KpiTileProps = {
	label: string;
	value: string;
	hint: string;
	icon: LucideIcon;
	tone: Tone;
};

function KpiTile({ label, value, hint, icon, tone }: KpiTileProps) {
	return (
		<Card className='relative gap-0 py-0 shadow-xs transition-shadow hover:shadow-md'>
			<div className={cn("absolute inset-x-0 top-0 h-0.5", toneClassNames[tone].bar)} />
			<CardContent className='flex items-start justify-between gap-4 p-5'>
				<div className='min-w-0'>
					<p className='text-[13px] font-medium text-muted-foreground'>{label}</p>
					<p className='mt-1.5 text-3xl font-semibold tracking-tight tabular-nums'>{value}</p>
					<p className='mt-1 truncate text-xs text-muted-foreground'>{hint}</p>
				</div>
				<IconBadge icon={icon} tone={tone} />
			</CardContent>
		</Card>
	);
}

type Segment = {
	label: string;
	value: number;
	tone: Tone;
	icon: LucideIcon;
};

type BreakdownPanelProps = {
	title: string;
	description: string;
	total: number;
	totalLabel: string;
	segments: Segment[];
	footer?: ReactNode;
};

function BreakdownPanel({ title, description, total, totalLabel, segments, footer }: BreakdownPanelProps) {
	return (
		<Card className='gap-0 py-0 shadow-xs'>
			<div className='flex items-start justify-between gap-4 border-b px-5 py-4'>
				<div>
					<h2 className='text-sm font-semibold'>{title}</h2>
					<p className='mt-0.5 text-xs text-muted-foreground'>{description}</p>
				</div>
				<div className='text-right'>
					<p className='text-xl font-semibold tabular-nums'>{formatNumber(total)}</p>
					<p className='text-[11px] text-muted-foreground'>{totalLabel}</p>
				</div>
			</div>

			<CardContent className='space-y-5 p-5'>
				<div
					className='flex h-2.5 w-full overflow-hidden rounded-full bg-muted'
					role='img'
					aria-label={segments
						.map((s) => `${s.label}: ${percentOf(s.value, total).toFixed(1)}%`)
						.join(", ")}
				>
					{segments.map((segment) => (
						<div
							key={segment.label}
							className={cn("h-full transition-[width] duration-500", toneClassNames[segment.tone].bar)}
							style={{ width: `${percentOf(segment.value, total)}%` }}
						/>
					))}
				</div>

				<ul className='space-y-3'>
					{segments.map(({ label, value, tone, icon: Icon }) => (
						<li key={label} className='flex items-center gap-3'>
							<span className={cn("size-2 rounded-full", toneClassNames[tone].dot)} />
							<Icon className='size-4 text-muted-foreground' />
							<span className='text-sm'>{label}</span>
							<span className='ml-auto text-sm font-medium tabular-nums'>{formatNumber(value)}</span>
							<span className='w-14 text-right text-xs text-muted-foreground tabular-nums'>
								{percentOf(value, total).toFixed(1)}%
							</span>
						</li>
					))}
				</ul>

				{footer ? <div className='border-t pt-4'>{footer}</div> : null}
			</CardContent>
		</Card>
	);
}

type StatRowProps = {
	icon: LucideIcon;
	tone: Tone;
	label: string;
	value: string;
	hint: string;
};

function StatRow({ icon, tone, label, value, hint }: StatRowProps) {
	return (
		<li className='flex items-center gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-muted/60'>
			<IconBadge icon={icon} tone={tone} className='size-9 rounded-lg [&_svg]:size-4' />
			<div className='min-w-0'>
				<p className='text-sm font-medium'>{label}</p>
				<p className='truncate text-xs text-muted-foreground'>{hint}</p>
			</div>
			<span className='ml-auto text-base font-semibold tabular-nums'>{value}</span>
		</li>
	);
}

function DashboardLoadingState() {
	return (
		<div className='space-y-6' aria-label='Loading dashboard metrics'>
			<section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index} className='py-0 shadow-xs'>
						<CardContent className='animate-pulse p-5'>
							<div className='flex items-start justify-between'>
								<div className='space-y-2.5'>
									<div className='h-3.5 w-24 rounded bg-muted' />
									<div className='h-8 w-20 rounded bg-muted' />
									<div className='h-3 w-32 rounded bg-muted' />
								</div>
								<div className='size-10 rounded-xl bg-muted' />
							</div>
						</CardContent>
					</Card>
				))}
			</section>
			<section className='grid gap-4 lg:grid-cols-3'>
				{Array.from({ length: 3 }).map((_, index) => (
					<Card key={index} className='py-0 shadow-xs'>
						<CardContent className='animate-pulse space-y-4 p-5'>
							<div className='h-4 w-32 rounded bg-muted' />
							<div className='h-2.5 w-full rounded-full bg-muted' />
							<div className='h-3 w-full rounded bg-muted' />
							<div className='h-3 w-3/4 rounded bg-muted' />
						</CardContent>
					</Card>
				))}
			</section>
		</div>
	);
}

export function DashboardPage() {
	const {
		data,
		error,
		isError,
		isFetching,
		isPending,
		dataUpdatedAt,
		refetch,
	} = useAdminDashboardOverview();

	const currentDate = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	}).format(new Date());

	if (isPending) {
		return (
			<div className='space-y-6'>
				<PageHeader
					eyebrow={currentDate}
					title='Admin dashboard'
					description='Loading the latest Taskmanly platform statistics.'
				/>

				<DashboardLoadingState />
			</div>
		);
	}

	if (isError || !data) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "Unable to load dashboard data.";

		return (
			<div className='space-y-6'>
				<PageHeader
					eyebrow={currentDate}
					title='Admin dashboard'
					description='Overview of the Taskmanly platform.'
				/>

				<Card className='items-center border-destructive/30 px-6 py-10 text-center shadow-xs'>
					<div className='grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive'>
						<RefreshCw className='size-5' />
					</div>
					<div>
						<p className='text-base font-semibold'>Unable to load dashboard</p>
						<p className='mt-1 text-sm text-muted-foreground'>{errorMessage}</p>
					</div>
					<Button variant='outline' onClick={() => void refetch()}>
						<RefreshCw className='size-4' />
						Try again
					</Button>
				</Card>
			</div>
		);
	}

	const activeUserRate = percentOf(data.activeUsers, data.totalUsers);
	const activeWorkspaces = Math.max(data.totalWorkspaces - data.archivedWorkspaces, 0);
	const averageAttachmentSize =
		data.totalAttachments > 0 ? data.storageBytes / data.totalAttachments : 0;
	const pagesPerWorkspace =
		data.totalWorkspaces > 0 ? data.totalPages / data.totalWorkspaces : 0;

	const lastUpdated = dataUpdatedAt
		? new Date(dataUpdatedAt).toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			})
		: "Unknown";

	return (
		<div className='space-y-6'>
			<PageHeader
				eyebrow={currentDate}
				title='Admin dashboard'
				description='Overview of users, workspaces, content, and storage across the Taskmanly platform.'
				actions={
					<>
						<span className='hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex'>
							<span className='relative flex size-2'>
								<span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60' />
								<span className='relative inline-flex size-2 rounded-full bg-emerald-500' />
							</span>
							Updated {lastUpdated}
						</span>
						<Button
							variant='outline'
							disabled={isFetching}
							onClick={() => void refetch()}
						>
							<RefreshCw className={cn("size-4", isFetching && "animate-spin")} />
							{isFetching ? "Refreshing..." : "Refresh"}
						</Button>
					</>
				}
			/>

			<section
				className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'
				aria-label='Key metrics'
			>
				<KpiTile
					label='Total users'
					value={formatNumber(data.totalUsers)}
					hint={`${activeUserRate.toFixed(0)}% active accounts`}
					icon={Users}
					tone='blue'
				/>
				<KpiTile
					label='Workspaces'
					value={formatNumber(data.totalWorkspaces)}
					hint={`${formatNumber(data.totalTeamspaces)} teamspaces inside`}
					icon={Building2}
					tone='violet'
				/>
				<KpiTile
					label='Pages'
					value={formatNumber(data.totalPages)}
					hint={`~${pagesPerWorkspace.toFixed(1)} per workspace`}
					icon={FileText}
					tone='indigo'
				/>
				<KpiTile
					label='Storage used'
					value={formatBytes(data.storageBytes)}
					hint={`${formatNumber(data.totalAttachments)} files uploaded`}
					icon={HardDrive}
					tone='orange'
				/>
			</section>

			<section className='grid gap-4 lg:grid-cols-3'>
				<BreakdownPanel
					title='User accounts'
					description='Access status of registered accounts.'
					total={data.totalUsers}
					totalLabel='accounts'
					segments={[
						{ label: "Active", value: data.activeUsers, tone: "emerald", icon: UserCheck },
						{ label: "Inactive", value: data.inactiveUsers, tone: "rose", icon: UserX },
					]}
				/>

				<BreakdownPanel
					title='Workspaces'
					description='Active versus archived workspaces.'
					total={data.totalWorkspaces}
					totalLabel='workspaces'
					segments={[
						{ label: "Active", value: activeWorkspaces, tone: "violet", icon: Building2 },
						{ label: "Archived", value: data.archivedWorkspaces, tone: "amber", icon: Archive },
					]}
					footer={
						<div className='flex items-center gap-3'>
							<Layers3 className='size-4 text-cyan-600' />
							<span className='text-sm'>Teamspaces</span>
							<span className='ml-auto text-sm font-medium tabular-nums'>
								{formatNumber(data.totalTeamspaces)}
							</span>
						</div>
					}
				/>

				<Card className='gap-0 py-0 shadow-xs'>
					<div className='border-b px-5 py-4'>
						<h2 className='text-sm font-semibold'>Content &amp; storage</h2>
						<p className='mt-0.5 text-xs text-muted-foreground'>
							What users have created and uploaded.
						</p>
					</div>
					<CardContent className='p-5'>
						<ul className='space-y-1'>
							<StatRow
								icon={FileText}
								tone='indigo'
								label='Pages'
								hint='Created across the platform'
								value={formatNumber(data.totalPages)}
							/>
							<StatRow
								icon={Paperclip}
								tone='orange'
								label='Attachments'
								hint='Files uploaded'
								value={formatNumber(data.totalAttachments)}
							/>
							<StatRow
								icon={HardDrive}
								tone='slate'
								label='Storage'
								hint={`Avg. ${formatBytes(averageAttachmentSize)} per file`}
								value={formatBytes(data.storageBytes)}
							/>
						</ul>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
