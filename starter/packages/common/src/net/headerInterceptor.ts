import { AxiosRequestConfig} from 'axios';
import webApi from './webApi';


const requestInterceptor = (request: AxiosRequestConfig) => {
	request.headers = requestHeaders();
	return request;
};

export default {
	request: requestInterceptor,
};


export const requestHeaders = () => {
	const token = "YOUR_TOKEN";

	const Authorization = token ? `Bearer ${token}` : '';

	return {
		...webApi.defaults.headers,
		Authorization,
	};
};
