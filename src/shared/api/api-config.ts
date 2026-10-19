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
		// Bypass ngrok free-tier browser warning page (ERR_NGROK_6024), which has no CORS headers.
		...(/\.ngrok(-free)?\.(app|dev|io)$/.test(new URL(baseURL).hostname) && {
			"ngrok-skip-browser-warning": "true",
		}),
	},
} as const;
