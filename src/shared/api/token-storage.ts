import { STORAGE_KEYS } from "../constants/storage.constants";

function getLocalStorage(): Storage | null {
	if (typeof window === "undefined") {
		return null;
	}

	return window.localStorage;
}

export const tokenStorage = {
	getAccessToken(): string | null {
		return (
			getLocalStorage()?.getItem(STORAGE_KEYS.ADMIN_ACCESS_TOKEN) ?? null
		);
	},

	setAccessToken(token: string): void {
		getLocalStorage()?.setItem(STORAGE_KEYS.ADMIN_ACCESS_TOKEN, token);
	},

	removeAccessToken(): void {
		getLocalStorage()?.removeItem(STORAGE_KEYS.ADMIN_ACCESS_TOKEN);
	},
};
