<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$components/Nav.svelte';
	import ConsultationModal from '$components/ConsultationModal.svelte';
	import '$css/reset.css';
	import '$css/styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Nav />

<ConsultationModal />

<main class="grainBg">
	{@render children()}
</main>

<style>
</style>
