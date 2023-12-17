import axios from "axios"
import config from "./config"

export const initAxios = () => {
	axios.defaults.baseURL = config.BASE_API_URL;
}
