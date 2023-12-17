<template>
	<div class="card">
		<div class="card-header">
			<div v-if="!props.isSelectedPage" class="card-header-autocomplete">
				<v-autocomplete
					v-model="cityName"
					:loading="!cities"
					@complete="search"
					:suggestions="cities"
					:placeholder="cityInputPlaceholder"
					@update-suggestion="updateSuggestion"
				/>
			</div>
			<div 
				class="card-header-buttons"
				:style="{
					'width': props.card.isSelected ? '100%' : '',
					'justify-content': props.card.isSelected ? 'flex-end' : '',
				}"
			>
				<div 
					v-if="!props.card.isSelected && !props.isSelectedPage"
					class="card-header-buttons__button"
					@click="addToSelectedCards"
				>
					{{ toSelectedButtonTitle }}
				</div>
				<div 
					v-if="props.card.isSelected && !props.isSelectedPage"
					@click="removeSelectedCard(card)"
					class="card-header-buttons__button"
				>
					{{ removeFromSelectedTitle }}
				</div>
				<div 
					class="card-header-buttons__button"
					@click="showConfirmationModal = true" 
				>
					{{ removeButtonTitle }}
				</div>
				<v-confirmation-modal
					v-if="showConfirmationModal"
					@confirm="confirmDeletion"
					@close="showConfirmationModal = false"
					:confirmationText="confirmationText"
				/>
			</div>
		</div>
		<div
			v-if="props.card.cityData"
			class="card-subheader"
		>
			<div
				@click="selectedTab = 'day'"
				class="card-subheader__button"
				:class="{'card-subheader__button--active': selectedTab === 'day'}"
			>
				{{ oneDayButtonTitle }}
			</div>
			<div
				@click="selectedTab = 'week'"
				class="card-subheader__button card-subheader__button-with-margin"
				:class="{'card-subheader__button--active': selectedTab === 'week'}"
			>
				{{ weekButtonTitle }}
			</div>
			<div style="margin-left: 5px;">
				<v-switch
					:value="dayMode === 'night'"
					@change-value="changeDayMode"
				>
					<template v-slot:before>
						<div style="color: #35495e">
							{{ dayButtonTitle }}
						</div>
					</template>
					<template v-slot:after>
						<div style="color: #35495e">
							{{ nightButtonTitle }}
						</div>
					</template>
				</v-switch>
			</div>
		</div>
		<v-chart-card 
			v-if="props.card.cityData && selectedTab === 'day'"
			days="1"
			:card="card"
			:dayMode="dayMode"
			:isSelectedPage="props.isSelectedPage"
		/>
		<v-chart-card
			v-if="props.card.cityData && selectedTab === 'week'"
			days="7"
			:card="card"
			:dayMode="dayMode"
			:isSelectedPage="props.isSelectedPage"
		/>
	</div>
</template>

