import type { AlgorithmInfo } from '../types';

export const data: AlgorithmInfo = {
	id: 'insertion-sort',
	name: 'Insertion Sort',
	category: 'Insertion',
	complexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)', space: 'O(1)' },
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
};
