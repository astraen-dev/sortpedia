import type { SortEvent } from '../types';

// A shared counter to prevent browser lock-up.
// Passed as an object to be mutable across recursive calls.
interface OperationCounter {
	ops: number;
}
const MAX_OPERATIONS = 5000;

/**
 * Shuffles the first n elements of an array in-place.
 */
function* shuffle(
	arr: number[],
	n: number,
	counter: OperationCounter
): Generator<SortEvent, void, unknown> {
	if (counter.ops++ > MAX_OPERATIONS) return;

	const indicesToShuffle = Array.from({ length: n }, (_, i) => i);
	yield { type: 'shuffle', indices: indicesToShuffle };

	let currentIndex = n;
	while (currentIndex !== 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
	}
	// Sync the main array with the shuffled state
	for (let i = 0; i < n; i++) {
		yield { type: 'write', indices: [i], value: arr[i] };
	}
}

/**
 * Recursively sorts the first n elements.
 * Steps 2 & 3 from the documentation.
 */
function* bogobogoSortInternal(
	data: number[],
	n: number,
	counter: OperationCounter
): Generator<SortEvent, boolean, unknown> {
	if (n <= 1) return true;

	while (counter.ops < MAX_OPERATIONS) {
		// Step 2: Sort the first n-1 elements using the full BogoBogo procedure.
		// This involves creating a sublist and applying the main loop to it.
		const sublist = data.slice(0, n - 1);

		// Keep shuffling the sublist until isSortedBogobogo says it's sorted
		while (counter.ops < MAX_OPERATIONS) {
			const isSublistSorted = yield* isSortedBogobogo(sublist, counter);
			if (isSublistSorted) break;
			yield* shuffle(sublist, sublist.length, counter);
		}
		if (counter.ops >= MAX_OPERATIONS) return false;

		// Copy the sorted sublist back into the main data array
		for (let i = 0; i < sublist.length; i++) {
			if (data[i] !== sublist[i]) {
				data[i] = sublist[i];
				yield { type: 'write', indices: [i], value: data[i] };
			}
		}

		// Step 3: Check if the nth element is greater than the max of the first n-1.
		yield { type: 'compare', indices: [n - 1, n - 2] };
		if (counter.ops++ > MAX_OPERATIONS) return false;
		if (data[n - 1] >= data[n - 2]) {
			return true; // The first n elements are now sorted
		}

		// If not, randomize the first n elements and repeat the process.
		yield* shuffle(data, n, counter);
	}
	return false;
}

/**
 * The full 4-step "is sorted" check specific to Bogobogo Sort.
 */
function* isSortedBogobogo(
	originalData: number[],
	counter: OperationCounter
): Generator<SortEvent, boolean, unknown> {
	const n = originalData.length;
	if (n <= 1) return true;
	if (counter.ops >= MAX_OPERATIONS) return false;

	// Step 1: Make a copy
	const copy = originalData.slice();

	// Steps 2 & 3: Sort the copy using the internal recursive sorter
	const sortedSuccessfully = yield* bogobogoSortInternal(copy, n, counter);
	if (!sortedSuccessfully) return false;

	// Step 4: Check if the "sorted" copy matches the original list
	for (let i = 0; i < n; i++) {
		yield { type: 'compare', indices: [i, i] }; // Comparing original[i] to copy[i]
		if (counter.ops++ > MAX_OPERATIONS) return false;
		if (originalData[i] !== copy[i]) {
			return false; // They don't match, so originalData is not "sorted"
		}
	}

	return true; // They match, the check passes
}

/**
 * Main Bogobogo Sort function.
 */
export default function* (arr: number[]): Generator<SortEvent> {
	// Confirmed correct implementation
	// https://www.dangermouse.net/esoteric/bogobogosort.html
	const counter: OperationCounter = { ops: 0 };

	while (counter.ops < MAX_OPERATIONS) {
		const isSorted = yield* isSortedBogobogo(arr, counter);

		if (isSorted) {
			// Success! Mark all elements as sorted.
			for (let i = 0; i < arr.length; i++) {
				yield { type: 'sorted', indices: [i] };
			}
			return;
		}

		// If not sorted, shuffle the entire array and try again.
		yield* shuffle(arr, arr.length, counter);
	}

	// If the loop terminates due to MAX_OPERATIONS, the visualizer will stop,
	// demonstrating the algorithm's failure to sort in a reasonable time.
}
