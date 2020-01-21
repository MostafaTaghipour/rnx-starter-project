import { Action } from 'redux';
import { PaginationRequestState, ApiPaginationAction } from '../helpers';

export interface PopularMovies {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface Movie {
	id: number;
	poster_path: string;
	overview: string;
	release_date: string;
	original_language: string;
	title: string;
	backdrop_path: string;
}

export interface MovieState {
	movies: PaginationRequestState<Movie[]>;
}

// actions
export enum MovieActionTypes {
	FETCHING_MOVIE = 'FETCHING_MOVIE',
}

export interface FetchingMoviesAction
	extends ApiPaginationAction<MovieActionTypes.FETCHING_MOVIE, Movie[]> {}

export type MovieActions = FetchingMoviesAction;
