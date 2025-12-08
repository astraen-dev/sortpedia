<script lang="ts">
	import { algorithms } from '$lib/algorithms';
	import { visualizer } from '$lib/stores/visualizer.svelte';
	import VisualizerDisplay from '$lib/components/visualizer/VisualizerDisplay.svelte';
	import { onMount } from 'svelte';

	// Bind controls to store
	let selectedAlgo = $state(algorithms[0].id);

	// Effects to sync inputs with store
	const handleSizeChange = (e: Event) => {
		const size = +(e.target as HTMLInputElement).value;
		visualizer.generateArray(size);
	};

	const handleSort = () => {
		visualizer.runAlgorithm(selectedAlgo);
	};

	onMount(() => {
		// Ensure initial array exists
		if (visualizer.array.length === 0) visualizer.generateArray(50);
	});
</script>

<div class="grid min-h-[600px] grid-cols-1 gap-6 lg:grid-cols-4">
	<!-- Canvas Area -->
	<div
		class="bg-surface-100 border-surface-200 relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-xl border p-8 shadow-inner lg:col-span-3"
	>
		<VisualizerDisplay engine={visualizer} showStats={true} />
	</div>

	<!-- Controls Panel -->
	<div class="bg-surface-50 border-surface-200 flex flex-col gap-6 rounded-xl border p-6 shadow-sm">
		<h2 class="text-xl font-bold">Controls</h2>

		<div class="flex flex-col gap-2">
			<label for="algo-select" class="text-sm font-medium">Algorithm</label>
			<select
				id="algo-select"
				bind:value={selectedAlgo}
				onchange={() => visualizer.resetPlayback()}
				class="border-surface-200 bg-surface-50 focus:border-primary focus:ring-primary/20 rounded-md border p-2 transition-shadow focus:ring-2 focus:outline-none"
			>
				{#each algorithms as algo (algo.id)}
					<option value={algo.id}>{algo.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col gap-3">
			<div class="flex justify-between">
				<label for="size" class="text-sm font-medium">Array Size</label>
				<span class="text-xs font-mono text-gray-500">{visualizer.array.length}</span>
			</div>
			<input
				id="size"
				type="range"
				min="10"
				max="150"
				value={visualizer.array.length}
				oninput={handleSizeChange}
				disabled={visualizer.isPlaying}
				class="accent-primary cursor-pointer disabled:opacity-50"
			/>
		</div>

		<div class="flex flex-col gap-3">
			<div class="flex justify-between">
				<label for="speed" class="text-sm font-medium">Speed</label>
				<span class="text-xs font-mono text-gray-500">{visualizer.speed}x</span>
			</div>
			<input
				id="speed"
				type="range"
				min="1"
				max="10"
				bind:value={visualizer.speed}
				class="accent-primary cursor-pointer"
			/>
		</div>

		<div class="mt-auto grid grid-cols-2 gap-3 pt-4">
			{#if !visualizer.isPlaying && visualizer.stepIndex === 0}
				<button
					onclick={handleSort}
					class="bg-primary hover:bg-primary-dark focus:ring-primary/50 col-span-2 rounded-md py-2.5 font-medium text-white shadow-sm transition-all active:scale-95 focus:ring-2 focus:outline-none"
				>
					Start Sorting
				</button>
			{:else if visualizer.isPlaying}
				<button
					onclick={() => visualizer.pause()}
					class="bg-vis-compare hover:brightness-90 col-span-2 rounded-md py-2.5 font-medium text-white shadow-sm transition-all active:scale-95"
				>
					Pause
				</button>
			{:else}
				<button
					onclick={() => visualizer.play()}
					class="bg-primary hover:bg-primary-dark rounded-md py-2.5 font-medium text-white shadow-sm transition-all active:scale-95"
				>
					Resume
				</button>
				<button
					onclick={() => visualizer.resetPlayback()}
					class="bg-surface-200 text-surface-900 hover:bg-surface-300 rounded-md py-2.5 font-medium shadow-sm transition-all active:scale-95"
				>
					Reset
				</button>
			{/if}

			<button
				onclick={() => visualizer.generateArray(visualizer.array.length)}
				disabled={visualizer.isPlaying}
				class="bg-surface-200 hover:bg-surface-300 text-surface-900 focus:ring-surface-300/50 col-span-2 rounded-md py-2.5 font-medium transition-all active:scale-95 focus:ring-2 focus:outline-none disabled:opacity-50"
			>
				New Array
			</button>
		</div>
	</div>
</div>
