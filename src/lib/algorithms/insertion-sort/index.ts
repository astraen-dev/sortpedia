import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation
	// https://www.geeksforgeeks.org/dsa/insertion-sort-algorithm/
	const n = arr.length;
	yield { type: 'sorted', indices: [0] }; // First element is effectively sorted

	for (let i = 1; i < n; i++) {
		const key = arr[i];
		let j = i - 1;

		yield { type: 'compare', indices: [i, j < 0 ? 0 : j] };

		while (j >= 0 && arr[j] > key) {
			yield { type: 'compare', indices: [j + 1, j] };
			arr[j + 1] = arr[j];
			yield { type: 'write', indices: [j + 1], value: arr[j] };
			j = j - 1;
			if (j >= 0) yield { type: 'compare', indices: [i, j] };
		}
		arr[j + 1] = key;
		yield { type: 'write', indices: [j + 1], value: key };

		// Visual cleanup: mark processed section as sorted-ish
		for (let k = 0; k <= i; k++) yield { type: 'sorted', indices: [k] };
	}
}
