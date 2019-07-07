import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import HomeComponent from './component';
import { Movie } from '@app/store/movie/types';
import { AllStates } from '@app/store';
import { fetchMovieAsync } from '@app/store/movie/actions';

interface OwnProps {
	navigation: NavigationScreenProp<any, any>;
}

interface StateProps {
	movies: Movie[];
	moviesFetched: boolean;
	isFetching: boolean;
	error: any;
}

interface DispatchProps {
	fetchData: () => void;
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State{}

const mapState = (state: AllStates): StateProps => {
	
	return {
		movies: state.movie.movies,
		moviesFetched: state.movie.moviesFetched,
		isFetching: state.movie.isFetching,
		error: state.movie.error,
	};
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
	fetchData: () => dispatch(fetchMovieAsync()),
});

const HomeScreen = connect(
	mapState,
	mapDispatch
)(HomeComponent);

export default HomeScreen;
