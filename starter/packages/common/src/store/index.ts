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



/* #region  Reducers */
export interface AllStates {
	readonly app:AppState,
	readonly auth:AuthState,
	readonly ui: UIState;
	readonly movie: MovieState;
}


const rootReducer = combineReducers<AllStates>({
	//@ts-ignore
	app : appReducer,
	//@ts-ignore
	auth : authReducer,
	ui: uiReducer,
	//@ts-ignore
	movie: movieReducer,
});

/* #endregion */

/* #region  MiddleWares */
let middleWares: Middleware[] = [thunk];

/* #region  Logger */
const logger = createLogger({
	// ...options
});
if (__DEV__ === true) {
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
