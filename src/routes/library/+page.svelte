<script>
	import { algorithms } from '$lib/algorithms';
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import Latex from '$lib/components/Latex.svelte';

	const categoryExplanations = {
		Exchange:
			'Sorts by repeatedly swapping adjacent elements to move them to their correct positions.',
		Selection: 'Sorts by repeatedly finding the minimum element and placing it at the beginning.',
		Insertion:
			'Sorts by building a final sorted array one item at a time, inserting it into place.',
		Merge: 'Sorts by recursively dividing the list, sorting the halves, and merging them back.',
		Distribution: 'Sorts by distributing elements into buckets based on their values.'
	};
</script>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="text-3xl font-bold">Algorithm Library</h1>
		<p class="text-surface-800 mt-2">Explore complexity, stability, and implementation details.</p>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each algorithms as algo, i (algo.id)}
			<div in:fade={{ delay: i * 50, duration: 400 }}>
				<a
					href={resolve(`/library/${algo.id}`)}
					class="bg-surface-50 border-surface-200 hover:border-primary group flex h-full flex-col rounded-xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
				>
					<div class="flex items-start justify-between">
						<h2 class="group-hover:text-primary text-xl font-bold transition-colors">
							{algo.name}
						</h2>
						<span
							class="bg-surface-50 text-yellow-600 flex items-center rounded-full px-2 py-1 text-lg font-mono"
						>
							<Latex src={algo.complexity.average} />
						</span>
					</div>

					<p class="text-surface-800 mt-4 flex-1 line-clamp-3 text-sm">
						{algo.description}
					</p>

					<div class="mt-6 flex flex-wrap items-center gap-2">
						<!-- Category Tag with Tooltip -->
						<div class="group/tooltip relative">
							<span
								class="bg-surface-100 text-surface-800 border-surface-200 cursor-help rounded border px-2 py-1 text-xs font-medium"
							>
								{algo.category}
							</span>
							<div
								class="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-max max-w-[80vw] rounded-md bg-surface-900 px-3 py-2 text-xs font-medium text-surface-50 opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 sm:left-1/2 sm:max-w-xs sm:-translate-x-1/2"
							>
								{categoryExplanations[algo.category]}
								<div
									class="absolute left-3 top-full border-4 border-x-transparent border-b-transparent border-t-surface-900 sm:left-1/2 sm:-translate-x-1/2"
								></div>
							</div>
						</div>

						<!-- Stability Tag with Tooltip -->
						{#if algo.stable}
							<div class="group/tooltip relative">
								<span
									class="bg-green-100 text-green-800 border-green-200 cursor-help rounded border px-2 py-1 text-xs font-medium"
								>
									Stable
								</span>
								<div
									class="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-max max-w-[80vw] rounded-md bg-surface-900 px-3 py-2 text-xs font-medium text-surface-50 opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 sm:left-1/2 sm:max-w-xs sm:-translate-x-1/2"
								>
									Preserves the relative order of elements with equal values.
									<div
										class="absolute left-3 top-full border-4 border-x-transparent border-b-transparent border-t-surface-900 sm:left-1/2 sm:-translate-x-1/2"
									></div>
								</div>
							</div>
						{:else}
							<div class="group/tooltip relative">
								<span
									class="bg-red-50 text-red-800 border-red-200 cursor-help rounded border px-2 py-1 text-xs font-medium"
								>
									Unstable
								</span>
								<div
									class="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-max max-w-[80vw] rounded-md bg-surface-900 px-3 py-2 text-xs font-medium text-surface-50 opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 sm:left-1/2 sm:max-w-xs sm:-translate-x-1/2"
								>
									Does not guarantee the relative order of elements with equal values.
									<div
										class="absolute left-3 top-full border-4 border-x-transparent border-b-transparent border-t-surface-900 sm:left-1/2 sm:-translate-x-1/2"
									></div>
								</div>
							</div>
						{/if}
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
