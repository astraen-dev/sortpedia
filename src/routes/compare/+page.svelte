<div class="flex flex-col gap-8">
	<div class="text-center">
		<h1 class="text-3xl font-bold">Algorithm Race</h1>
		<p class="text-surface-800 mt-2">Compare performance side-by-side</p>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- Left Competitor -->
		<div
			class="bg-surface-50 border-surface-200 flex h-96 flex-col rounded-xl border p-4 shadow-sm"
		>
			<div class="mb-4 flex justify-between border-b pb-2">
				<span class="font-bold">Competitor A</span>
				<span class="text-sm text-gray-500">Bubble Sort</span>
			</div>
			<div class="bg-surface-100 flex-1 rounded-md flex items-center justify-center">
				<span class="text-surface-400">Visualization A</span>
			</div>
		</div>

		<!-- Right Competitor -->
		<div
			class="bg-surface-50 border-surface-200 flex h-96 flex-col rounded-xl border p-4 shadow-sm"
		>
			<div class="mb-4 flex justify-between border-b pb-2">
				<span class="font-bold">Competitor B</span>
				<span class="text-sm text-gray-500">Quick Sort</span>
			</div>
			<div class="bg-surface-100 flex-1 rounded-md flex items-center justify-center">
				<span class="text-surface-400">Visualization B</span>
			</div>
		</div>
	</div>

	<div class="bg-surface-50 border-surface-200 mx-auto w-full max-w-2xl rounded-xl border p-6">
		<h3 class="mb-4 font-bold">Live Statistics</h3>
		<div class="grid grid-cols-3 gap-4 text-center text-sm">
			<div class="font-medium text-gray-500">Metric</div>
			<div class="font-bold text-primary">Competitor A</div>
			<div class="font-bold text-accent">Competitor B</div>

			<div>Comparisons</div>
			<div>0</div>
			<div>0</div>

			<div>Swaps</div>
			<div>0</div>
			<div>0</div>

			<div>Time (ms)</div>
			<div>0</div>
			<div>0</div>
		</div>
	</div>
</div>
