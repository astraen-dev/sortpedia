import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation
	// https://www.geeksforgeeks.org/dsa/comb-sort/
	const n = arr.length;
	let gap = n;
	let swapped = true;

	// The loop continues as long as the gap is greater than 1,
	// or if a swap occurred in the last pass (when gap is 1).
	while (gap !== 1 || swapped) {
		// Find the next gap
		const newGap = Math.floor((gap * 10) / 13);
		gap = newGap < 1 ? 1 : newGap;

		// Initialize swapped as false for this pass
		swapped = false;

		// Perform a gapped comparison pass, similar to Bubble Sort
		for (let i = 0; i < n - gap; i++) {
			const j = i + gap;
			yield { type: 'compare', indices: [i, j] };

			if (arr[i] > arr[j]) {
				// Swap elements
				[arr[i], arr[j]] = [arr[j], arr[i]];
				yield { type: 'swap', indices: [i, j] };

				// A swap has occurred
				swapped = true;
			}
		}
	}

	// Final pass to mark all elements as sorted
	for (let k = 0; k < n; k++) {
		yield { type: 'sorted', indices: [k] };
	}
}
