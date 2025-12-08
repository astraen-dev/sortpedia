export interface AlgorithmInfo {
	id: string;
	name: string;
	category: 'Exchange' | 'Selection' | 'Insertion' | 'Merge' | 'Distribution';
	complexity: {
		best: string;
		average: string;
		worst: string;
		space: string;
	};
	stable: boolean;
	description: string;
	details: {
		summary: string;
		steps: string[];
		advantages: string[];
		disadvantages: string[];
		pseudocode: string;
		funFacts?: string[];
	};
}

// TODO: Support multiple languages for code snippets

export const algorithms: AlgorithmInfo[] = [
	{
		id: 'bubble-sort',
		name: 'Bubble Sort',
		category: 'Exchange',
		complexity: {
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)',
			space: 'O(1)'
		},
		stable: true,
		description:
			'The simplest sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.',
		details: {
			summary: 'placeholder',
			steps: ['placeholder'],
			advantages: ['placeholder'],
			disadvantages: ['placeholder'],
			pseudocode: `placeholder`
		}
	},
	{
		id: 'quick-sort',
		name: 'Quick Sort',
		category: 'Exchange',
		complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
		stable: false,
		description:
			'An efficient, divide-and-conquer algorithm that works by selecting a "pivot" element and partitioning the other elements into two sub-arrays.',
		details: {
			summary: 'placeholder',
			steps: ['placeholder'],
			advantages: ['placeholder'],
			disadvantages: ['placeholder'],
			pseudocode: `placeholder`
		}
	},
	{
		id: 'merge-sort',
		name: 'Merge Sort',
		category: 'Merge',
		complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
		stable: true,
		description:
			'A divide and conquer algorithm that produces a stable sort. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
		details: {
			summary: 'placeholder',
			steps: ['placeholder'],
			advantages: ['placeholder'],
			disadvantages: ['placeholder'],
			pseudocode: `placeholder`
		}
	},
	{
		id: 'insertion-sort',
		name: 'Insertion Sort',
		category: 'Insertion',
		complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
		stable: true,
		description:
			'Builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms.',
		details: {
			summary: 'placeholder',
			steps: ['placeholder'],
			advantages: ['placeholder'],
			disadvantages: ['placeholder'],
			pseudocode: `placeholder`
		}
	}
];

export const getAlgorithm = (id: string) => algorithms.find((a) => a.id === id);
