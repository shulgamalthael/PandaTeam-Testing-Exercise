<template>
		<main class="main">
		<v-card
			v-for="card in card.cardsList" 
			:card="card"
			:key="card.id"
			:isSelectedPage="false"
			@remove-card="removeCardFromCardsList(card)"
		/>
		<div 
			v-if="card.cardsList.length < 5" 
			@click="addCardToCardsList"
			class="main-add-card__button"
		>
			{{ addButtonTitle }}
		</div>
	</main>
</template>

<script setup>
	/* vue */
	import { onMounted } from 'vue';

	/* use */
	import { useLanguage } from '@/use/useLanguage';

	/* store */
	import { mapState, mapMutations, mapActions } from '@/store/storeLib';

	/* components */
	import vCard from '@/pages/main/card/vCard.vue';

	const { card } = mapState();
	const { addCardToCardsList, addFirstCardToCardsList } = mapActions();
	const { removeCardFromCardsList } = mapMutations();

	const addButtonTitle = useLanguage({
		'UA': 'Додати картку',
		'EN': 'Add card',
	});

	onMounted(async () => addFirstCardToCardsList());
</script>

<style>
	.main {
		display: flex;
		flex-direction: column;
		padding: 15px;
	}

	.main-add-card__button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 5px 15px;
		font-size: 15px;
		border-radius: 5px;
		color: var(--secondary-color);
		cursor: pointer;
		margin-top: 15px;
		background-color: #41b88380;
	}

	.main-add-card__button:hover {
		background-color: var(--primary-color);
	}
</style>