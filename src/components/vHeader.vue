<template>
	<header class="header">
		<img 
			alt="header-logo"
			class="header-logo" 
			src="../assets/logo.png"
		/>
		<v-switch 
			:value="selectedLanguage === 'EN'" 
			@change-value="setSelectedLanguage"
		>
			<template v-slot:before>
				<div style="color: #35495e">UA</div>
			</template>
			<template v-slot:after>
				<div style="color: #35495e">EN</div>
			</template>
		</v-switch>
	</header>
</template>

<script setup>
	import vSwitch from "@/components/base/vSwitch";
	import { mapState, mapMutations } from "@/store/storeLib";

	const { selectedLanguage } = mapState();
	const { setSelectedLanguage } = mapMutations();
</script>

<style scoped>
	.header {
		display: flex;
		justify-content: space-between;
		height: 50px;
		width: 100%;
		padding: 5px 15px;
		border: 1px solid var(--secondary-color);
		background-color: #41b88380;
	}

	.header-logo {
		height: 35px;
		width: 35px;
		margin: auto 0;
	}
</style>