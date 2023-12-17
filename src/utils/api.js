import axios from "axios"
import config from "./config"

export const fetchCityLocationData = (city = "London") => {
	return axios.get(`${config.BASE_API_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${config.API_KEY}`);
};

export const fetchWeatherHourStep = (lat = 0, lon = 0, days = 1) => {
	return axios.get(`${config.WEATHER_API_URL}/v1/forecast.json?q=${lat},${lon}&days=${days}&key=${config.WEATHER_API_KEY}`);
};

export const fetchWeatherByIP = (ip, days = 1) => {
	return axios.get(`${config.WEATHER_API_URL}/v1/forecast.json?q=${ip}&days=${days}&key=${config.WEATHER_API_KEY}`);
};

export const fetchIPAdress = () => {
	return axios.get(`${config.IP_API_URL}?api-key=${config.IP_API_KEY}`);
};

