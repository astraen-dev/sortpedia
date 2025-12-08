import type { AlgorithmInfo } from '../types';

export const data: AlgorithmInfo = {
	id: 'merge-sort',
	name: 'Merge Sort',
	category: 'Merge',
	complexity: {
		best: 'O(n \\log n)',
		average: 'O(n \\log n)',
		worst: 'O(n \\log n)',
		space: 'O(n)'
	},
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
};
