import { Action } from 'redux';

export interface Movie {
	id: number;
	poster_path: string;
	overview: string;
	release_date: string;
	original_language: string;
	title: string;
	backdrop_path: string;
}

export interface PopularMovies {
	results: Movie[];
}

export interface MovieState {
	movies: Movie[];
	moviesFetched: boolean;
	isFetching: boolean;
	error: any;
}

// actions
export enum MovieActionTypes {
	FETCHING_MOVIE = 'FETCHING_MOVIE',
	FETCHING_MOVIE_SUCCESS = 'FETCHING_MOVIE_SUCCESS',
	FETCHING_MOVIE_FAILURE = 'FETCHING_MOVIE_FAILURE',
}

export interface FetchingMoviesAction extends Action<MovieActionTypes.FETCHING_MOVIE> {}

export interface FetchingMoviesSuccessAction extends Action<MovieActionTypes.FETCHING_MOVIE_SUCCESS>{
	payload: Movie[];
}

export interface FetchingMoviesFailureAction extends Action<MovieActionTypes.FETCHING_MOVIE_FAILURE>{
	payload: any;
}

export type MovieActions = FetchingMoviesAction | FetchingMoviesSuccessAction | FetchingMoviesFailureAction;
