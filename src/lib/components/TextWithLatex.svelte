<script lang="ts">
	import Latex from '$lib/components/Latex.svelte';

	let { text = '' }: { text?: string } = $props();

	// Split the text by the '$' delimiter.
	// Even-indexed segments are plain text.
	// Odd-indexed segments are LaTeX source.
	let segments = $derived(text.split('$'));
</script>

{#each segments as segment, i (i)}
	{#if i % 2 === 0}
		{segment}
	{:else if segment}
		<Latex src={segment} />
	{/if}
{/each}
