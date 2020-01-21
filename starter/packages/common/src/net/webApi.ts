import axios from 'axios';
import logger from './logger';
import errorCatcher from './errorCatcher';
import headerInterceptor from './headerInterceptor';
import configs from '@app/configs';

const webApi = axios.create({
	baseURL: configs.apiBaseUrl,
});

webApi.defaults.timeout = 60 * 1000; // 1 min

webApi.interceptors.request.use(logger.request, logger.error);
webApi.interceptors.request.use(headerInterceptor.request);
webApi.interceptors.response.use(logger.response, logger.error);
webApi.interceptors.response.use(errorCatcher.response, errorCatcher.error);

export default webApi;
