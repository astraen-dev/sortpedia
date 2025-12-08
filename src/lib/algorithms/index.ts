import type { AlgorithmInfo } from './types';

// Define the expected shape of the modules we are importing.
// Each module should have a named export 'data' of type AlgorithmInfo.
type AlgorithmModule = {
	data: AlgorithmInfo;
};

// Use Vite's glob import to get all data.ts modules.
// The `eager: true` option imports them synchronously.
const modules = import.meta.glob<AlgorithmModule>('./*/data.ts', { eager: true });

// Extract the 'data' export from each module and build the array.
export const algorithms: AlgorithmInfo[] = Object.values(modules).map((module) => module.data);

// Re-create the helper function for easy lookups.
export const getAlgorithm = (id: string) => algorithms.find((a) => a.id === id);
