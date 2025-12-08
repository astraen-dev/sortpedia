<script>
	import { algorithms } from '$lib/data/algorithms';
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import Latex from '$lib/components/Latex.svelte';
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
							class="bg-surface-200 text-surface-900 flex items-center rounded-full px-2 py-1 text-xs font-mono"
						>
							<Latex src={algo.complexity.average} />
						</span>
					</div>

					<p class="text-surface-800 mt-4 flex-1 line-clamp-3 text-sm">
						{algo.description}
					</p>

					<div class="mt-6 flex flex-wrap gap-2">
						<span
							class="bg-surface-100 text-surface-800 border-surface-200 rounded border px-2 py-1 text-xs font-medium"
						>
							{algo.category}
						</span>
						{#if algo.stable}
							<span
								class="bg-green-100 text-green-800 border-green-200 rounded border px-2 py-1 text-xs font-medium"
							>
								Stable
							</span>
						{:else}
							<span
								class="bg-red-50 text-red-800 border-red-200 rounded border px-2 py-1 text-xs font-medium"
							>
								Unstable
							</span>
						{/if}
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
