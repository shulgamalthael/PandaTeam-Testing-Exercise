export const useLocalStorage = () => {
	const getItem = (key, defaultValue = null) => JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));

	const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

	return {
		getItem,
		setItem,
	};
};