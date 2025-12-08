<script lang="ts">
	import { algorithms } from '$lib/data/algorithms';

	let selectedAlgo = $state(algorithms[0].id);
</script>

<div class="grid h-[calc(100vh-12rem)] grid-cols-1 gap-6 lg:grid-cols-4">
	<!-- Canvas Area -->
	<div
		class="bg-surface-100 border-surface-200 relative flex flex-col items-center justify-center rounded-xl border shadow-inner lg:col-span-3"
	>
		<p class="text-surface-800 text-lg font-medium">Visualization Canvas Placeholder</p>
		<p class="text-surface-800/60 mt-2 text-sm">Bars will render here based on event stream.</p>

		<!-- Simulated Bar Container -->
		<div class="absolute bottom-8 left-8 right-8 flex h-1/2 items-end gap-1">
			<!-- Use Array.from to generate indices directly -->
			{#each Array.from({ length: 15 }, (_, k) => k) as i (i)}
				<div
					class="bg-vis-idle w-full rounded-t-sm"
					style="height: {20 + Math.random() * 80}%"
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
				class="border-surface-200 bg-surface-50 rounded-md border p-2"
			>
				{#each algorithms as algo (algo.id)}
					<option value={algo.id}>{algo.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col gap-2">
			<label for="size" class="text-sm font-medium">Array Size</label>
			<input id="size" type="range" min="10" max="100" class="accent-primary" />
		</div>

		<div class="flex flex-col gap-2">
			<label for="speed" class="text-sm font-medium">Speed</label>
			<input id="speed" type="range" min="1" max="10" class="accent-primary" />
		</div>

		<div class="mt-auto grid grid-cols-2 gap-2">
			<button class="bg-primary hover:bg-primary/90 rounded-md py-2 font-medium text-white"
				>Sort</button
			>
			<button class="bg-surface-200 hover:bg-surface-300 rounded-md py-2 font-medium">Reset</button>
		</div>
	</div>
</div>
