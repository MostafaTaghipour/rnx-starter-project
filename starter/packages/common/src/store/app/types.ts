import { Action } from 'redux';
import { ScreenSize } from '@app/configs/device';

export interface AppState {
	isConnectToInternet: boolean;
	locale: string;
	nightMode: boolean;
	isLandscape: boolean;
	screenSize: ScreenSize;
}

// actions
export enum AppActionTypes {
	CONNECTIVITY_CHANGED = 'CONNECTIVITY_CHANGED',
	SET_LOCALE = 'SET_LOCALE',
	SET_NIGHT_MODE = 'SET_NIGHT_MODE',
	SET_LANDSCAPE = 'SET_LANDSCAPE',
	SET_SCREEN_SIZE = 'SET_SCREEN_SIZE',
}

export interface ConnectivityChangedAction extends Action<AppActionTypes.CONNECTIVITY_CHANGED> {
	payload: boolean;
}

export interface SetLocaleAction extends Action<AppActionTypes.SET_LOCALE> {
	payload: string;
}

export interface SetNightModeAction extends Action<AppActionTypes.SET_NIGHT_MODE> {
	payload: boolean;
}
export interface SetLandscapeAction extends Action<AppActionTypes.SET_LANDSCAPE> {
	payload: boolean;
}
export interface SetScreenSizeAction extends Action<AppActionTypes.SET_SCREEN_SIZE> {
	payload: ScreenSize;
}

export type AppActions =
	| ConnectivityChangedAction
	| SetLocaleAction
	| SetNightModeAction
	| SetLandscapeAction
	| SetScreenSizeAction;
