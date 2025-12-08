<script>
	import { resolve } from '$app/paths';
</script>

<div class="flex flex-col items-center justify-center py-20 text-center">
	<h1 class="text-surface-900 text-5xl font-extrabold tracking-tight sm:text-6xl">
		Master <span class="text-primary">Sorting Algorithms</span><br /> Through Visualization
	</h1>
	<p class="text-surface-800 mt-6 max-w-2xl text-lg">
		Interactive visualizers, side-by-side comparisons, and deep-dive explanations for computer
		science students and enthusiasts.
	</p>

	<div class="mt-10 flex gap-4">
		<a
			href={resolve('/visualizer')}
			class="bg-primary hover:bg-primary/90 rounded-md px-6 py-3 font-medium text-white shadow-lg shadow-primary/20 transition-colors"
		>
			Start Visualizing
		</a>
		<a
			href={resolve('/library')}
			class="bg-surface-200 hover:bg-surface-300 text-surface-900 rounded-md px-6 py-3 font-medium transition-colors"
		>
			Browse Library
		</a>
	</div>

	<!-- Hero Placeholder Animation -->
	<div
		class="bg-surface-100 border-surface-200 mt-16 flex h-64 w-full max-w-4xl items-end justify-center gap-1 rounded-xl border p-8 shadow-inner"
	>
		{#each Array.from({ length: 20 }, (_, k) => k) as i (i)}
			<div
				class="bg-vis-idle w-full rounded-t-sm opacity-60"
				style="height: {Math.random() * 100}%"
			></div>
		{/each}
	</div>
</div>
