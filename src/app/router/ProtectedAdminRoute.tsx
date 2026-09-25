import { LoaderCircle, ShieldAlert } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAdminAccess } from "@/modules/auth/hooks";
import { getAuthRouteDecision } from "@/modules/auth/services/auth-route";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { ApiError } from "@/shared/api";

export function ProtectedAdminRoute() {
	const location = useLocation();
	const { accessToken, isBootstrapped } = useAuthStore();
	const authRouteDecision = getAuthRouteDecision({
		accessToken,
		isBootstrapped,
	});

	const {
		data: adminAccess,
		error,
		isError,
		isPending,
		refetch,
	} = useAdminAccess();

	if (authRouteDecision === "loading") {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='flex items-center gap-2 text-sm text-muted-foreground'>
					<LoaderCircle className='size-4 animate-spin' />
					Verifying administrator access...
				</div>
			</div>
		);
	}

	if (authRouteDecision === "login") {
		return (
			<Navigate to='/login' replace state={{ from: location.pathname }} />
		);
	}

	if (isPending) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='flex items-center gap-2 text-sm text-muted-foreground'>
					<LoaderCircle className='size-4 animate-spin' />
					Verifying administrator access...
				</div>
			</div>
		);
	}

	if (isError && error instanceof ApiError && error.isUnauthorized) {
		return (
			<Navigate to='/login' replace state={{ from: location.pathname }} />
		);
	}

	if (isError) {
		const isForbidden = error instanceof ApiError && error.isForbidden;

		return (
			<div className='flex min-h-screen items-center justify-center p-6'>
				<div className='w-full max-w-md rounded-xl border bg-card p-6 text-center shadow-sm'>
					<ShieldAlert className='mx-auto size-10 text-destructive' />

					<h1 className='mt-4 text-xl font-semibold'>
						{isForbidden
							? "Access denied"
							: "Unable to verify access"}
					</h1>

					<p className='mt-2 text-sm text-muted-foreground'>
						{isForbidden
							? "Your account does not have permission to access the administrator area."
							: "The server could not verify your administrator access. Please try again."}
					</p>

					{!isForbidden && (
						<Button
							type='button'
							className='mt-5'
							onClick={() => void refetch()}
						>
							Try again
						</Button>
					)}
				</div>
			</div>
		);
	}

	if (!adminAccess) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
}
