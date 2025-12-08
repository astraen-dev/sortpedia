import { algorithms } from './algorithms';
import type { SortWorkerRequest, SortWorkerResponse } from './types';

self.onmessage = (e: MessageEvent<SortWorkerRequest>) => {
	const { algorithm, array } = e.data;
	const sortFn = algorithms[algorithm];

	if (!sortFn) {
		console.error(`Algorithm ${algorithm} not found`);
		return;
	}

	// Create a working copy of the array
	const workingArray = [...array];
	const generator = sortFn(workingArray);
	const trace = [];

	// Run generator to completion and record every event
	for (const event of generator) {
		trace.push(event);
	}

	const response: SortWorkerResponse = {
		trace,
		sortedArray: workingArray
	};

	self.postMessage(response);
};

export {};
