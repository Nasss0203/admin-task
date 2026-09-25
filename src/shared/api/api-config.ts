const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

if (!baseURL) {
	throw new Error("VITE_API_BASE_URL is not configured");
}

export const API_CONFIG = {
	baseURL,
	timeout: 10_000,
	withCredentials: true,
	headers: {
		Accept: "application/json",
	},
} as const;
