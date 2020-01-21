import { MovieActionTypes, MovieActions, Movie, MovieState } from './types';
import { Reducer } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, PersistConfig } from 'redux-persist';
import Constant from '@app/configs/const';
import { AsyncActionStatus } from '../helpers';

const initialState: MovieState = {
	movies: {
		data: [],
		error: undefined,
		page: Constant.PAGINATION_FIRST_PAGE_NUMBER,
		refreshing: false,
		loading: false,
		loaded: false,
		total: Constant.PAGINATION_DEFAULT_TOTAL,
	},
};

export const movieReducer: Reducer<MovieState, MovieActions> = (state = initialState, action) => {
	switch (action.type) {
		case MovieActionTypes.FETCHING_MOVIE:
			switch (action.status) {
				case AsyncActionStatus.REQUEST:
					return {
						...state,
						movies: {
							...state.movies,
							refreshing: action.refreshing || false,
							loading: true,
							error: undefined,
						},
					};
				case AsyncActionStatus.SUCCESS:
					const page: number = action.page || Constant.PAGINATION_FIRST_PAGE_NUMBER;
					const total: number = action.total || Constant.PAGINATION_DEFAULT_TOTAL;
					const oldData = state.movies.data || [];
					const newData = action.data;
					const data: Movie[] =
						page == Constant.PAGINATION_FIRST_PAGE_NUMBER ? newData : [...oldData, ...newData];
					return {
						...state,
						movies: {
							...state.movies,
							refreshing: false,
							loaded: true,
							loading: false,
							page,
							data,
							total,
						},
					};
				case AsyncActionStatus.FAILURE:
					return {
						...state,
						movies: {
							...state.movies,
							refreshing: false,
							loading: false,
							error: action.error,
						},
					};
			
			}
			
		default:
			return state;
	}
};

// const persistConfig : PersistConfig  = {
// 	key: 'movie',
// 	storage: storage,
// 	blacklist: ['inProcess'],
// };

// export const movieReducer = persistReducer(persistConfig, reducer);
