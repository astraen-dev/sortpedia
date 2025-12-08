<script lang="ts">
	import { algorithms } from '$lib/data/algorithms';

	let selectedAlgo = $state(algorithms[0].id);
	let arraySize = $state(50);
	let speed = $state(5);
</script>

<div class="grid min-h-[600px] grid-cols-1 gap-6 lg:grid-cols-4">
	<!-- Canvas Area -->
	<div
		class="bg-surface-100 border-surface-200 relative flex flex-col items-center justify-center rounded-xl border shadow-inner lg:col-span-3 min-h-[400px]"
	>
		<div class="z-10 text-center px-4">
			<p class="text-surface-800 text-lg font-medium">Visualization Canvas Placeholder</p>
			<p class="text-surface-800/60 mt-2 text-sm">
				Bars will render here based on event stream via Web Worker.
			</p>
		</div>

		<!-- Simulated Bar Container -->
		<div class="absolute bottom-8 left-8 right-8 flex h-2/3 items-end gap-0.5 opacity-50">
			{#each Array.from({ length: 30 }, (_, k) => k) as i (i)}
				<div
					class="bg-vis-idle w-full rounded-t-sm"
					style="height: {10 + Math.random() * 90}%"
				></div>
			{/each}
		</div>
	</div>

	<!-- Controls Panel -->
	<div class="bg-surface-50 border-surface-200 flex flex-col gap-6 rounded-xl border p-6 shadow-sm">
		<h2 class="text-xl font-bold">Controls</h2>

		<div class="flex flex-col gap-2">
			<label for="algo-select" class="text-sm font-medium">Algorithm</label>
			<select
				id="algo-select"
				bind:value={selectedAlgo}
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
				<span class="text-xs text-gray-500 font-mono">{arraySize} elements</span>
			</div>
			<input
				id="size"
				type="range"
				min="10"
				max="100"
				bind:value={arraySize}
				class="accent-primary cursor-pointer"
			/>
		</div>

		<div class="flex flex-col gap-3">
			<div class="flex justify-between">
				<label for="speed" class="text-sm font-medium">Speed</label>
				<span class="text-xs text-gray-500 font-mono">{speed}x</span>
			</div>
			<input
				id="speed"
				type="range"
				min="1"
				max="10"
				bind:value={speed}
				class="accent-primary cursor-pointer"
			/>
		</div>

		<div class="mt-auto grid grid-cols-2 gap-3 pt-4">
			<button
				class="bg-primary hover:bg-primary-dark focus:ring-primary/50 rounded-md py-2.5 font-medium text-white shadow-sm transition-all active:scale-95 focus:ring-2 focus:outline-none"
			>
				Sort
			</button>
			<button
				class="bg-surface-200 hover:bg-surface-300 text-surface-900 focus:ring-surface-300/50 rounded-md py-2.5 font-medium transition-all active:scale-95 focus:ring-2 focus:outline-none"
			>
				Reset
			</button>
		</div>
	</div>
</div>
