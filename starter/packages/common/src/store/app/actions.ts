import { ScreenSize } from '@app/configs/device';
import { ConnectivityChangedAction, AppActionTypes } from './types';

export const connectivityChanged = (isConnected: boolean): ConnectivityChangedAction => {
	return {
		type: AppActionTypes.CONNECTIVITY_CHANGED,
		payload: isConnected,
	};
};

export const setLocaleAsync = (newLocale: string) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_LOCALE,
			payload: newLocale,
		});
	};
};

export const setNightMode = (nightMode: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_NIGHT_MODE,
			payload: nightMode,
		});
	};
};
export const setLandscapeState = (isLandscape: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_LANDSCAPE,
			payload: isLandscape,
		});
	};
};
export const setScreenSize = (screenSize:ScreenSize) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_SCREEN_SIZE,
			payload: screenSize,
		});
	};
};
