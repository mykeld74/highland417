<script lang="ts">
	import { onMount } from 'svelte';

	// Load sprite content from external file in static folder
	let spriteContent = $state<string>('');

	onMount(async () => {
		try {
			const response = await fetch('/icons-sprite.svg');
			if (response.ok) {
				spriteContent = await response.text();
			}
		} catch (error) {
			console.error('Failed to load icon sprite:', error);
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- Safe to use {@html} here as we're loading our own trusted SVG sprite file -->
{@html spriteContent}