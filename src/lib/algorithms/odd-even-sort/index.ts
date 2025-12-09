import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation
	// https://www.geeksforgeeks.org/dsa/odd-even-sort-brick-sort/
	const n = arr.length;
	if (n <= 1) {
		if (n === 1) yield { type: 'sorted', indices: [0] };
		return;
	}

	let isSorted = false;
	while (!isSorted) {
		isSorted = true;

		// Odd phase: compare and swap elements at odd indices
		for (let i = 1; i < n - 1; i += 2) {
			yield { type: 'compare', indices: [i, i + 1] };
			if (arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				yield { type: 'swap', indices: [i, i + 1] };
				isSorted = false;
			}
		}

		// Even phase: compare and swap elements at even indices
		for (let i = 0; i < n - 1; i += 2) {
			yield { type: 'compare', indices: [i, i + 1] };
			if (arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				yield { type: 'swap', indices: [i, i + 1] };
				isSorted = false;
			}
		}
	}

	// Final pass to mark all elements as sorted for a clean visual finish.
	for (let k = 0; k < n; k++) {
		yield { type: 'sorted', indices: [k] };
	}
}
