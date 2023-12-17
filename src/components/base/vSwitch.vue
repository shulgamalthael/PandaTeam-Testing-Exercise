<template>
	<div class="switch">
		<slot name="before"></slot>
		<div @click="emit('change-value')" class="switch-track">
			<div class="switch-ball" :class="{'switch-ball__active': !!props.value}"></div>
		</div>
		<slot name="after"></slot>
	</div>
</template>

<script setup>
	import { defineProps, defineEmits } from "vue";

	const props = defineProps({
		value: Boolean,
	});

	const emit = defineEmits(['change-value']);
</script>

<style scoped>
	.switch {
		display: flex;
		align-items: center;
	}

	.switch-track {
		box-sizing: content-box;
		overflow: hidden;
		position: relative;
		height: 25px;
		width: 50px;
		margin: 0 5px;
		border-radius: 25px;
		background-color: var(--secondary-color);
		border: 1px solid var(--secondary-color);
	}

	.switch-ball {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		transition: 0.25s;
		border-radius: 25px;
		border: 1px solid var(--primary-color);
		background-color: var(--secondary-color);
	}

	.switch-ball__active {
		left: 25px;
	}
</style>