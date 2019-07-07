import { MovieState, MovieActionTypes, MovieActions } from "./types";
import { Reducer } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";


const initialState : MovieState = {
  movies: [],
  moviesFetched: false,
  isFetching: false,
  error: null,
}

const reducer: Reducer<MovieState, MovieActions> = (
  state = initialState,
  action
) => {
    switch (action.type) {
    case MovieActionTypes.FETCHING_MOVIE:
      return {
        ...state,
        isFetching: true,
      }
    case MovieActionTypes.FETCHING_MOVIE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movies: action.payload,
        moviesFetched: true,
      }
    case MovieActionTypes.FETCHING_MOVIE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    default:
      return state
  }
};

const persistConfig = {
	key: 'movie',
	storage: storage,
	blacklist: ['inProcess'],
};

export const movieReducer = persistReducer(persistConfig, reducer);
