<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import Icon from '$components/Icon.svelte';
</script>

<Hero />

<section class="midSection">
	<h2 class="midHeading">Built for organizations that rely on technology to operate.</h2>
</section>

<section class="features">
	<div class="featureCard">
		<div class="featureCardHeader">
			<Icon name="shield2" size={48} />
			<h3 class="featureTitle">Secure Systems</h3>
		</div>
		<p class="featureDescription">
			Enterprise-grade security measures protect your data and infrastructure from threats.
		</p>
	</div>

	<div class="featureCard">
		<div class="featureCardHeader">
			<Icon name="networking1" size={48} />
			<h3 class="featureTitle">Reliable Infrastructure</h3>
		</div>
		<p class="featureDescription">
			Robust systems designed for uptime and performance, built to scale with your needs.
		</p>
	</div>

	<div class="featureCard">
		<div class="featureCardHeader">
			<Icon name="monitoring1" size={48} />
			<h3 class="featureTitle">Ongoing Stewardship</h3>
		</div>
		<p class="featureDescription">
			Continuous monitoring, maintenance, and optimization to keep your systems running smoothly.
		</p>
	</div>
</section>

<section class="bottomSection">
	<ul class="checklist">
		<li><span class="check">✓</span> No consumer tech support model</li>
		<li><span class="check">✓</span> No one-size-fits-all stacks</li>
		<li><span class="check">✓</span> No unnecessary complexity</li>
	</ul>

	<p class="tagline">Thoughtful design. Clear documentation. Stable systems.</p>

	<button class="cta primaryCTA">Start a Conversation</button>
</section>

<style>
	/* Mid Section */
	.midSection {
		padding: 4rem 2rem;
		text-align: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.midHeading {
		font-size: 2.25rem;
		font-weight: 300;
		margin: 0;
		color: var(--color-text);
		letter-spacing: 0.03em;
	}

	/* Features */
	.features {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
		padding: 4rem 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.featureCard {
		background: rgba(10, 9, 8, 0.6);
		border: 1px solid rgba(201, 166, 107, 0.2);
		padding: 3rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		transition: all 0.3s ease;
		color: var(--color-card-title);
	}

	.featureCard:hover {
		border-color: rgba(201, 166, 107, 0.4);
		box-shadow: 0 0 30px rgba(201, 166, 107, 0.1);
	}

	.featureCardHeader {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.featureTitle {
		font-size: clamp(1.25rem, 2vw, 1.65rem);
		font-weight: 400;
		margin: 0;
		color: var(--color-card-title);
		letter-spacing: 0.02em;
	}

	.featureDescription {
		font-size: 1.1rem;
		line-height: 1.6;
		font-weight: 300;
		margin: 0;
		color: var(--color-text);
		opacity: 0.85;
		letter-spacing: 0.01em;
	}

	/* Bottom Section */
	.bottomSection {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 6rem 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.checklist {
		list-style: none;
		padding: 0;
		margin: 0 0 3rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.checklist li {
		font-size: clamp(1.1rem, 2vw, 1.5rem);
		font-weight: 300;
		color: var(--color-text);
		letter-spacing: 0.02em;
	}

	.check {
		margin-right: 1rem;
		font-weight: 400;
	}

	.tagline {
		font-size: 1.75rem;
		font-weight: 300;
		color: var(--color-text);
		margin: 0 0 3rem 0;
		text-align: center;
		letter-spacing: 0.03em;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.features {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.midHeading {
			font-size: 1.75rem;
		}
	}
</style>
