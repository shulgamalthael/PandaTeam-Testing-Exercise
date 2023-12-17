<template>
	<div class="loading">
		<div class="loading-indicator"></div>
	</div>
</template>

<script setup>

</script>

<style scoped>
	.loading {
		position: relative;
		height: 50px;
		width: 50px;
		animation: spinn 1s linear infinite;
	}

	@keyframes spinn {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.loading-indicator {
		height: 100%;
		width: 100%;
		border-radius: 50%;
		border: 2px dashed var(--primary-color);
	}
</style>