import { ScreenSize } from '@app/configs/device';
import { ConnectivityChangedAction, AppActionTypes } from './types';

export const setConnectivityStatusAction = (isConnected: boolean): ConnectivityChangedAction => {
	return {
		type: AppActionTypes.CONNECTIVITY_CHANGED,
		payload: isConnected,
	};
};

export const setLocaleAction = (newLocale: string) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_LOCALE,
			payload: newLocale,
		});
	};
};

export const setNightModeAction = (nightMode: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_NIGHT_MODE,
			payload: nightMode,
		});
	};
};
export const setLandscapeStateAction = (isLandscape: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_LANDSCAPE,
			payload: isLandscape,
		});
	};
};
export const setScreenSizeAction = (screenSize: ScreenSize) => {
	return (dispatch: any) => {
		dispatch({
			type: AppActionTypes.SET_SCREEN_SIZE,
			payload: screenSize,
		});
	};
};
