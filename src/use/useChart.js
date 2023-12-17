/* vue */
import { toRefs } from 'vue';

/* chart */
import Chart from 'chart.js/auto';

/* use */
import { useCalendar } from '@/use/useCalendar';

export const useChart = () => {
	let chart = null;

	const calendar = useCalendar();
	const { monthes, dayTimes, nightTimes } = toRefs(calendar);

	const chartOptions = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				type: 'linear',
				display: true,
				position: 'left',
			},
			y1: {
				type: 'linear',
				display: true,
				position: 'right',
			}
		},
	};

	const getChartData = (chartDataList) => ({
		labels: chartDataList.value.map(row => row.label),
		datasets: [
			{
				yAxisID: 'y',
				type: 'line',
				tension: 0.1,
				borderWidth: 3,
				pointBorderWidth: 5,
				borderColor: '#35495e90',
				pointBackgroundColor: '#41b883',
				data: chartDataList.value.map(row => row.value),
			},
			{
				type: 'bar',
				yAxisID: 'y1',
				borderWidth: 1,
				pointBorderWidth: 5,
				borderColor: '#35495e90',
				backgroundColor: '#41b883',
				pointBackgroundColor: '#41b883',
				data: chartDataList.value.map(row => row.value),
			}
		]
	});

	const getChartCanvas = (id) => document.getElementById(id);

	const clearChart = () => chart?.destroy();

	const renderChart = (id, chartDataList) => {
		clearChart();

		chart = new Chart(getChartCanvas(id), {
			options: chartOptions,
			data: getChartData(chartDataList),
		});
	};

	const fillChartDataList = ({ chartElementId, chartDataList, weatherData, days, dayMode, dateString }) => {
		if(weatherData.value) {
			if(days === '1') {
				dateString.value = weatherData.value.forecast.forecastday[0].date;
				chartDataList.value = weatherData.value.forecast.forecastday[0].hour.map((hourData) => ({
					label: /\d{4}-\d{2}-\d{2} (\d{2}:\d{2})/.exec(hourData.time)[1],
					value: hourData.temp_c,
				}));
				if(dayMode.value === 'day') {
					chartDataList.value = chartDataList.value.filter((dayMap) => dayTimes.value.includes(dayMap.label))
				} else {
					chartDataList.value = chartDataList.value.filter((dayMap) => nightTimes.value.includes(dayMap.label))
				}
			} else {
				dateString.value = `${weatherData.value.forecast.forecastday[0].date} - ${weatherData.value.forecast.forecastday[weatherData.value.forecast.forecastday.length - 1].date}`;
				chartDataList.value = weatherData.value.forecast.forecastday.map((dayData) => {
					const dateMap = /\d{4}-(\d{2})-(\d{2})/.exec(dayData.date);
					return {
						label: `${monthes.value[+dateMap[1] - 1]} ${dateMap[2]}`,
						value: dayData.day.avgtemp_c,
					};
				});
			}

			renderChart(chartElementId, chartDataList);

			return { chartDataList, weatherData, days, dayMode, dateString };
		}
	};

	return {
		fillChartDataList,
	}
};