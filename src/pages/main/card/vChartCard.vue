<template>
	<div v-if="!weatherData" class="card-loading-overlay">
		<v-loading />
	</div>
	<div v-if="weatherData">
		<div class="card-day-card-info">
			{{ `${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}` }}
		</div>
		<div 
			v-if="props.days === '1'" 
			class="card-day-card-info"
		>
			{{ `${currentTemperatureTitle}: ${weatherData.current.temp_c}` }}
		</div>
		<div class="card-day-card-info">
			{{ `${dateTitle}: ${dateString}` }}
		</div>
	</div>
	<canvas :id="chartElementId"></canvas>
</template>

<script setup>
	/* vue api */
	import { ref, toRef, toRefs, watch, defineProps, onMounted } from "vue";

	/* components */
	import vLoading from '@/components/base/vLoading';

	/* use */
	import { useChart } from '@/use/useChart';
	import { useLanguage } from '@/use/useLanguage';

	/* store */
	import { mapState } from '@/store/storeLib';
	
	/* scripts */
	import { fetchWeatherHourStep } from '@/utils/api.js';
	
	/* refs */
	const dateString = ref('');
	const weatherData = ref(null);
	const chartDataList = ref([]);

	const { selectedLanguage } = mapState();
	
	/* propses */
	const props = defineProps({ 
		card: Object, 
		days: String,
		dayMode: String, 
		isSelectedPage: Boolean 
	});
	const { card, dayMode, isSelectedPage } = toRefs(props);
	const cityData = toRef(card, 'cityData');

	/* chart */
	const { fillChartDataList } = useChart();
	const chartElementId = `chart-${props.card.id}-day${isSelectedPage.value ? '-selected' : ''}`;

	const currentTemperatureTitle = useLanguage({
		'UA': 'Поточна температура',
		'EN': 'Current Temperature',
	});

	const dateTitle = useLanguage({
		'UA': 'Дата',
		'EN': 'Date',
	});

	const fetchWeather = async () => {
		const response = await fetchWeatherHourStep(
			card.value.cityData.lat, 
			card.value.cityData.lon, 
			props.days
		);

		weatherData.value = response.data;
	};

	const updateChart = () => {
		const {
			dateString: newDateString,
			chartDataList: newChartDataList, 
		} = fillChartDataList({
			dayMode, 
			dateString,
			weatherData, 
			chartDataList, 
			chartElementId,
			days: props.days, 
		});

		dateString.value = newDateString.value;
		chartDataList.value = newChartDataList.value;
	}

	watch(cityData, () => fetchWeather());

	watch([weatherData, dayMode, selectedLanguage], () => updateChart());

	onMounted(() => fetchWeather());
</script>

<style scoped>
	.card-day-card-info {
		padding: 5px 15px;
		color: var(--secondary-color);
	}

	.card-loading-overlay {
		display: flex;
		justify-content: center;
	}
</style>