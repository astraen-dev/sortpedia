import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation
	// https://www.geeksforgeeks.org/dsa/cocktail-sort/
	let swapped = true;
	let start = 0;
	let end = arr.length;

	while (swapped) {
		// Reset the swapped flag on entering the loop, as it might be true from a
		// previous iteration.
		swapped = false;

		// --- FORWARD PASS ---
		// Loop from left to right, similar to Bubble Sort.
		// After this pass, the largest element is at the end of the unsorted section.
		for (let i = start; i < end - 1; ++i) {
			yield { type: 'compare', indices: [i, i + 1] };
			if (arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				yield { type: 'swap', indices: [i, i + 1] };
				swapped = true;
			}
		}

		// If no swaps occurred, the array is sorted.
		if (!swapped) break;

		// Mark the last-placed element as sorted and shrink the upper bound.
		end--;
		yield { type: 'sorted', indices: [end] };

		// --- BACKWARD PASS ---
		// Reset the swapped flag so it can be used for the backward pass.
		swapped = false;

		// Loop from right to left.
		// After this pass, the smallest element is at the start of the unsorted section.
		for (let i = end - 1; i >= start; i--) {
			yield { type: 'compare', indices: [i, i + 1] };
			if (arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				yield { type: 'swap', indices: [i, i + 1] };
				swapped = true;
			}
		}

		// Mark the first-placed element as sorted and shrink the lower bound.
		start++;
		yield { type: 'sorted', indices: [start - 1] };
	}

	// Final pass to ensure all elements are marked as sorted visually.
	for (let k = 0; k < arr.length; k++) {
		yield { type: 'sorted', indices: [k] };
	}
}
