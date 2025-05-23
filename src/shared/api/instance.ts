import axios from "axios";
import { LOCALSTORAGE_TOKEN_KEY } from "../consts/local-storage";

export const API_URL = `http://localhost:9091/api`;

export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
})
$api.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.authorization = 'Bearer ' + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
	}
	return config;
});

$api.interceptors.response.use((config) => {
	return config
}, async (error) => {
	const originalRequest = error.config
	if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
		try {
			const response = await axios.get(API_URL + '/v1/user/refresh', {
				withCredentials: true
			})
			localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, response.data.accessToken)
			return $api.request(originalRequest)
		} catch (e) {
			window.location.href = '/login'
		}
	}
	throw error
})