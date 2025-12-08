import type { SortEvent } from './types';

// Helper to copy array for the worker to avoid mutation issues
const clone = (arr: number[]) => [...arr];

export const algorithms: Record<string, (arr: number[]) => Generator<SortEvent>> = {
	'bubble-sort': function* (arr: number[]) {
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
	},

	'insertion-sort': function* (arr: number[]) {
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
	},

	'quick-sort': function* (arr: number[]) {
		// TODO: add naive + hoare versions
		// Confirmed correct implementation (NB: uses Lomuto partition scheme)
		// https://www.geeksforgeeks.org/dsa/quick-sort-algorithm/
		yield* quickSortHelper(arr, 0, arr.length - 1);
		// Final pass to ensure everything is marked sorted green
		for (let i = 0; i < arr.length; i++) yield { type: 'sorted', indices: [i] };
	},

	'merge-sort': function* (arr: number[]) {
		// Confirmed correct implementation (NB: uses auxiliary array instead of temp arrays)
		// https://www.geeksforgeeks.org/dsa/merge-sort/
		yield* mergeSortHelper(arr, 0, arr.length - 1, clone(arr));
		for (let i = 0; i < arr.length; i++) yield { type: 'sorted', indices: [i] };
	}
};

// --- Helpers ---

function* quickSortHelper(arr: number[], low: number, high: number): Generator<SortEvent> {
	if (low < high) {
		const pivotIndex = yield* partition(arr, low, high);
		yield* quickSortHelper(arr, low, pivotIndex - 1);
		yield* quickSortHelper(arr, pivotIndex + 1, high);
	} else if (low === high) {
		yield { type: 'sorted', indices: [low] };
	}
}

function* partition(arr: number[], low: number, high: number): Generator<SortEvent> {
	const pivot = arr[high];
	let i = low - 1;

	for (let j = low; j < high; j++) {
		yield { type: 'compare', indices: [j, high] }; // Compare with pivot
		if (arr[j] < pivot) {
			i++;
			[arr[i], arr[j]] = [arr[j], arr[i]];
			yield { type: 'swap', indices: [i, j] };
		}
	}
	[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
	yield { type: 'swap', indices: [i + 1, high] };
	return i + 1;
}

function* mergeSortHelper(
	arr: number[],
	left: number,
	right: number,
	aux: number[]
): Generator<SortEvent> {
	if (left >= right) return;
	const mid = Math.floor(left + (right - left) / 2);
	yield* mergeSortHelper(aux, left, mid, arr);
	yield* mergeSortHelper(aux, mid + 1, right, arr);
	yield* merge(arr, aux, left, mid, right);
}

function* merge(
	arr: number[],
	aux: number[],
	left: number,
	mid: number,
	right: number
): Generator<SortEvent> {
	let i = left;
	let j = mid + 1;
	let k = left;

	while (i <= mid && j <= right) {
		yield { type: 'compare', indices: [i, j] };
		if (aux[i] <= aux[j]) {
			arr[k] = aux[i];
			yield { type: 'write', indices: [k], value: aux[i] };
			i++;
		} else {
			arr[k] = aux[j];
			yield { type: 'write', indices: [k], value: aux[j] };
			j++;
		}
		k++;
	}

	while (i <= mid) {
		arr[k] = aux[i];
		yield { type: 'write', indices: [k], value: aux[i] };
		i++;
		k++;
	}

	while (j <= right) {
		arr[k] = aux[j];
		yield { type: 'write', indices: [k], value: aux[j] };
		j++;
		k++;
	}
}
