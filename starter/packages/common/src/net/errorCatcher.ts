/* eslint-disable @typescript-eslint/no-use-before-define */
import { AxiosError, AxiosResponse } from 'axios';
import webApi from './webApi';
import HttpStatusCode, { HttpError } from './types';

const responseInterceptor = (response: AxiosResponse) => {
	// write down your request intercept.
	return response;
};

const errorInterceptor = (err: AxiosError<any>) => {
	var res: Error = err;
	if (err.isAxiosError && err.response != undefined && err.response.data != undefined) {
		//@ts-ignore
		const httpError: HttpError = {
			UserMessage: err.response.data.UserMessage,
			DeveloperMessage: err.response.data.DeveloperMessage,
			MoreInfo: err.response.data.MoreInfo,
			ErrorCode: err.response.data.ErrorCode,
			StatusCode: err.response.status,
			OriginalError: err,
		};
		res = httpError;

		if (httpError.StatusCode == HttpStatusCode.Unauthorized)
			return resetTokenAndReattemptRequest(httpError);
	}

	return Promise.reject(res);
};

export default {
	response: responseInterceptor,
	error: errorInterceptor,
};

/************** BEGIN REFRESH TOKEN *************/
let isAlreadyFetchingAccessToken = false;
type oldRequestCallback = () => any;
const MAX_RETRY = 3;
let retryCounter = 0;
// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers: oldRequestCallback[] = [];

const resetTokenAndReattemptRequest = async (error: HttpError): Promise<any> => {
	try {
		// check if retry not more then max retry
		if (retryCounter > MAX_RETRY) {
			retryCounter = 0;
			return Promise.reject(error);
		}

		//todo: Your own mechanism to get the refresh token to refresh the JWT token
		var userName = '@USER_NAM';
		var password = '@PASSWORD';

		if (!userName || !password) {
			// We can't refresh, throw the error anyway
			return Promise.reject(error);
		}

		// increase retry cou
		retryCounter = retryCounter + 1;

		/* Proceed to the token refresh procedure
			We create a new Promise that will retry the request,
			clone all the request configuration from the failed
			request in the error object. */

		const retryOriginalRequest = new Promise(resolve => {
			/* We need to add the request retry to the queue
					since there another request that already attempt to
					refresh the token */
			addSubscriber(() => {
				resolve(webApi(error.OriginalError.config));
			});
		});

		if (!isAlreadyFetchingAccessToken) {
			isAlreadyFetchingAccessToken = true;

			const response = await getNewTokenAsync(userName, password);

			const newToken = response.data.Token;

			if (!newToken) {
				return Promise.reject(error);
			}

			//todo: save the newly refreshed token for other requests to use
			isAlreadyFetchingAccessToken = false;
			onAccessTokenFetched();
		}
		return retryOriginalRequest;
	} catch (err) {
		return Promise.reject(err);
	}
};

const onAccessTokenFetched = () => {
	// When the refresh is successful, we start retrying the requests one by one and empty the queue
	subscribers.forEach(callback => {
		callback();
	});
	subscribers = [];
};

const addSubscriber = (callback: oldRequestCallback) => {
	subscribers.push(callback);
};

const getNewTokenAsync = async (userName: string, password: string): Promise<any> => {
	//todo: get new token
	return Promise.resolve('NEW_TOKEN');
};
/************** END REFRESH TOKEN *************/
