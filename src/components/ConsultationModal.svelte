<script lang="ts">
	import { fade } from 'svelte/transition';
	import { consultationModalOpen } from '$lib/stores/consultationModal';
	import ContactForm from '$components/ContactForm.svelte';

	$effect(() => {
		if (!$consultationModalOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') consultationModalOpen.set(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	function close() {
		consultationModalOpen.set(false);
	}
</script>

{#if $consultationModalOpen}
	<div
		class="overlay"
		role="button"
		tabindex="-1"
		aria-label="Close modal"
		onclick={close}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), close())}
		transition:fade={{ duration: 200 }}
	>
		<div
			class="dialog"
			role="dialog"
			aria-modal="true"
			aria-labelledby="consultationTitle"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="header">
				<h2 id="consultationTitle">Schedule a Consultation</h2>
				<button type="button" class="closeBtn" onclick={close} aria-label="Close">×</button>
			</div>
			<div class="body">
				<ContactForm onSuccess={() => setTimeout(close, 1500)} />
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.dialog {
		background: #0a0908;
		border: 1px solid rgba(237, 209, 174, 0.2);
		border-radius: 8px;
		max-width: 560px;
		width: 100%;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid rgba(237, 209, 174, 0.15);
	}

	.header h2 {
		margin: 0;
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 1.35rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.closeBtn {
		background: none;
		border: none;
		color: rgba(237, 209, 174, 0.7);
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		padding: 0.25rem;
	}

	.closeBtn:hover {
		color: var(--color-text);
	}

	.body {
		flex: 1;
		overflow: auto;
		padding: 1.5rem;
	}
</style>
