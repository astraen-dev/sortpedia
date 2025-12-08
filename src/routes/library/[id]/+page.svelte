<script lang="ts">
	import { page } from '$app/state';
	import { getAlgorithm } from '$lib/data/algorithms';
	import { resolve } from '$app/paths';

	// page.params.id is string | undefined.
	// We use ?? '' to ensure it is a string, which getAlgorithm expects.
	let algoId = $derived(page.params.id ?? '');
	let algorithm = $derived(getAlgorithm(algoId));
</script>

{#if algorithm}
	<article class="prose prose-slate lg:prose-lg mx-auto">
		<div class="not-prose mb-8">
			<a href={resolve('/library')} class="text-primary mb-4 inline-block text-sm hover:underline"
				>&larr; Back to Library</a
			>
			<h1 class="text-surface-900 text-4xl font-extrabold tracking-tight">{algorithm.name}</h1>
			<div class="mt-4 flex flex-wrap gap-2">
				<span class="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
					>{algorithm.category} Sort</span
				>
				<span class="bg-surface-200 text-surface-800 rounded-full px-3 py-1 text-sm font-medium"
					>Avg: {algorithm.complexity.average}</span
				>
			</div>
		</div>

		<p class="lead text-surface-800 text-xl">{algorithm.description}</p>

		<div class="not-prose my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
			<div class="bg-surface-50 border-surface-200 rounded-xl border p-6">
				<h3 class="mb-4 text-lg font-bold">Complexity Analysis</h3>
				<dl class="space-y-2 text-sm">
					<div class="flex justify-between border-b pb-2">
						<dt class="text-gray-500">Best Case</dt>
						<dd class="font-mono">{algorithm.complexity.best}</dd>
					</div>
					<div class="flex justify-between border-b pb-2">
						<dt class="text-gray-500">Average Case</dt>
						<dd class="font-mono">{algorithm.complexity.average}</dd>
					</div>
					<div class="flex justify-between border-b pb-2">
						<dt class="text-gray-500">Worst Case</dt>
						<dd class="font-mono">{algorithm.complexity.worst}</dd>
					</div>
				</dl>
			</div>

			<div class="bg-surface-100 flex h-48 items-center justify-center rounded-xl md:h-auto">
				<span class="italic text-gray-500">Mini-Visualizer Placeholder</span>
			</div>
		</div>

		<h2>How it works</h2>
		<p>
			Detailed conceptual explanation of {algorithm.name} would go here. Using the event stream logs,
			we can generate step-by-step text walkthroughs dynamically.
		</p>

		<h3>Pseudocode</h3>
		<pre class="bg-surface-900 overflow-x-auto rounded-lg p-4 text-gray-100">
// Placeholder pseudocode
function sort(array) &#123;
  // Implementation details...
&#125;</pre>
	</article>
{:else}
	<div class="py-20 text-center">
		<h1 class="text-2xl font-bold">Algorithm not found</h1>
		<a href={resolve('/library')} class="text-primary mt-4 inline-block hover:underline"
			>Return to library</a
		>
	</div>
{/if}
