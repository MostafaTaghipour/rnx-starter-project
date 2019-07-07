import axios from 'axios';
import { requestLogger, errorLogger, responseLogger } from 'axios-logger';

export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const BASE_URL = 'https://api.themoviedb.org/3/movie/';
export const API_KEY = 'ec01f8c2eb6ac402f2ca026dc2d9b8fd';

const webApi = axios.create({
	baseURL: BASE_URL,
});

//loggers
webApi.interceptors.request.use(
	request => {
		// write down your request intercept.
		return requestLogger(request, {
			data: true,
			url: true,
			method: true,
			headers: true,
		});
	},
	err => {
		// write down your error intercept.
		return errorLogger(err);
	}
);
webApi.interceptors.response.use(
	response => {
		// write down your response intercept.
		return responseLogger(response, {
			data: true,
			status: true,
			statusText: true,
			headers: true,
		});
	},
	err => {
		// write down your error intercept.
		return errorLogger(err);
	}
);

webApi.defaults.headers.common['authorization'] = 'Basic YmlsbGIyMTEyOnl5ZXl5ZSQx';

export default webApi;
