<script lang="ts">
	import { page } from '$app/state';
	import { getAlgorithm } from '$lib/data/algorithms';
	import { resolve } from '$app/paths';
	import { VisualizerEngine } from '$lib/stores/visualizer.svelte';
	import VisualizerDisplay from '$lib/components/visualizer/VisualizerDisplay.svelte';
	import { untrack } from 'svelte';
	import Latex from '$lib/components/Latex.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import TextWithLatex from '$lib/components/TextWithLatex.svelte';

	let algoId = $derived(page.params.id ?? '');
	let algorithm = $derived(getAlgorithm(algoId));
	const demoEngine = new VisualizerEngine(20);

	// Reset demo when algorithm changes
	$effect(() => {
		if (algorithm) {
			// Wrap internal state reads in untrack() to prevent infinite loops.
			// This tells Svelte: "Execute this, but don't track any state read inside as a dependency."
			untrack(() => {
				demoEngine.resetPlayback();
				demoEngine.generateArray(20);
			});
		}
	});

	function runDemo() {
		if (algorithm) {
			demoEngine.speed = 6;
			demoEngine.runAlgorithm(algorithm.id);
		}
	}
</script>

<svelte:head>
	<title>{algorithm ? algorithm.name : 'Algorithm Not Found'} - SortPedia</title>
</svelte:head>

