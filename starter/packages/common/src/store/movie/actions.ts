import { MovieActionTypes, PopularMovies, Movie, MovieActions } from './types';
import { store } from '@app/store';
import { showToastAction } from '@app/store/ui/actions';
import R from '@app/res/R';
import webApi from '@app/net/webApi';
import {
	handleHttpError,
	isConnectToInternet,
	PaginationRequestState,
	AsyncActionStatus,
} from '../helpers';
import Constant from '@app/configs/const';
import { HttpError } from '@app/net/types';
import configs from '@app/configs';

export const fetchMovieAsyncAction = (
	pageNumber = Constant.PAGINATION_FIRST_PAGE_NUMBER,
	refreshing = false
) => {
	return async (dispatch: any) => {
		if (!isConnectToInternet()) return;

		const currentState: PaginationRequestState<Movie[]> = store.getState().movie.movies;

		//check if all data loaded
		if (currentState.data!.length >= currentState.total && !refreshing) return;

		//check if already loading
		if (currentState.loading || currentState.refreshing) return;

		//check is refreshing ro loading more
		const page = refreshing ? Constant.PAGINATION_FIRST_PAGE_NUMBER : pageNumber;

		var action: MovieActions = {
			type: MovieActionTypes.FETCHING_MOVIE,
			status: AsyncActionStatus.REQUEST,
			refreshing: refreshing,
			page: page,
		};
		dispatch(action);

		try {
			const response = await webApi.get<PopularMovies>('popular', {
				params: {
					api_key: configs.apiKey,
					page: page,
					pageSize: Constant.PAGINATION_PAGE_SIZE,
				},
			});

			action = {
				...action,
				status: AsyncActionStatus.SUCCESS,
				data: response.data && response.data.results ? response.data.results : [],
				total: response.data ? response.data.total_results : 0,
			};
			dispatch(action);
		} catch (error) {
			action = {
				...action,
				status: AsyncActionStatus.FAILURE,
				error: error as HttpError,
			};
			dispatch(action);

			handleHttpError(error);
		}
	};
};
