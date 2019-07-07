import { AppState, AppActions, AppActionTypes } from './types';
import { Reducer } from 'redux';
import Constant from '@app/configs/const';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import CurrentDevice from '@app/configs/device';

const initialState: AppState = {
	isConnectToInternet: false,
	locale: Constant.DEFAULT_LOCALE,
	nightMode: false,
	isLandscape: CurrentDevice.Dimension.isLandscape,
	screenSize: CurrentDevice.Dimension.size,
};

const reducer: Reducer<AppState, AppActions> = (state = initialState, action) => {
	switch (action.type) {
		case AppActionTypes.CONNECTIVITY_CHANGED:
			return {
				...state,
				isConnectToInternet: action.payload,
			};

		case AppActionTypes.SET_LOCALE:
			return {
				...state,
				locale: action.payload,
			};

		case AppActionTypes.SET_NIGHT_MODE:
			return {
				...state,
				nightMode: action.payload,
			};
		case AppActionTypes.SET_LANDSCAPE:
			return {
				...state,
				isLandscape: action.payload,
			};
		case AppActionTypes.SET_SCREEN_SIZE:
			return {
				...state,
				screenSize: action.payload,
			};
		default:
			return state;
	}
};

const persistConfig = {
	key: 'app',
	storage: storage,
	blacklist: ['isConnectToInternet'],
};

export const appReducer = persistReducer(persistConfig, reducer);
