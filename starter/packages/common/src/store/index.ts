import { AppState } from './app/types';
import { applyMiddleware, combineReducers, createStore, Store, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { MovieState } from './movie/types';
import { UIState } from './ui/types';
import { uiReducer } from './ui/reducer';
import { movieReducer } from './movie/reducer';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appReducer } from './app/reducer';
import { AuthState } from './auth/types';
import { authReducer } from './auth/reducer';
import { AsyncActionStatus } from './helpers';



/* #region  Reducers */
export interface AllStates {
	readonly app:AppState,
	readonly auth:AuthState,
	readonly ui: UIState;
	readonly movie: MovieState;
}


const rootReducer = combineReducers({
	app : appReducer,
	auth : authReducer,
	ui: uiReducer,
	movie: movieReducer,
});

/* #endregion */

/* #region  MiddleWares */
let middleWares: Middleware[] = [thunk];


/* #region  Logger */
const actionTransformer = (action: any) => {
	const status = action.status as AsyncActionStatus;
	if (status) {
		action.type = `${action.type}_${status}`;
	}
	return action;
};

const titleFormatter = (action: any, time: string, took: number): string => {
	const parts = ['action => '];

	var type = action.type;
	const status = action.status as AsyncActionStatus;
	if (status) {
		type = `${type}_${status}`;
	}

	parts.push(`${String(type)}`);
	parts.push(`@ ${time}`);
	parts.push(`(in ${took.toFixed(2)} ms)`);

	return parts.join(' ');
};

const logger = createLogger({
	//actionTransformer,
	titleFormatter,
	// ...options
});
if (__DEV__) {
	middleWares.push(logger);
}
/* #endregion */



/* #endregion */

/* #region  Persist */
const persistConfig:PersistConfig = {
	key: 'root',
	storage: storage,
	whitelist: [],
	//@ts-ignore
	timeout:null
};
const prsReducer = persistReducer(persistConfig, rootReducer);
/* #endregion */

export const store = createStore(prsReducer, applyMiddleware(...middleWares));
export const persistor = persistStore(store);
