export type SortEventType = 'compare' | 'swap' | 'write' | 'sorted';

export interface SortEvent {
	type: SortEventType;
	indices: number[]; // Indices involved in the event
	value?: number; // Used for 'write' events (e.g. Merge Sort overwrites)
}

export interface SortWorkerRequest {
	algorithm: string;
	array: number[];
}

export interface SortWorkerResponse {
	trace: SortEvent[];
	sortedArray: number[];
}
