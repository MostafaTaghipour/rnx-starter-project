
import { MovieActionTypes, PopularMovies } from './types';
import { store } from '@app/store';
import webApi, { API_KEY } from '@app/configs/webApi';
import { showToast } from '@app/store/ui/actions';
import R from '@app/res/R';



export const fetchMovieAsync = (/*parameter*/) => {
	return (dispatch: any) => {
		//@ts-ignore
		if (!store.getState().app.isConnectToInternet) return;

		// loading
		dispatch({ type: MovieActionTypes.FETCHING_MOVIE });

		webApi
			.get<PopularMovies>('popular', {
				params: {
					api_key: API_KEY,
				},
			})
			.then(response => {
				dispatch({
					type: MovieActionTypes.FETCHING_MOVIE_SUCCESS,
					payload: response.data.results,
				});
			})
			.catch(error => {
				console.error(error);
				// failed
				dispatch({
					type: MovieActionTypes.FETCHING_MOVIE_FAILURE,
					payload: error,
				});

				dispatch(
					showToast({
						text: R.strings('error.general'),
						type: 'danger',
					})
				);
			});
	};
};
