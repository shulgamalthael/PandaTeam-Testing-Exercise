/* scripts */
import { fetchIPAdress } from '@/utils/api';

/* use */
const { getItem, setItem } = useLocalStorage();
import { useLocalStorage } from '@/use/useLocalStorage';

export default {
	state: {
		cardsList: [],
		selectedCardsList: [],
	},
	mutations: {
		setCardsList(state, cardsList) {
			state.selectedCards = cardsList;
		},
		addCardToCardsList(state, card) {
			state.cardsList.push(card);
			console.log(state.cardsList);
		},
		updateCardById(state, payloadCard) {
			const index = state.cardsList.findIndex((card) => card.id === payloadCard.id);
			state.cardsList.splice(index, 1, payloadCard);
		},
		removeCardFromCardsList(state, paylaodCard) {
			state.cardsList = state.cardsList.filter((card) => card.id !== paylaodCard.id);
		},
		setSelectedCardsList(state, cardsList) {
			state.selectedCardsList = cardsList;
		},
	},

	actions: {
		async addFirstCardToCardsList({ state, dispatch }) {
			if(!state.cardsList.length) {
				const response = await fetchIPAdress();
				dispatch('addCardToCardsList', { ip: response.data.ip });
			}
		},
		addCardToCardsList({ commit }, restCardData) {
			commit('addCardToCardsList', { 
				id: new Date().getTime() + Math.floor(Math.random() * 999999 + (999999 - 100000)), 
				ip: null, 
				cityData: null, 
				isSelected: false,
				...restCardData,
			});
		},
		updateSelectedCardsList({ commit }) {
			let selectedCards = getItem('selectedCards', []);
			commit('setSelectedCardsList', selectedCards);
		},
		removeSelectedCard({ commit }, payloadCard) {
			let selectedCards = getItem('selectedCards', []);
			selectedCards = selectedCards.filter((card) => card.id !== payloadCard.id);
			setItem('selectedCards', selectedCards);

			commit('updateCardById', { ...payloadCard, isSelected: false });
			commit('setSelectedCardsList', selectedCards);
		}
	}
}