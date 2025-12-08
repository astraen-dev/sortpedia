import type { SortEvent } from '$lib/logic/types';
import { SvelteSet } from 'svelte/reactivity';

export class VisualizerEngine {
	// State
	array = $state<number[]>([]);
	trace = $state<SortEvent[]>([]);
	stepIndex = $state(0);
	isPlaying = $state(false);
	speed = $state(5); // 1-10

	// Active state for coloring bars
	activeIndices = $state<number[]>([]);
	sortedIndices = $state(new SvelteSet<number>());
	eventType = $state<SortEvent['type'] | null>(null);

	private worker: Worker | null = null;
	private timer: number | null = null;
	private initialArray: number[] = [];

	constructor(defaultSize = 50) {
		this.generateArray(defaultSize);
	}

	generateArray(size: number) {
		this.reset();
		this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
		this.initialArray = [...this.array];
	}

	setArray(newArray: number[]) {
		this.reset();
		this.array = [...newArray];
		this.initialArray = [...newArray];
	}

	async runAlgorithm(algoId: string) {
		this.resetPlayback();

		// Initialize Worker
		if (this.worker) this.worker.terminate();
		const WorkerModule = await import('$lib/logic/worker?worker');
		this.worker = new WorkerModule.default();

		this.worker.onmessage = (e) => {
			const { trace } = e.data;
			this.trace = trace;
			this.play();
		};

		this.worker.postMessage({
			algorithm: algoId,
			array: [...this.initialArray]
		});
	}

	play() {
		if (this.stepIndex >= this.trace.length) return;
		this.isPlaying = true;
		this.loop();
	}

	pause() {
		this.isPlaying = false;
		if (this.timer) cancelAnimationFrame(this.timer);
		this.timer = null;
	}

	reset() {
		this.pause();
		this.trace = [];
		this.stepIndex = 0;
		this.activeIndices = [];
		this.sortedIndices = new SvelteSet();
		this.eventType = null;
		if (this.initialArray.length > 0) {
			this.array = [...this.initialArray];
		}
	}

	resetPlayback() {
		this.pause();
		this.stepIndex = 0;
		this.activeIndices = [];
		this.sortedIndices = new SvelteSet();
		this.eventType = null;
		this.array = [...this.initialArray];
	}

	private loop() {
		if (!this.isPlaying) return;

		// Calculate items per frame based on speed
		// Speed 1 = 1 op per 10 frames (slow)
		// Speed 5 = 1 op per frame
		// Speed 10 = 10 ops per frame
		const opsPerFrame = this.speed >= 5 ? Math.pow(this.speed - 4, 2) : 1;

		const delay = this.speed < 5 ? (5 - this.speed) * 100 : 0;

		const execute = () => {
			for (let i = 0; i < opsPerFrame; i++) {
				if (this.stepIndex >= this.trace.length) {
					this.isPlaying = false;
					this.activeIndices = [];
					this.eventType = null;
					return;
				}
				this.step();
			}

			if (this.isPlaying) {
				if (delay > 0) {
					setTimeout(() => {
						this.timer = requestAnimationFrame(execute);
					}, delay);
				} else {
					this.timer = requestAnimationFrame(execute);
				}
			}
		};

		this.timer = requestAnimationFrame(execute);
	}

	step() {
		const event = this.trace[this.stepIndex];

		// Update Visual State
		this.activeIndices = event.indices;
		this.eventType = event.type;

		// Apply Logic to Array
		if (event.type === 'swap') {
			const [i, j] = event.indices;
			[this.array[i], this.array[j]] = [this.array[j], this.array[i]];
		} else if (event.type === 'write' && event.value !== undefined) {
			const [i] = event.indices;
			this.array[i] = event.value;
		} else if (event.type === 'sorted') {
			event.indices.forEach((i) => this.sortedIndices.add(i));
		}

		this.stepIndex++;
	}

	getBarColor(index: number) {
		if (this.activeIndices.includes(index)) {
			switch (this.eventType) {
				case 'compare':
					return 'bg-vis-compare'; // Yellow
				case 'swap':
					return 'bg-vis-swap'; // Red
				case 'write':
					return 'bg-vis-write'; // Blue
				case 'sorted':
					return 'bg-vis-sorted'; // Green
			}
		}
		if (this.sortedIndices.has(index)) return 'bg-vis-sorted';
		return 'bg-vis-idle'; // Gray
	}
}

export const visualizer = new VisualizerEngine();
