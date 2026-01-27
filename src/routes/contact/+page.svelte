<script lang="ts">
	import { Scott } from '$img';
	import ContactForm from '$components/ContactForm.svelte';
</script>

<section class="pageSection">
	<div class="pageContainer">
		<h1 class="pageTitle">Contact</h1>
		<div class="contactContent">
			<div class="contactInfo">
				<div class="contactImage">
					<img src={Scott} alt="Scott Simpson" />
				</div>
				<p class="contactDescription">
					Scott Simpson
					<br />
					Owner
				</p>
			</div>
			<div class="contactFormWrapper">
				<ContactForm />
			</div>
		</div>
	</div>
</section>

<style>
	.contactContent {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: 'info form';
		gap: 4rem;
		align-items: start;
		margin-top: 2rem;
		@media (max-width: 968px) {
			grid-template-columns: 1fr;
			grid-template-areas: 'form' 'info';
		}
	}

	.contactInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		grid-area: info;
	}

	.contactImage {
		width: fit-content;
		height: auto;
		object-fit: cover;
		img {
			border-radius: 10px;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		}
	}

	.contactDescription {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1.1rem, 2.5vw, 2rem);
		text-align: center;
		color: var(--color-text);
		line-height: 1.6;
	}

	.contactFormWrapper {
		display: flex;
		flex-direction: column;
		grid-area: form;
	}

	@media (max-width: 968px) {
		.contactContent {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}
</style>
