<section class="pageSection">
	<div class="pageContainer">
		<h1 class="pageTitle">Business I.T. Systems & Security</h1>
		<p class="pageDescription">
			Technology that works quietly, securely, and reliably—so your team can focus on the business.
		</p>

		<div class="servicesGrid">
			<div class="serviceCard">
				<h2 class="serviceTitle">Secure Systems</h2>
				<p class="serviceIntro">
					Identity, access, and data protection designed for real business environments.
				</p>
				<ul class="serviceList">
					<li>Identity and access management</li>
					<li>Multi-factor authentication and conditional access</li>
					<li>Endpoint protection and security hardening</li>
					<li>Backup strategy and recovery planning</li>
					<li>Security reviews and risk reduction</li>
				</ul>
			</div>

			<div class="serviceCard">
				<h2 class="serviceTitle">Reliable Infrastructure</h2>
				<p class="serviceIntro">
					Stable systems built to stay up, stay fast, and stay out of the way.
				</p>
				<ul class="serviceList">
					<li>Network design and optimization</li>
					<li>Server and virtualization environments</li>
					<li>Cloud and hybrid infrastructure</li>
					<li>Email and collaboration platforms</li>
					<li>Monitoring and performance tuning</li>
				</ul>
			</div>

			<div class="serviceCard">
				<h2 class="serviceTitle">Ongoing Stewardship</h2>
				<p class="serviceIntro">Long-term care, not break/fix chaos.</p>
				<ul class="serviceList">
					<li>Proactive monitoring and maintenance</li>
					<li>Patch management and lifecycle planning</li>
					<li>Documentation and system clarity</li>
					<li>Vendor coordination and technical guidance</li>
					<li>Calm, thoughtful support when it's needed</li>
				</ul>
			</div>

			<div class="serviceCard">
				<h2 class="serviceTitle">Projects & Transitions</h2>
				<p class="serviceIntro">When change is required, it's done carefully and correctly.</p>
				<ul class="serviceList">
					<li>New environment builds</li>
					<li>Infrastructure upgrades and migrations</li>
					<li>Security improvements and modernization</li>
					<li>Office moves and system redesigns</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	.pageDescription {
		margin-bottom: 4rem;
	}

	.servicesGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 3rem;
		margin-top: 3rem;
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}

	.serviceCard {
		background: var(--color-surface);
		padding: 2.5rem;
		border-radius: 8px;
		border: 1px solid var(--color-border, #e5e7eb);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.serviceTitle {
		font-family: 'Playfair Display', serif;
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: 1rem;
		text-decoration: underline;

		text-underline-offset: 3px;
	}

	.serviceIntro {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-text-light);
		margin-bottom: 1.5rem;
		font-style: italic;
	}

	.serviceList {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.serviceList li {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
		color: var(--color-text);
		line-height: 1.6;
	}

	.serviceList li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--color-accent, var(--color-primary));
		font-weight: bold;
	}
</style>
