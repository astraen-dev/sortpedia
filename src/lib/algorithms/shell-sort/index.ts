import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation (NB: Uses shell's original gap sequence and doesn't write elements to themselves)
	// https://www.geeksforgeeks.org/dsa/shell-sort/
	const n = arr.length;

	// Start with a large gap, then reduce the gap.
	// Using Shell's original sequence: n/2, n/4, ..., 1
	for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
		// Perform a gapped insertion sort for the current gap size.
		// Iterate through the elements starting from the first 'gap' position.
		for (let i = gap; i < n; i++) {
			// Store the current element to be inserted.
			const temp = arr[i];
			let j = i;

			// Compare the current element with the element 'gap' positions behind it.
			// The second condition ensures we don't go out of bounds.
			// The first condition checks if a shift is needed.
			yield { type: 'compare', indices: [j, j - gap] };
			while (j >= gap && arr[j - gap] > temp) {
				// Shift the larger, gap-sorted element forward.
				arr[j] = arr[j - gap];
				yield { type: 'write', indices: [j], value: arr[j - gap] };
				j -= gap;

				// Yield next comparison if the loop continues
				if (j >= gap) {
					yield { type: 'compare', indices: [j, j - gap] };
				}
			}

			// Place the stored element in its correct sorted position.
			if (j !== i) {
				arr[j] = temp;
				yield { type: 'write', indices: [j], value: temp };
			}
		}
	}

	// Final pass to mark all elements as sorted for a clean visual finish.
	for (let k = 0; k < n; k++) {
		yield { type: 'sorted', indices: [k] };
	}
}
