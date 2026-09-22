import {
	Archive,
	Building2,
	Clock3,
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

function DashboardLoadingState() {
	return (
		<section
			className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
			aria-label='Loading dashboard metrics'
		>
			{Array.from({ length: 9 }).map((_, index) => (
				<Card key={index} className='shadow-none'>
					<CardContent className='p-5'>
						<div className='animate-pulse'>
							<div className='mb-5 flex items-center justify-between'>
								<div className='h-4 w-28 rounded bg-muted' />
								<div className='size-10 rounded-lg bg-muted' />
							</div>

							<div className='h-8 w-24 rounded bg-muted' />
							<div className='mt-3 h-3 w-full rounded bg-muted' />
						</div>
					</CardContent>
				</Card>
			))}
		</section>
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

				<Card className='border-destructive/30 shadow-none'>
					<CardHeader>
						<CardTitle className='text-base text-destructive'>
							Unable to load dashboard
						</CardTitle>

						<CardDescription>{errorMessage}</CardDescription>
					</CardHeader>

					<CardContent>
						<Button
							variant='outline'
							onClick={() => void refetch()}
						>
							<RefreshCw className='size-4' />
							Try again
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	const activeUserRate =
		data.totalUsers > 0 ? (data.activeUsers / data.totalUsers) * 100 : 0;

	const archivedWorkspaceRate =
		data.totalWorkspaces > 0
			? (data.archivedWorkspaces / data.totalWorkspaces) * 100
			: 0;

	const metrics = [
		{
			label: "Total users",
			value: formatNumber(data.totalUsers),
			description: "All registered user accounts.",
			icon: Users,
			iconClassName: "bg-blue-50 text-blue-600",
		},
		{
			label: "Active users",
			value: formatNumber(data.activeUsers),
			description: "Accounts currently allowed to access the platform.",
			icon: UserCheck,
			iconClassName: "bg-emerald-50 text-emerald-600",
		},
		{
			label: "Inactive users",
			value: formatNumber(data.inactiveUsers),
			description: "Accounts currently disabled.",
			icon: UserX,
			iconClassName: "bg-rose-50 text-rose-600",
		},
		{
			label: "Total workspaces",
			value: formatNumber(data.totalWorkspaces),
			description: "All active workspaces.",
			icon: Building2,
			iconClassName: "bg-violet-50 text-violet-600",
		},
		{
			label: "Archived workspaces",
			value: formatNumber(data.archivedWorkspaces),
			description: "Workspaces currently archived.",
			icon: Archive,
			iconClassName: "bg-amber-50 text-amber-600",
		},
		{
			label: "Total teamspaces",
			value: formatNumber(data.totalTeamspaces),
			description: "Teamspaces across all workspaces.",
			icon: Layers3,
			iconClassName: "bg-cyan-50 text-cyan-600",
		},
		{
			label: "Total pages",
			value: formatNumber(data.totalPages),
			description: "Pages created across the platform.",
			icon: FileText,
			iconClassName: "bg-indigo-50 text-indigo-600",
		},
		{
			label: "Total attachments",
			value: formatNumber(data.totalAttachments),
			description: "Files uploaded to the platform.",
			icon: Paperclip,
			iconClassName: "bg-orange-50 text-orange-600",
		},
		{
			label: "Storage used",
			value: formatBytes(data.storageBytes),
			description: "Storage consumed by uploaded attachments.",
			icon: HardDrive,
			iconClassName: "bg-slate-100 text-slate-600",
		},
	];

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
					<Button
						variant='outline'
						disabled={isFetching}
						onClick={() => void refetch()}
					>
						<RefreshCw
							className={`size-4 ${
								isFetching ? "animate-spin" : ""
							}`}
						/>

						{isFetching ? "Refreshing..." : "Refresh data"}
					</Button>
				}
			/>

			<Card className='py-0 shadow-none'>
				<CardContent className='flex flex-wrap items-center gap-3 p-3'>
					<div className='flex items-center gap-2 px-1 text-xs font-medium text-muted-foreground'>
						<Clock3 className='size-4' />
						Platform overview
					</div>

					<span className='ml-auto text-[11px] text-muted-foreground'>
						Data refreshed at {lastUpdated}
					</span>
				</CardContent>
			</Card>

			<section
				className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
				aria-label='Platform metrics'
			>
				{metrics.map(
					({
						label,
						value,
						description,
						icon: Icon,
						iconClassName,
					}) => (
						<Card key={label} className='shadow-none'>
							<CardContent className='p-5'>
								<div className='flex items-start justify-between gap-4'>
									<div>
										<p className='text-sm font-medium text-muted-foreground'>
											{label}
										</p>

										<p className='mt-2 text-3xl font-semibold tracking-tight'>
											{value}
										</p>
									</div>

									<div
										className={`grid size-10 shrink-0 place-items-center rounded-lg ${iconClassName}`}
									>
										<Icon className='size-5' />
									</div>
								</div>

								<p className='mt-3 text-xs leading-5 text-muted-foreground'>
									{description}
								</p>
							</CardContent>
						</Card>
					),
				)}
			</section>

			<section className='grid gap-4 md:grid-cols-2'>
				<Card className='shadow-none'>
					<CardHeader>
						<CardTitle className='text-base'>
							User account status
						</CardTitle>

						<CardDescription>
							Percentage of registered accounts that are active.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className='mb-3 flex items-end justify-between'>
							<span className='text-2xl font-semibold'>
								{activeUserRate.toFixed(1)}%
							</span>

							<span className='text-xs text-muted-foreground'>
								{formatNumber(data.activeUsers)} of{" "}
								{formatNumber(data.totalUsers)}
							</span>
						</div>

						<Progress value={activeUserRate} />
					</CardContent>
				</Card>

				<Card className='shadow-none'>
					<CardHeader>
						<CardTitle className='text-base'>
							Workspace archive rate
						</CardTitle>

						<CardDescription>
							Percentage of workspaces currently archived.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className='mb-3 flex items-end justify-between'>
							<span className='text-2xl font-semibold'>
								{archivedWorkspaceRate.toFixed(1)}%
							</span>

							<span className='text-xs text-muted-foreground'>
								{formatNumber(data.archivedWorkspaces)} archived
							</span>
						</div>

						<Progress value={archivedWorkspaceRate} />
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
