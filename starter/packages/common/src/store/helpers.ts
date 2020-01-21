import { store } from '.';


import R from '@app/res/R';
//@ts-ignore
import jwtDecode from 'jwt-decode';
import { AuthActionTypes } from './auth/types';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import HttpStatusCode, { HttpError } from '@app/net/types';
import { showToastAction } from './ui/actions';

export const handleHttpError = (error: any) => {
	const dispatch: ThunkDispatch<{}, {}, any> = store.dispatch;
	const httpError = error as HttpError;
	if (httpError) {
		if (httpError.UserMessage)
			store.dispatch(
				showToastAction({
					text: httpError.UserMessage,
					type: 'danger',
				})
			);

		if (httpError.StatusCode == HttpStatusCode.Unauthorized) {
			//dispatch(logoutAsyncAction());
		}
	}
};

export const isConnectToInternet = (showWarningMessage = true): boolean => {
	const connected = store.getState().app.isConnectToInternet;

	if (showWarningMessage != connected) {
		store.dispatch(
			showToastAction({
				text: R.strings('error.no_internet'),
				type: 'danger',
			})
		);
	}
	return connected;
};

export const getLocale = (): string | undefined => {
	return store.getState().app.locale;
};


export enum AsyncActionStatus {
	REQUEST = 'REQUEST',
	SUCCESS = 'SUCCESS',
	FAILURE = 'FAILURE',
}

export interface AsyncAction<T> extends Action<T> {
	status: AsyncActionStatus;
}

export interface ApiAction<T, D = any> extends AsyncAction<T> {
	data?: D;
	error?: Error;
}

export interface ApiPaginationAction<T, D> extends ApiAction<T> {
	page?: number;
	total?: number;
	refreshing?: boolean;
}

export interface RequestState<T = any> {
	data?: T;
	error?: any;
	loading: boolean;
	loaded: boolean;
}
export interface PaginationRequestState<T> extends RequestState<T> {
	page: number;
	total: number;
	refreshing: boolean;
}
