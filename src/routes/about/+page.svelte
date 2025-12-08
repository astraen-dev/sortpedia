<div class="prose prose-slate mx-auto max-w-3xl">
	<h1>About SortPedia</h1>
	<p class="lead">
		SortPedia is an open-source educational project designed to make computer science concepts
		accessible through interactive visualization.
	</p>

	<h2>Our Mission</h2>
	<p>
		Sorting algorithms are a fundamental building block of computer science education. However,
		static diagrams often fail to convey the dynamic nature of how these algorithms manipulate
		memory.
	</p>
	<p>Our goal is to provide a "Single Source of Truth" for sorting knowledge, combining:</p>
	<ul>
		<li>Accurate, step-by-step visualizations</li>
		<li>Performance metrics based on real browser execution</li>
		<li>Clear, accessible explanations</li>
	</ul>

	<h2>Technical Approach</h2>
	<p>
		This application is built with <strong>SvelteKit</strong> and utilizes a worker-based event stream
		architecture. Algorithms run off the main thread, emitting events (comparisons, swaps, writes) that
		drive the UI animations. This ensures the interface remains responsive even during computationally
		expensive operations.
	</p>
</div>
