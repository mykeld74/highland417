<script lang="ts">
	import { fade } from 'svelte/transition';
	import IMask from 'imask';
	const maskConfig = { mask: '(000) 000-0000' };
	interface ApiResponse {
		message?: string;
		error?: string;
		preview?: boolean;
		subject?: string;
		text?: string;
		html?: string;
	}

	let { action = '/api/contact' } = $props<{ action?: string }>();

	let submitting = $state(false);
	let result: { type: 'success' | 'error'; message: string } | null = $state(null);
	let previewData: { subject: string; text: string; html: string } | null = $state(null);

	// Auto-dismiss success messages after 4 seconds
	$effect(() => {
		if (result?.type === 'success') {
			const timeout = setTimeout(() => {
				result = null;
			}, 4000);

			return () => {
				clearTimeout(timeout);
			};
		}
	});

	// Close preview modal on Escape
	$effect(() => {
		if (!previewData) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') previewData = null;
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault(); // Prevent default form submission and page redirect

		if (submitting) return; // Prevent double submission

		submitting = true;
		result = null;
		previewData = null;

		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch(action, {
				method: 'POST',
				body: formData
			});

			const data: ApiResponse = await response.json();

			if (response.ok) {
				if (data.preview) {
					previewData = {
						subject: data.subject ?? '',
						text: data.text ?? '',
						html: data.html ?? ''
					};
					form.reset();
				} else {
					result = { type: 'success', message: data.message || 'Message sent successfully!' };
					form.reset();
				}
			} else {
				result = {
					type: 'error',
					message: data.error || 'Failed to send message. Please try again.'
				};
			}
		} catch (error) {
			result = { type: 'error', message: 'An error occurred. Please try again later.' };
		} finally {
			submitting = false;
		}
	}
</script>

<form method="POST" {action} onsubmit={handleSubmit} class="contactForm">
	<div class="formGroup">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" required />
	</div>

	<div class="formGroup">
		<label for="email">Email</label>
		<input type="email" id="email" name="email" required />
	</div>

	<div class="formGroup">
		<label for="phone">Phone <span class="optional">(optional)</span></label>
		<input type="tel" id="phone" name="phone" use:IMask={maskConfig} />
	</div>

	<div class="formGroup">
		<label for="message">Message</label>
		<textarea id="message" name="message" rows="6" required></textarea>
	</div>

	{#if result}
		<div
			class="formMessage"
			class:success={result.type === 'success'}
			class:error={result.type === 'error'}
			transition:fade={{ duration: 300 }}
		>
			{result.message}
		</div>
	{/if}

	<button type="submit" disabled={submitting} class="submitButton">
		{submitting ? 'Sending...' : 'Send Message'}
	</button>
</form>

{#if previewData}
	<div
		class="modalOverlay"
		role="button"
		tabindex="-1"
		aria-label="Close modal"
		onclick={() => (previewData = null)}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), (previewData = null))}
		transition:fade={{ duration: 200 }}
	>
		<div
			class="modalContent"
			role="dialog"
			aria-modal="true"
			aria-labelledby="previewTitle"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="modalHeader">
				<h2 id="previewTitle">Email preview (Resend not configured)</h2>
				<button type="button" class="closeButton" onclick={() => (previewData = null)} aria-label="Close">
					×
				</button>
			</div>
			<p class="previewSubject"><strong>Subject:</strong> {previewData.subject}</p>
			<div class="previewBody">
				{@html previewData.html}
			</div>
			<button type="button" class="modalCloseBtn" onclick={() => (previewData = null)}>Close</button>
		</div>
	</div>
{/if}

<style>
	.contactForm {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 600px;
		width: 100%;
	}

	.formGroup {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		color: var(--color-text);
		font-weight: 400;
		letter-spacing: 0.02em;
	}

	.optional {
		font-size: 0.85rem;
		color: rgba(237, 209, 174, 0.6);
		font-weight: 300;
	}

	input,
	textarea {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		padding: 0.75rem 1rem;
		background: rgba(237, 209, 174, 0.05);
		border: 1px solid rgba(237, 209, 174, 0.2);
		border-radius: 4px;
		color: var(--color-text);
		transition: all 0.3s ease;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-accent);
		background: rgba(237, 209, 174, 0.08);
		box-shadow: 0 0 10px rgba(188, 105, 21, 0.2);
	}

	input::placeholder,
	textarea::placeholder {
		color: rgba(237, 209, 174, 0.4);
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	.submitButton {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		letter-spacing: 0.1em;
		color: var(--color-text);
		background: transparent;
		border: 1px solid var(--color-text);
		padding: 0.75rem 2rem;
		cursor: pointer;
		transition: all 0.3s ease;
		align-self: flex-start;
	}

	.submitButton:hover:not(:disabled) {
		background: rgba(201, 166, 107, 0.1);
		box-shadow: 0 0 15px rgba(201, 166, 107, 0.2);
	}

	.submitButton:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.formMessage {
		padding: 1rem;
		border-radius: 4px;
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
	}

	.formMessage.success {
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.3);
		color: #86efac;
	}

	.formMessage.error {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #fca5a5;
	}

	/* Email preview modal (when Resend not configured) */
	.modalOverlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modalContent {
		background: #0a0908;
		border: 1px solid rgba(237, 209, 174, 0.2);
		border-radius: 8px;
		max-width: 640px;
		width: 100%;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
	}

	.modalHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid rgba(237, 209, 174, 0.15);
	}

	.modalHeader h2 {
		margin: 0;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.closeButton {
		background: none;
		border: none;
		color: rgba(237, 209, 174, 0.7);
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		padding: 0.25rem;
	}

	.closeButton:hover {
		color: var(--color-text);
	}

	.previewSubject {
		margin: 0;
		padding: 1rem 1.25rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		color: var(--color-text);
		border-bottom: 1px solid rgba(237, 209, 174, 0.1);
	}

	.previewBody {
		flex: 1;
		overflow: auto;
		padding: 1rem 1.25rem;
	}

	.previewBody :global(table) {
		max-width: 100%;
	}

	.modalCloseBtn {
		margin: 1rem 1.25rem 1.25rem;
		align-self: flex-start;
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		color: var(--color-text);
		background: transparent;
		border: 1px solid var(--color-text);
		padding: 0.5rem 1.25rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.modalCloseBtn:hover {
		background: rgba(201, 166, 107, 0.1);
	}
</style>
