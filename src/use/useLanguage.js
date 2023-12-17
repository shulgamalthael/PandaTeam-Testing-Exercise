import { computed } from 'vue'
import { mapState } from '@/store/storeLib'

const defaultValue = { 'UA': 'Помилка!', 'EN': 'Error!' };

export const useLanguage = (examples = defaultValue) => {
	const { selectedLanguage } = mapState();

	return computed(() => examples[selectedLanguage.value]);
}