<script setup>
	/* vue */
	import { ref, defineProps, defineEmits, onMounted } from 'vue';

	/* store */
	import { mapActions, mapMutations } from '@/store/storeLib';

	/* use */
	import { useLanguage } from '@/use/useLanguage';

	/* components */
	import vSwitch from '@/components/base/vSwitch';
	import vChartCard from '@/pages/main/card/vChartCard';
	import vAutocomplete from '@/components/base/vAutocomplete';
	import vConfirmationModal from '@/components/vConfirmationModal';

	/* fetch */
	import { fetchWeatherByIP, fetchCityLocationData } from '@/utils/api';

	/* vue */
	const props = defineProps({ card: Object, isSelectedPage: Boolean });
	const emit = defineEmits(['remove-card', 'add-to-selected', 'update-cards-list']);

	/* store */
	const { removeSelectedCard } = mapActions();
	const { updateCardById, setSelectedCardsList } = mapMutations();

	/* refs */
	const cities = ref([]);
	const cityName = ref('');
	const dayMode = ref('day');
	const selectedTab = ref('day');
	const showConfirmationModal = ref(false);

	const confirmationText = useLanguage({
		'UA': 'Ви впевнені, що хочете видалити цей блок?',
		'EN': 'Are you sure you want to delete this block?'
	});

	const toSelectedButtonTitle = useLanguage({
		'UA': 'В обране',
		'EN': 'To selected',
	});

	const removeFromSelectedTitle = useLanguage({
		'UA': 'Прибрати з обраного',
		'EN': 'Remove from selected',
	});

	const removeButtonTitle = useLanguage({
		'UA': "Видалити",
		"EN": "Remove",
	});

	const cityInputPlaceholder = useLanguage({
		'UA': 'Введіть назву міста',
		'EN': 'Enter city name'
	});

	const oneDayButtonTitle = useLanguage({
		'UA': '1 День',
		'EN': '1 Day',
	});

	const weekButtonTitle = useLanguage({
		'UA': 'Неділя',
		'EN': 'Week',
	});

	const dayButtonTitle = useLanguage({
		'UA': 'День',
		'EN': 'Ніч',
	});

	const nightButtonTitle = useLanguage({
		'UA': 'Ніч',
		'EN': 'Night',
	});

	const search = async () => {
		cities.value = null;
		const citiesFromServer = await fetchCityLocationData(cityName.value);
		cities.value = citiesFromServer.data.map((city) => ({ 
			...city, 
			label: city.state ? `${city.name}, ${city.state}` : city.name, 
		}));
	};

	const changeDayMode = () => {
		if(dayMode.value === 'day') {
			dayMode.value = 'night';
		} else {
			dayMode.value = 'day';
		}
	}

	const updateSuggestion = (suggestion) => {
		updateCardById({ id: props.card.id, cityData: suggestion });
	}

	const confirmDeletion = () => {
		emit('remove-card');
		emit('update-cards-list');
		showConfirmationModal.value = false;
	}

	const addToSelectedCards = () => {
		const selectedCards = JSON.parse(localStorage.getItem('selectedCards') || "[]");

		const cardData = { 
			...props.card,
			isSelected: true
		};

		selectedCards.push(cardData);
		localStorage.setItem('selectedCards', JSON.stringify(selectedCards));

		updateCardById(cardData);
		setSelectedCardsList(selectedCards);
	}

	onMounted(async () => {
		if(props.card.ip) {
			const response = await fetchWeatherByIP(props.card.ip);
			updateCardById({ ...props.card, cityData: response.data.location });
		}
	});
</script>

<style scoped>
	.card {
		display: flex;
		flex-direction: column;
		padding: 15px;
		border-radius: 5px;
		box-shadow: 0 0 1.11px 1.11px #00000050;
		margin-top: 15px;
	}

	.card:first-child {
		margin-top: 0px;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
	}

	.card-header-buttons {
		display: flex;
	}

	.card-header-buttons__button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: var(--secondary-color);
		cursor: pointer;
		padding: 5px 15px;
		border-radius: 5px;
		margin-left: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		border: 1px solid var(--secondary-color);
		background-color: #41b88390;
	}

	.card-header-buttons__button:hover {
		background-color: var(--primary-color);
	}

	.card-subheader {
		display: flex;
		margin-top: 5px;
	}

	.card-subheader__button {
		padding: 5px 15px;
		color: var(--secondary-color);
		font-weight: 700;
		border-radius: 5px;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		border: 1px solid var(--secondary-color);
		background-color: #41b88390;
	}

	.card-subheader__button:hover {
		background-color: var(--primary-color);
		color: var(--secondary-color);
		border: 1px solid var(--secondary-color);
	}

	.card-subheader__button--active {
		color: #41b883;
		border: 1px solid var(--primary-color);
		background-color: #35495e90;
	}

	.card-subheader__button-with-margin {
		margin-left: 5px;
	}

	@media screen and (min-width: 1px) and (max-width: 800px) {
		.card-header {
			flex-direction: column;
		}

		.card-header-buttons {
			margin-top: 5px;
			justify-content: space-between;
		}

		.card-header-autocomplete {
			display: flex;
			justify-content: center;
			width: 100%;
		}

		.card-header-buttons__button:first-child {
			margin-right: auto;
			margin-left: 0px;
		}
	}
</style>