{#if algorithm}
	<article class="mx-auto max-w-4xl pb-20">
		<!-- Header Section -->
		<div class="border-surface-200 mb-10 border-b pb-8">
			<a
				href={resolve('/library')}
				class="text-primary mb-6 inline-flex items-center text-sm font-medium hover:underline"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="mr-1"
				>
					<path d="m15 18-6-6 6-6" />
				</svg>
				Back to Library
			</a>

			<div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
				<div>
					<h1 class="text-surface-900 text-4xl font-extrabold tracking-tight sm:text-5xl">
						{algorithm.name}
					</h1>
					<p class="text-surface-800 mt-4 text-xl leading-relaxed">
						{algorithm.details.summary}
					</p>
				</div>
				<div class="flex flex-wrap gap-2 md:justify-end">
					<span class="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-bold">
						{algorithm.category} Sort
					</span>
					{#if algorithm.stable}
						<span class="bg-green-100 text-green-800 rounded-full px-4 py-1.5 text-sm font-bold">
							Stable
						</span>
					{:else}
						<span class="bg-red-100 text-red-800 rounded-full px-4 py-1.5 text-sm font-bold">
							Unstable
						</span>
					{/if}
				</div>
			</div>
		</div>

		<div class="grid gap-12 lg:grid-cols-3">
			<!-- Main Content Column -->
			<div class="space-y-12 lg:col-span-2">
				<!-- How it works -->
				<section>
					<h2 class="text-surface-900 mb-6 text-2xl font-bold">How it Works</h2>
					<ul class="space-y-4">
						{#each algorithm.details.steps as step (step)}
							<li class="flex gap-4">
								<div class="bg-surface-200 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"></div>
								<p class="text-surface-800 leading-relaxed"><TextWithLatex text={step} /></p>
							</li>
						{/each}
					</ul>
				</section>

				<!-- Complexity Analysis -->
				<section class="bg-surface-50 border-surface-200 rounded-xl border p-6">
					<h2 class="text-surface-900 mb-6 text-xl font-bold">Complexity Analysis</h2>
					<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
						<div class="border-surface-100 rounded-lg border bg-white p-4 shadow-sm">
							<dt class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
								Best Case
							</dt>
							<dd class="mt-1 font-mono text-lg font-bold text-green-600">
								<Latex src={algorithm.complexity.best} />
							</dd>
						</div>
						<div class="border-surface-100 rounded-lg border bg-white p-4 shadow-sm">
							<dt class="text-xs font-semibold tracking-wider text-gray-500 uppercase">Average</dt>
							<dd class="mt-1 font-mono text-lg font-bold text-yellow-600">
								<Latex src={algorithm.complexity.average} />
							</dd>
						</div>
						<div class="border-surface-100 rounded-lg border bg-white p-4 shadow-sm">
							<dt class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
								Worst Case
							</dt>
							<dd class="mt-1 font-mono text-lg font-bold text-red-600">
								<Latex src={algorithm.complexity.worst} />
							</dd>
						</div>
						<div class="border-surface-100 rounded-lg border bg-white p-4 shadow-sm">
							<dt class="text-xs font-semibold tracking-wider text-gray-500 uppercase">Space</dt>
							<dd class="text-primary mt-1 font-mono text-lg font-bold">
								<Latex src={algorithm.complexity.space} />
							</dd>
						</div>
					</div>
				</section>

				<!-- Pros & Cons -->
				<section class="grid gap-6 sm:grid-cols-2">
					<div>
						<h3 class="mb-4 flex items-center gap-2 font-bold text-green-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg
							>
							Advantages
						</h3>
						<ul class="text-surface-800 space-y-3 text-sm">
							{#each algorithm.details.advantages as item (item)}
								<li class="border-green-200 border-l-2 pl-2">{item}</li>
							{/each}
						</ul>
					</div>
					<div>
						<h3 class="mb-4 flex items-center gap-2 font-bold text-red-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line
									x1="9"
									y1="9"
									x2="15"
									y2="15"
								/></svg
							>
							Disadvantages
						</h3>
						<ul class="text-surface-800 space-y-3 text-sm">
							{#each algorithm.details.disadvantages as item (item)}
								<li class="border-red-200 border-l-2 pl-2">{item}</li>
							{/each}
						</ul>
					</div>
				</section>

				<!-- Implementation -->
				<section>
					<h2 class="text-surface-900 mb-4 text-2xl font-bold">Implementation</h2>
					<CodeBlock
						code={algorithm.details.pseudocode}
						language="JavaScript"
						filename={`${algorithm.id}.js`}
					/>
				</section>
			</div>

			<!-- Sidebar / Mini Visualizer -->
			<div class="lg:col-span-1">
				<div class="sticky top-24 space-y-6">
					<div class="bg-surface-50 border-surface-200 overflow-hidden rounded-xl border shadow-sm">
						<div class="border-surface-200 border-b bg-white p-4">
							<h3 class="font-bold">Live Demo</h3>
							<p class="text-xs text-gray-500">20 elements • Slow Motion</p>
						</div>

						<div class="bg-surface-100 h-48 p-4">
							<VisualizerDisplay engine={demoEngine} />
						</div>

						<div class="flex gap-2 bg-white p-4">
							{#if demoEngine.isPlaying}
								<button
									onclick={() => demoEngine.pause()}
									class="bg-surface-200 hover:bg-surface-300 flex-1 rounded py-2 text-sm font-medium transition-colors"
								>
									Stop
								</button>
							{:else}
								<button
									onclick={runDemo}
									class="bg-primary hover:bg-primary-dark flex-1 rounded py-2 text-sm font-medium text-white transition-colors"
								>
									Start
								</button>
								<button
									onclick={() =>
										demoEngine.setArray(
											Array.from({ length: 20 }, () => Math.floor(Math.random() * 95) + 5)
										)}
									class="bg-surface-100 hover:bg-surface-200 border-surface-200 rounded border px-3"
									aria-label="Shuffle"
								>
									⟳
								</button>
							{/if}
						</div>
					</div>

					{#if algorithm.details.funFacts}
						<div class="bg-primary/5 border-primary/10 rounded-xl border p-6">
							<h4 class="text-primary mb-2 font-bold">Did you know?</h4>
							<p class="text-surface-800 text-sm">
								<!-- eslint-disable-next-line svelte/no-at-html-tags-->
								{@html algorithm.details.funFacts}
							</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</article>
{:else}
	<div class="flex h-[50vh] flex-col items-center justify-center text-center">
		<h1 class="text-3xl font-bold">Algorithm not found</h1>
		<a href={resolve('/library')} class="text-primary mt-4 hover:underline">Return to library</a>
	</div>
{/if}
