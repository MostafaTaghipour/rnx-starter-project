import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const subtitleStyle = 'color: gray; font-weight:bold; padding:5px;';
const errorStyle = 'color: red; font-weight:light; padding:5px;';
const titleStyleSuccess =
	' border: 1px solid green ; padding : 10px;  ; color: green; display: block;font-weight:bold;font-size:12px;';
const titleStyleFailed =
	' border: 1px solid red ; padding : 10px;  ; color: red; display: block;font-weight:bold;font-size:12px;';

const requestInterceptor = (request: AxiosRequestConfig) => {
	if (!__DEV__) return request;

	try {

		
		const URL = `${request.baseURL ? request.baseURL : ''}${request.url ? request.url : ''}`;
		console.group(
			`%c REQUEST => ${URL} %c \n@ ${new Date().toISOString()}`,
			titleStyleSuccess,
			subtitleStyle
		);

		if (request.data) {
			const arr = request.data as Array<any>;
			if (arr && arr.length < 50) {
				console.log('%c body:', subtitleStyle);
				console.table(arr);
			} else {
				console.log('%c body:\t', subtitleStyle, request.data);
			}
		}

		if (request.params) {
			const arr = request.params as Array<any>;
			if (arr && arr.length < 50) {
				console.log('%c params:', subtitleStyle);
				console.table(arr);
			} else {
				console.log('%c params:\t', subtitleStyle, request.params);
			}
		}

		console.log(
			'%c method:\t',
			subtitleStyle,
			`${request.method ? request.method.toUpperCase() : ''}`
		);
		if (request.headers) {
			console.log('%c headers:', subtitleStyle);
			console.table(request.headers);
		}
		console.groupEnd();
	} catch (error) {}

	return request;
};
const responseInterceptor = (response: AxiosResponse) => {
	if (!__DEV__) return response;

	const URL = response.config.url;
	console.group(
		`%c RESPONSE => ${URL} %c \n@ ${new Date().toISOString()}`,
		titleStyleSuccess,
		subtitleStyle
	);

	console.log('%c status:\t', subtitleStyle, response.status);
	console.log(
		'%c method:\t',
		subtitleStyle,
		`${response.config.method ? response.config.method.toUpperCase() : ''}`
	);
	if (response.data) {
		const arr = response.data as Array<any>;
		if (arr && arr.length < 50) {
			console.log('%c body:', subtitleStyle);
			console.table(response.data);
		} else {
			console.log('%c body:\t', subtitleStyle, response.data);
		}
	}

	console.groupEnd();

	return response;
};

const errorInterceptor = (err: AxiosError) => {
	logError(err);
	return Promise.reject(err);
};

const logError = (err: AxiosError<any>, isRequest = false) => {
	if (!__DEV__) return;

	try {
		const URL = `${err.request._url}`;
		console.group(
			`%c ${isRequest ? 'REQUEST' : 'RESPONSE'} ERROR => ${URL} %c \n@ ${new Date().toISOString()}`,
			titleStyleFailed,
			subtitleStyle
		);
		if (err.response) {
			console.log(
				'%c method:\t',
				subtitleStyle,
				`${err.response.config.method ? err.response.config.method.toUpperCase() : ''}`
			);
			console.log('%c status:\t', subtitleStyle, `${err.response.status}`);
			console.log(
				`%c error:\t\t%c${err.toString().replace('Error: ', '')}`,
				subtitleStyle,
				errorStyle
			);
			if (err.response.data) {
				console.log('%c body:\t', subtitleStyle, err.response.data);
			}
			if (err.response.config.headers) {
				console.log('%c headers:', subtitleStyle);
				console.table(err.response.config.headers);
			}
		}
		console.groupEnd();
	} catch (error) {}
};

export default {
	request: requestInterceptor,
	response: responseInterceptor,
	error: errorInterceptor,
};
