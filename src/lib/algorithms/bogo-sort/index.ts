import type { SortEvent } from '../types';

/**
 * Checks if the array is sorted. Yields 'compare' events for visualization.
 */
function* isSorted(arr: number[]): Generator<SortEvent, boolean> {
	for (let i = 0; i < arr.length - 1; i++) {
		yield { type: 'compare', indices: [i, i + 1] };
		if (arr[i] > arr[i + 1]) {
			return false; // Found an unsorted pair, the check fails
		}
	}
	return true; // The entire array is sorted
}

/**
 * Shuffles the array in-place using the Fisher-Yates algorithm.
 * Yields a single 'shuffle' event to visualize the entire operation at once.
 */
function* shuffle(arr: number[]): Generator<SortEvent> {
	const allIndices = Array.from({ length: arr.length }, (_, i) => i);
	yield { type: 'shuffle', indices: allIndices };

	let currentIndex = arr.length;
	while (currentIndex !== 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
	}

	// Synchronize the main thread's array.
	for (let i = 0; i < arr.length; i++) {
		yield { type: 'write', indices: [i], value: arr[i] };
	}
}

export default function* (arr: number[]): Generator<SortEvent> {
	// A safety break is crucial for Bogo Sort to prevent browser lock-ups.
	const MAX_ATTEMPTS = 500;
	let attempts = 0;

	while (attempts < MAX_ATTEMPTS) {
		const sorted = yield* isSorted(arr);

		if (sorted) {
			// Success! Mark all elements as sorted and terminate.
			for (let i = 0; i < arr.length; i++) {
				yield { type: 'sorted', indices: [i] };
			}
			return;
		}

		// If not sorted, perform a full shuffle and sync the state.
		yield* shuffle(arr);
		attempts++;
	}

	// If the loop finishes, it means we hit MAX_ATTEMPTS. The visualizer will stop,
	// demonstrating the algorithm's failure to sort in a reasonable time.
}
