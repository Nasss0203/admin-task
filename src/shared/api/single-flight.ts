export function createSingleFlight<T>() {
	let activePromise: Promise<T> | null = null;

	return {
		run(task: () => Promise<T>): Promise<T> {
			if (!activePromise) {
				activePromise = task().finally(() => {
					activePromise = null;
				});
			}

			return activePromise;
		},
	};
}
