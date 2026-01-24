<script lang="ts">
	interface Props {
		name: 'monitoring1' | 'monitoring2' | 'networking1' | 'networking2' | 'networking3' | 'shield1' | 'shield2' | 'shield3';
		size?: number | string;
		class?: string;
		width?: number | string;
		height?: number | string;
	}

	let {
		name,
		size = 24,
		class: className = '',
		width,
		height,
		...restProps
	}: Props = $props();

	const iconWidth = $derived(width ?? size);
	const iconHeight = $derived(height ?? size);
</script>

<svg
	width={iconWidth}
	height={iconHeight}
	class={className}
	{...restProps}
>
	<use href="/icons-sprite.svg#{name}" />
</svg>