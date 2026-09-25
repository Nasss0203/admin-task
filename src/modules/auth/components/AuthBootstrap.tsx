import { useEffect, type PropsWithChildren } from "react";

import { authLifecycle } from "../services/auth-lifecycle";

export function AuthBootstrap({ children }: PropsWithChildren) {
	useEffect(() => {
		void authLifecycle.bootstrap();
	}, []);

	return children;
}
