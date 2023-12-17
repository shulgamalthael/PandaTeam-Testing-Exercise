<template>
	<template v-for="card in card.selectedCardsList" :key="card.id">
		<v-card 
			:id="card.id" 
			:card="card"
			isSelectedPage
			@update-cards-list="updateCardsList"
			@remove-card="removeSelectedCard(card)"
		/>
	</template>
	<div
		v-if="!card.selectedCardsList.length"
		class="selected-cards__list-empty"
	>
		{{ emptyTitle }}
	</div>
</template>

<script setup>
	/* vue */
	import { onMounted } from "vue";
		
	/* components */
	import vCard from "@/pages/main/card/vCard.vue";

	/* use */
	import { useLanguage } from '@/use/useLanguage';

	/* store */
	import { mapState, mapActions } from '@/store/storeLib';

	const { card } = mapState();
	const { updateSelectedCardsList, removeSelectedCard } = mapActions();

	const emptyTitle = useLanguage({
		'UA': 'Лист обраних карток пустий',
		'EN': 'List of the selected cards is empty',
	});

	onMounted(() => updateSelectedCardsList());
</script>

<style scoped>
	.selected-cards__list-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px 15px;
		color: var(--secondary-color);
	}
</style>