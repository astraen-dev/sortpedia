import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation
	// https://www.geeksforgeeks.org/dsa/gnome-sort-a-stupid-one/
	const n = arr.length;
	let pos = 0; // This represents the gnome's position.

	while (pos < n) {
		// Condition 1: If the gnome is at the start, it can only move forward.
		// Condition 2: If the current element is in order relative to the previous, move forward.
		if (pos === 0 || arr[pos] >= arr[pos - 1]) {
			if (pos > 0) {
				// Yield a 'compare' event to show the elements are in order.
				yield { type: 'compare', indices: [pos, pos - 1] };
				// Mark the element to the left as sorted, as the gnome is moving past it.
				yield { type: 'sorted', indices: [pos - 1] };
			}
			pos++; // Move the gnome forward.
		} else {
			// The current element is smaller than the previous one, so they are out of order.
			// Yield a 'compare' event to highlight the out-of-order pair.
			yield { type: 'compare', indices: [pos, pos - 1] };

			// Swap the elements.
			[arr[pos], arr[pos - 1]] = [arr[pos - 1], arr[pos]];
			yield { type: 'swap', indices: [pos, pos - 1] };

			// Move the gnome backward to carry the smaller element to its correct position.
			pos--;
		}
	}

	// Final pass to mark all elements as sorted for a clean visual finish.
	for (let k = 0; k < n; k++) {
		yield { type: 'sorted', indices: [k] };
	}
}
