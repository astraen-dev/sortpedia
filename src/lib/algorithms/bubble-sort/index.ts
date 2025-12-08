import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation (NB: uses auto-stop optimization)
	// https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/
	const n = arr.length;
	let swapped;
	for (let i = 0; i < n - 1; i++) {
		swapped = false;
		for (let j = 0; j < n - i - 1; j++) {
			yield { type: 'compare', indices: [j, j + 1] };
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				yield { type: 'swap', indices: [j, j + 1] };
				swapped = true;
			}
		}
		// Mark end element as sorted
		yield { type: 'sorted', indices: [n - i - 1] };
		if (!swapped) break;
	}
	// Mark remaining as sorted
	for (let i = 0; i < n; i++) yield { type: 'sorted', indices: [i] };
}
