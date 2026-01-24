<script lang="ts">
	import logo from '$img/logo.svg';
	import Icon from '$components/Icon.svelte';
</script>

<section class="hero">
	<div class="heroContent">
		<div class="heroText">
			<h1 class="heroTitle">Business I.T. Systems & Security!</h1>
			<h2 class="heroSubtitle">I.T. You Don't Have to Think About</h2>
			<p class="heroDescription">
				We design, implement, and maintain technology infrastructure for organizations that rely on
				technology to operate. No consumer tech support model. No one-size-fits-all stacks. No
				unnecessary complexity.
			</p>
			<button class="heroButton">Schedule a Consultation</button>
		</div>
		<div class="heroImage">
			<img src={logo} alt="Highland 417" class="heroLogo" />
		</div>
	</div>
</section>

<section class="midSection">
	<h2 class="midHeading">Built for organizations that rely on technology to operate.</h2>
</section>

<section class="features">
	<div class="featureCard">
		<Icon name="shield2" size={48} />
		<h3 class="featureTitle">Secure Systems</h3>
		<p class="featureDescription">
			Enterprise-grade security measures protect your data and infrastructure from threats.
		</p>
	</div>

	<div class="featureCard">
		<Icon name="networking1" size={48} />
		<h3 class="featureTitle">Reliable Infrastructure</h3>
		<p class="featureDescription">
			Robust systems designed for uptime and performance, built to scale with your needs.
		</p>
	</div>

	<div class="featureCard">
		<Icon name="monitoring1" size={48} />
		<h3 class="featureTitle">Ongoing Stewardship</h3>
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

	<button class="cta">Start a Conversation</button>
</section>

<style>
	/* Hero Section */
	.hero {
		padding: 4rem 2rem;
		margin: 0 auto;
		background: url('../images/circuits.svg') no-repeat 120% 50% / 60%;
	}

	@media (max-width: 1025px) {
		.hero {
			background: none;
			padding: 0;
		}
		.heroText {
			padding: 2rem 2rem 0;
		}
		.heroImage {
			background: url('../images/circuits.svg') no-repeat center center / 150%;
			img {
				width: 70%;
				margin: 0 auto;
			}
		}
	}

	.heroContent {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		max-width: 1400px;
		margin: 0 auto;
		align-items: center;
	}

	.heroText {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.heroTitle {
		font-size: 3.5rem;
		font-weight: 300;
		line-height: 1.2;
		margin: 0;
		color: var(--color-accent);
		letter-spacing: 0.02em;
	}

	.heroSubtitle {
		font-size: 2rem;
		font-weight: 300;
		margin: 0;
		color: var(--color-text);
		letter-spacing: 0.03em;
		opacity: 0.9;
	}

	.heroDescription {
		font-size: 1.25rem;
		line-height: 1.6;
		font-weight: 300;
		margin: 0;
		color: var(--color-text);
		opacity: 0.85;
		letter-spacing: 0.01em;
	}

	.heroButton {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: 0.15em;
		color: var(--color-text);
		background: transparent;
		border: 1px solid var(--color-text);
		padding: 1rem 2.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		align-self: flex-start;
	}

	.heroButton:hover {
		background: rgba(201, 166, 107, 0.1);
		box-shadow: 0 0 20px rgba(201, 166, 107, 0.15);
	}

	.heroImage {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.heroLogo {
		width: 100%;
		max-width: 500px;
		height: auto;
	}

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
	}

	.featureCard:hover {
		border-color: rgba(201, 166, 107, 0.4);
		box-shadow: 0 0 30px rgba(201, 166, 107, 0.1);
	}

	.featureTitle {
		font-size: 1.75rem;
		font-weight: 400;
		margin: 0;
		color: var(--color-accent);
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
		font-size: 1.5rem;
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

	.cta {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: 0.15em;
		text-transform: none;
		color: var(--color-text);
		background: transparent;
		border: 1px solid var(--color-text);
		padding: 1rem 2.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.cta:hover {
		background: rgba(201, 166, 107, 0.1);
		box-shadow: 0 0 20px rgba(201, 166, 107, 0.15);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.heroContent {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.heroLogo {
			max-width: 400px;
		}

		.features {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.heroTitle {
			font-size: 2.5rem;
		}

		.heroSubtitle {
			font-size: 1.5rem;
		}

		.midHeading {
			font-size: 1.75rem;
		}
	}
</style>
