import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { LOCALSTORAGE_TOKEN_KEY } from "../consts/local-storage";
import { mockApi } from "./mock-api";

const isDevelopment = process.env.NODE_ENV === 'development';

// export const API_URL = isDevelopment ? `http://localhost:9091/v1` : `http://150.241.92.2/api/v1`;
export const API_URL = `http://150.241.92.2/api/v1`;


type ApiInstance = {
	get: (url: string, config?: { params?: any; headers?: any }) => Promise<{ data: any }>;
	post: (url: string, data?: any, config?: { headers?: any }) => Promise<{ data: any }>;
	patch: (url: string, data?: any, config?: { headers?: any }) => Promise<{ data: any }>;
	delete: (url: string, config?: { headers?: any }) => Promise<{ data: any }>;
	request?: (config: InternalAxiosRequestConfig) => Promise<AxiosResponse>;
	interceptors?: {
		request: {
			use: (handler: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>) => void;
		};
		response: {
			use: (
				onFulfilled: (response: AxiosResponse) => AxiosResponse,
				onRejected: (error: any) => Promise<any>
			) => void;
		};
	};
};

const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true
}) as ApiInstance;

// export const $api: ApiInstance = axiosInstance;
export const $api: ApiInstance = mockApi;

if (!isDevelopment && 'interceptors' in $api) {
	const api = $api as AxiosInstance;
	api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
		if (config.headers) {
			config.headers.authorization = 'Bearer ' + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
		}
		return config;
	});

	api.interceptors.response.use(
		(config: AxiosResponse) => config,
		async (error: any) => {
			const originalRequest = error.config;
			if (error.response?.status === 401 && error.config && !error.config._isRetry) {
				originalRequest._isRetry = true;
				try {
					const response = await axios.get(API_URL + '/user/refresh', {
						withCredentials: true
					});
					localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, response.data.accessToken);
					return api.request(originalRequest);
				} catch (e) {
					window.location.href = '/login';
				}
			}
			throw error;
		}
	);
}