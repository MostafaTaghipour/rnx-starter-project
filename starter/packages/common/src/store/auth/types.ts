import { Action } from 'redux';

export interface SignInModel {
	email: string;
	password: string;
}

export interface AuthState {
	token?: string;
	authCompleted: boolean;
	inProcess: boolean;
}

// actions
export enum AuthActionTypes {
	AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST',
	AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS',
	AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
}

export interface AuthenticationAction extends Action<AuthActionTypes.AUTHENTICATION_REQUEST> {
	payload: SignInModel;
}

export interface AuthenticationSuccessAction
	extends Action<AuthActionTypes.AUTHENTICATION_SUCCESS> {
	payload: string;
}

export interface AuthenticationFailureAction
	extends Action<AuthActionTypes.AUTHENTICATION_FAILURE> {
	payload: any;
}

export type AuthActions =
	| AuthenticationAction
	| AuthenticationSuccessAction
	| AuthenticationFailureAction;
