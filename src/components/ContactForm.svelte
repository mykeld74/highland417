<script lang="ts">
	import { fade } from 'svelte/transition';
	import IMask from 'imask';
	const maskConfig = { mask: '(000) 000-0000' };
	interface ApiResponse {
		message?: string;
		error?: string;
	}

	let { action = '/api/contact', onSuccess } = $props<{ action?: string; onSuccess?: () => void }>();

	let submitting = $state(false);
	let result: { type: 'success' | 'error'; message: string } | null = $state(null);

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

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault(); // Prevent default form submission and page redirect

		if (submitting) return; // Prevent double submission

		submitting = true;
		result = null;

		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch(action, {
				method: 'POST',
				body: formData
			});

			const data: ApiResponse = await response.json();

			if (response.ok) {
				result = { type: 'success', message: data.message || 'Message sent successfully!' };
				form.reset();
				onSuccess?.();
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
</style>
