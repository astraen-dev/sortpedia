import type { SortEvent } from '../types';

// Helper to copy array for the worker to avoid mutation issues
const clone = (arr: number[]) => [...arr];

export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation (NB: uses auxiliary array instead of temp arrays)
	// https://www.geeksforgeeks.org/dsa/merge-sort/
	yield* mergeSortHelper(arr, 0, arr.length - 1, clone(arr));
	for (let i = 0; i < arr.length; i++) yield { type: 'sorted', indices: [i] };
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
