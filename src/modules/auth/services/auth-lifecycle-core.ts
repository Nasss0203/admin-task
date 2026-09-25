export interface LifecycleState<TUser> {
	accessToken: string | null;
	user: TUser | null;
	isBootstrapped: boolean;
}

export interface LifecycleStore<TUser> {
	getState(): LifecycleState<TUser>;
	setAccessToken(accessToken: string): void;
	setUser(user: TUser): void;
	startBootstrap(): void;
	finishBootstrap(): void;
	clear(): void;
}

export interface AccessTokenResponse {
	access_token: string;
}

export interface AuthLifecycleDependencies<TCredentials, TUser> {
	login(credentials: TCredentials): Promise<AccessTokenResponse>;
	refresh(): Promise<AccessTokenResponse>;
	getMe(accessToken: string): Promise<TUser>;
	logout(): Promise<void>;
}

export function createAuthLifecycle<TCredentials, TUser>(
	store: LifecycleStore<TUser>,
	dependencies: AuthLifecycleDependencies<TCredentials, TUser>,
) {
	let bootstrapPromise: Promise<boolean> | null = null;

	async function loadUser(accessToken: string): Promise<TUser> {
		const user = await dependencies.getMe(accessToken);
		store.setUser(user);
		return user;
	}

	return {
		async login(credentials: TCredentials): Promise<TUser> {
			try {
				const response = await dependencies.login(credentials);
				store.setAccessToken(response.access_token);
				return await loadUser(response.access_token);
			} catch (error) {
				store.clear();
				throw error;
			}
		},

		bootstrap(): Promise<boolean> {
			const currentState = store.getState();

			if (currentState.isBootstrapped) {
				return Promise.resolve(
					Boolean(currentState.accessToken && currentState.user),
				);
			}

			if (!bootstrapPromise) {
				store.startBootstrap();
				bootstrapPromise = (async () => {
					try {
						let { accessToken } = store.getState();

						if (!accessToken) {
							const response = await dependencies.refresh();
							accessToken = response.access_token;
							store.setAccessToken(accessToken);
						}

						await loadUser(accessToken);
						return true;
					} catch {
						store.clear();
						return false;
					} finally {
						store.finishBootstrap();
					}
				})().finally(() => {
					bootstrapPromise = null;
				});
			}

			return bootstrapPromise;
		},

		async logout(): Promise<void> {
			try {
				await dependencies.logout();
			} finally {
				store.clear();
			}
		},
	};
}
