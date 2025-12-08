export interface AlgorithmInfo {
	id: string;
	name: string;
	category: 'Exchange' | 'Selection' | 'Insertion' | 'Merge' | 'Distribution';
	complexity: {
		best: string;
		average: string;
		worst: string;
	};
	stable: boolean;
	description: string;
}

export const algorithms: AlgorithmInfo[] = [
	{
		id: 'bubble-sort',
		name: 'Bubble Sort',
		category: 'Exchange',
		complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
		stable: true,
		description:
			'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
	},
	{
		id: 'quick-sort',
		name: 'Quick Sort',
		category: 'Exchange',
		complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
		stable: false,
		description:
			'An efficient, divide-and-conquer algorithm that works by selecting a "pivot" element and partitioning the other elements into two sub-arrays.'
	},
	{
		id: 'merge-sort',
		name: 'Merge Sort',
		category: 'Merge',
		complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
		stable: true,
		description:
			'A divide and conquer algorithm that produces a stable sort. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.'
	},
	{
		id: 'insertion-sort',
		name: 'Insertion Sort',
		category: 'Insertion',
		complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
		stable: true,
		description:
			'Builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms.'
	}
];

export const getAlgorithm = (id: string) => algorithms.find((a) => a.id === id);
