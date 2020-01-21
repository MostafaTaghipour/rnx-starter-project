import { AuthState, AuthActionTypes, AuthActions } from './types';
import { Reducer } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, PersistConfig } from "redux-persist";

const initialState: AuthState = {
	token: undefined,
	authCompleted: false,
	inProcess: false,
};

const reducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
	switch (action.type) {
		case AuthActionTypes.AUTHENTICATION_REQUEST:
			return {
				...state,
				inProcess: true,
			};
		case AuthActionTypes.AUTHENTICATION_SUCCESS:
			return {
				...state,
				inProcess: false,
				token: action.payload,
				authCompleted: true,
			};
		case AuthActionTypes.AUTHENTICATION_FAILURE:
			return {
				...state,
				inProcess: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const persistConfig : PersistConfig = {
	key: 'auth',
	storage: storage,
	blacklist: ['inProcess'],
};

export const authReducer = persistReducer(persistConfig, reducer);
