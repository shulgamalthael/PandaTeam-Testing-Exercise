<template>
	<div class="wrapper">
		<div class="application">
			<v-header />
			<v-navbar />
			<div class="application-container">
				<v-main v-if="selectedPage === 'main'" />
				<v-selected v-if="selectedPage === 'selected'" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { mapState } from "@/store/storeLib";
	
	/* components */
	import vHeader from "@/components/vHeader";
	import vNavbar from "@/components/vNavbar";
	import vMain from "@/pages/main/vMain";
	import vSelected from "@/pages/vSelected";

	const { selectedPage } = mapState();
</script>

<style scoped>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-width: 100%;
		background-color: var(--secondary-color);
	}

	.application {
		margin: 0 auto;
	}

	.application-container {
		border: 1px solid var(--secondary-color);
		border-radius: 5px;
		background-color: #41b88380;
	}

	@media screen and (min-width: 1200px) {
		.application {
			width: 1200px;
		}
	}

	@media screen and (min-width: 800px) and (max-width: 1199px) {
		.application {
			width: 800px;
		}
	}

	@media screen and (min-width: 360px) and (max-width: 799px) {
		.application {
			width: 360px;
		}
	}

	@media screen and (min-width: 1px) and (max-width: 359px) {
		.application {
			width: 100%;
		}
	}
</style>