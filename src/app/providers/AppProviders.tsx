import type { PropsWithChildren } from "react";

import { AuthBootstrap } from "@/modules/auth/components/AuthBootstrap";

import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: PropsWithChildren) {
	return (
		<QueryProvider>
			<AuthBootstrap>{children}</AuthBootstrap>
		</QueryProvider>
	);
}
