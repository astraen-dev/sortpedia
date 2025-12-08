import type { AlgorithmInfo } from '../types';

export const data: AlgorithmInfo = {
	id: 'quick-sort',
	name: 'Quick Sort',
	category: 'Exchange',
	complexity: {
		best: 'O(n \\log n)',
		average: 'O(n \\log n)',
		worst: 'O(n^2)',
		space: 'O(\\log n)'
	},
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
};
