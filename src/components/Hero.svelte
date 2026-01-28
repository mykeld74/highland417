<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';
	import logo from '$img/logo.svg';
	import circuitsSvg from '$img/circuits.svg?raw';
	import { consultationModalOpen } from '$lib/stores/consultationModal';

	let ctx: gsap.Context | null = null;
	/** Only one circuits SVG is in the DOM to avoid duplicate IDs; desktop vs mobile by viewport. */
	let isWideViewport = $state(true);

	onMount(async () => {
		const mq = window.matchMedia('(min-width: 1026px)');
		isWideViewport = mq.matches;
		mq.addEventListener('change', (e) => {
			isWideViewport = e.matches;
		});
		await tick();

		const hero = document.querySelector('.hero');
		if (!hero) return;

		ctx = gsap.context(() => {
			const svgs = document.querySelectorAll<SVGSVGElement>(
				'.heroCircuits svg, .heroCircuitsMobile svg'
			);
			svgs.forEach((svg) => {
				// Dot glow: pulse feGaussianBlur stdDeviation (18 <-> 28)
				for (let i = 1; i <= 6; i++) {
					const blur = svg.querySelector(`#glowBlur${i}`);
					if (blur) {
						gsap.fromTo(
							blur,
							{ attr: { stdDeviation: 18 } },
							{
								attr: { stdDeviation: 28 },
								duration: 2 + Math.random() * 0.8,
								yoyo: true,
								repeat: -1,
								ease: 'sine.inOut',
								delay: (i - 1) * 0.45
							}
						);
					}
				}

				// Data packets: only paths with bends (multi-segment); skip straight dot-to-dot lines
				const bentPathIndices = [
					1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 23, 24, 25, 26, 27, 28, 29, 30, 31
				];
				const pathDurs = [
					4.5, 3.8, 5, 4.2, 3.5, 4.8, 4, 3.2, 5.2, 3.8, 4.5, 4, 3.6, 4.1, 4.7, 3.4, 3.9, 4.3, 3.7,
					4.0, 4.2, 3.8, 5.0, 4.4, 3.5, 4.1, 4.6, 3.9, 4.8, 5.1, 3.6, 3.4, 4.0
				].map((d) => d * 0.6);
				const repeatDelays = [
					1.2, 1.8, 1, 1.5, 2, 1, 1.3, 1.6, 0.8, 1.4, 1.1, 1.7, 1.0, 1.2, 1.5, 1.8, 1.1, 1.4, 1.6,
					0.9, 1.3, 1.5, 1.0, 1.7, 1.2, 1.4, 1.1, 1.6, 1.3, 1.8, 1.0, 1.5, 1.2
				];
				for (const i of bentPathIndices) {
					const path = svg.querySelector<SVGPathElement>(`#pathCircuit${i}`);
					const packet = svg.querySelector<SVGGElement>(`#packet${i}`);
					if (!path || !packet) continue;

					const totalLen = path.getTotalLength();
					const proxy = { progress: 0 };
					const duration = pathDurs[i - 1];
					const repeatDelay = repeatDelays[i - 1];

					gsap.to(proxy, {
						progress: 1,
						duration,
						repeat: -1,
						repeatDelay,
						ease: 'none',
						delay: i * 0.4,
						onUpdate: () => {
							const L = proxy.progress * totalLen;
							const p = path.getPointAtLength(L);
							const step = 4;
							const L2 = Math.min(totalLen, L + step);
							const L1 = Math.max(0, L - step);
							const p2 = path.getPointAtLength(L2);
							const p1 = path.getPointAtLength(L1);
							const angleRad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
							const angle = (angleRad * 180) / Math.PI;
							gsap.set(packet, {
								x: p.x,
								y: p.y,
								rotation: angle,
								transformOrigin: 'center center',
								opacity: proxy.progress >= 0.98 ? 0 : 1
							});
						}
					});
				}
			});
		}, hero);
	});

	onDestroy(() => {
		ctx?.revert();
	});
</script>

<section class="hero">
	{#if isWideViewport}
		<div class="heroCircuits" aria-hidden="true">{@html circuitsSvg}</div>
	{/if}
	<div class="heroContent">
		<div class="heroText">
			<h1 class="heroTitle">Business I.T. Systems & Security</h1>
			<h2 class="heroSubtitle">I.T. You Don't Have to Think About</h2>
			<p class="heroDescription">
				We design, implement, and maintain technology infrastructure for organizations that rely on
				technology to operate. No consumer tech support model. No one-size-fits-all stacks. No
				unnecessary complexity.
			</p>
			<button
				type="button"
				class="heroButton primaryCTA"
				onclick={() => consultationModalOpen.set(true)}>Schedule a Consultation</button
			>
		</div>
		<div class="heroImage">
			{#if !isWideViewport}
				<div class="heroCircuitsMobile" aria-hidden="true">{@html circuitsSvg}</div>
			{/if}
			<img src={logo} alt="Highland 417" class="heroLogo" />
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		padding: 4rem 2rem;
		margin: 0 auto;
		width: 100%;
		overflow: clip;
	}

	.heroCircuits {
		position: absolute;
		right: -20%;
		top: 50%;
		transform: translateY(-50%);
		width: 70%;
		z-index: 0;
		pointer-events: none;
		overflow: clip;
	}

	.heroCircuits :global(svg) {
		width: 100%;
		height: auto;
		display: block;
		transform: translateX(-20%);
	}

	@media (max-width: 1025px) {
		.hero {
			padding: 0;
		}
		.heroText {
			padding: 2rem 2rem 0;
		}
		.heroImage {
			position: relative;
			overflow: visible;
		}

		/* Override .grainBg * so circuits stay absolutely positioned and sized */
		.heroCircuitsMobile {
			display: block;
			position: absolute !important;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 150%;
			aspect-ratio: 3500 / 1152;
			z-index: 0;
			pointer-events: none;
		}

		.heroCircuitsMobile :global(svg) {
			width: 100%;
			height: 100%;
			display: block;
		}

		.heroImage img.heroLogo {
			position: relative;
			z-index: 10;
			width: 70%;
			margin: 0 auto;
		}
	}

	.heroContent {
		position: relative;
		z-index: 1;
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

	@media (max-width: 1024px) {
		.heroContent {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.heroLogo {
			max-width: 400px;
		}
	}

	@media (max-width: 768px) {
		.heroTitle {
			font-size: 2.5rem;
		}

		.heroSubtitle {
			font-size: 1.5rem;
		}
	}
</style>
