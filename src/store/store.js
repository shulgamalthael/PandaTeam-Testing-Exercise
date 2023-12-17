import { createStore } from "vuex";
import cardModule from "@/store/modules/card.module";

export default createStore({
	state: {
		selectedLanguage: 'UA',
		selectedPage: 'main',
	},
	mutations: {
		setSelectedLanguage(state) {
			if(state.selectedLanguage === 'UA') {
				state.selectedLanguage = 'EN';
			} else {
				state.selectedLanguage = 'UA';
			}
		},
		setSelectedPage(state, page) {
			state.selectedPage = page;
		},
	},
	modules: {
		card: cardModule,
	}
});