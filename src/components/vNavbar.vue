<template>
	<nav class="navigation">
		<div 
			class="navigation-button"
			@click="setSelectedPage('main')"
			:class="{'navigation-button__active': selectedPage === 'main'}"
		>
			{{ mainPageTitle }}
		</div>
		<div 
			@click="setSelectedPage('selected')"
			class="navigation-button navigation-button--with-margin"
			:class="{'navigation-button__active': selectedPage === 'selected'}"
		>
			{{ selectedPageTitle }}
		</div>
	</nav>
</template>

<script setup>
	/* use */
	import { useLanguage } from '@/use/useLanguage';

	/* store */
	import { mapState, mapMutations } from "@/store/storeLib";

	const { selectedPage } = mapState();
	const { setSelectedPage } = mapMutations();

	const mainPageTitle = useLanguage({
		'UA': 'Головна',
		'EN': 'Main',
	});

	const selectedPageTitle = useLanguage({
		'UA': 'Обране',
		'EN': 'Selected',
	});
</script>

<style scoped>
	.navigation {
		display: flex;
		width: 100%;
		border-top: 0;
		padding: 5px 15px;
		background-color: #41b88380;
		border: 1px solid var(--secondary-color);
	}

	.navigation-button {
		padding: 5px 15px;
		color: var(--secondary-color);
		font-weight: 700;
		cursor: pointer;
		border-radius: 5px;
		background-color: #41b88390;
		border: 1px solid var(--secondary-color);
	}

	.navigation-button--with-margin {
		margin-left: 5px;
	}

	.navigation-button:hover {
		color: var(--secondary-color);
		background-color: var(--primary-color);
		border: 1px solid var(--secondary-color);
	}

	.navigation-button__active {
		color: #41b883;
		background-color: #35495e90;
		border: 1px solid var(--primary-color);
	}
</style>