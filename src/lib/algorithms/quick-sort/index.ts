import type { SortEvent } from '../types';

export default function* (arr: number[]): Generator<SortEvent> {
	// TODO: add naive + hoare versions and the pivot strategies
	// Confirmed correct implementation (NB: uses Lomuto partition scheme)
	// https://www.geeksforgeeks.org/dsa/quick-sort-algorithm/
	yield* quickSortHelper(arr, 0, arr.length - 1);
	// Final pass to ensure everything is marked sorted green
	for (let i = 0; i < arr.length; i++) yield { type: 'sorted', indices: [i] };
}

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
