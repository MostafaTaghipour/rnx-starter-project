import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import HomeComponent from './component';
import { Movie } from '@app/store/movie/types';
import { AllStates } from '@app/store';
import { fetchMovieAsyncAction } from '@app/store/movie/actions';

interface OwnProps {
	navigation: NavigationScreenProp<any, any>;
}

interface StateProps {
	data: Movie[];
	error?: any;
	refreshing: boolean;
	loading: boolean;
	loaded: boolean;
	lastPage: number;
}

interface DispatchProps {
	fetchData: (pageNumber?: number, refreshing?: boolean) => void;
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {}

const mapState = (state: AllStates): StateProps => {
	return {
		data: state.movie.movies.data || [],
		error: state.movie.movies.error,
		refreshing: state.movie.movies.refreshing,
		loading: state.movie.movies.loading,
		loaded: state.movie.movies.loaded,
		lastPage: state.movie.movies.page,
	};
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
	fetchData: (pageNumber?: number, refreshing?: boolean) =>
		dispatch(fetchMovieAsyncAction(pageNumber, refreshing)),
});

const HomeScreen = connect(
	mapState,
	mapDispatch
)(HomeComponent);

export default HomeScreen;
