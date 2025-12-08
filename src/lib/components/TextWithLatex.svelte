<script lang="ts">
	import Latex from '$lib/components/Latex.svelte';

	let { text = '' }: { text?: string } = $props();

	// Split the text by the '$' delimiter.
	// Even-indexed segments are plain text (which may contain **bold**).
	// Odd-indexed segments are LaTeX source.
	let segments = $derived(text.split('$'));

	/**
	 * Simple parser to convert **text** to <strong>text</strong>
	 */
	function parseMarkdown(str: string) {
		return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
	}
</script>

{#each segments as segment, i (i)}
	{#if i % 2 === 0}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<span>{@html parseMarkdown(segment)}</span>
	{:else if segment}
		<Latex src={segment} />
	{/if}
{/each}
