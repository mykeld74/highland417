<script lang="ts">
	import logo from '$img/logo.svg';
	import { consultationModalOpen } from '$lib/stores/consultationModal';
</script>

<nav class="nav">
	<div class="navContainer">
		<a href="/">
			<img src={logo} alt="Highland 417" class="navLogo" />
		</a>
		<div class="navLinks">
			<a href="/services">Services</a>
			<a href="/approach">Approach</a>
			<a href="/contact">Contact</a>
			<button type="button" class="navButton" onclick={() => consultationModalOpen.set(true)}>Schedule a Consultation</button>
		</div>
	</div>
</nav>
