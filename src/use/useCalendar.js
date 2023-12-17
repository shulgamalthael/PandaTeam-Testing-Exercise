/* vue */
import { reactive, computed } from 'vue';

/* store */
import { mapState } from '@/store/storeLib';

export const useCalendar = () => {
	const { selectedLanguage } = mapState();

	const monthesByLanguage = [
		{
			'UA': 'Січ',
			'EN': 'Jan',
		},
		{
			'UA': "Лют",
			'EN': 'Feb',
		},
		{
			'UA': 'Бер',
			'EN': 'Mar',
		},
		{
			'UA': 'Кві',
			'EN': 'Apr',
		},
		{
			'UA': 'Тра',
			'EN': 'May',
		},
		{
			'UA': 'Чер',
			'EN': 'Jun',
		},
		{
			'UA': 'Лип',
			'EN': 'Jul',
		},
		{
			'UA': 'Сер',
			'EN': 'Aug',
		},
		{
			'UA': 'Вер',
			'EN': 'Sep',
		},
		{
			'UA': 'Жов',
			'EN': 'Oct',
		},
		{
			'UA': 'Лис',
			'EN': 'Nov',
		},
		{
			'UA': 'Гру',
			'EN': 'Dec',
		},
	];

	const monthes = computed(() => monthesByLanguage.map((month) => month[selectedLanguage.value]));
	
	return reactive({
		monthes,

		dayTimes: [
			'06:00',
			'07:00',
			'08:00',
			'09:00',
			'10:00',
			'11:00',
			'12:00',
			'13:00',
			'14:00',
			'15:00',
			'16:00',
			'17:00',
		],

		nightTimes: [
			'01:00',
			'02:00',
			'03:00',
			'04:00',
			'05:00',
			'18:00',
			'19:00',
			'20:00',
			'21:00',
			'22:00',
			'23:00',
		],
	});
}