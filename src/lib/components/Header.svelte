<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	const navItems = [
		['Visualizer', '/visualizer'],
		['Compare', '/compare'],
		['Library', '/library'],
		['About', '/about']
	] as const;
</script>

<header
	class="border-surface-200 bg-surface-50/80 sticky top-0 z-50 w-full border-b backdrop-blur-md"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<div class="flex items-center gap-2">
			<a href={resolve('/')} class="text-xl font-bold tracking-tight">
				<span class="text-primary">Sort</span>Pedia
			</a>
		</div>

		<nav class="hidden gap-6 md:flex">
			{#each navItems as [label, href] (href)}
				<a
					href={resolve(href)}
					class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname.startsWith(
						href
					)
						? 'text-primary'
						: 'text-surface-800'}"
				>
					{label}
				</a>
			{/each}
		</nav>

		<div class="md:hidden">
			<!-- Mobile menu placeholder -->
			<span class="text-surface-800 text-xs">Menu</span>
		</div>
	</div>
</header>
