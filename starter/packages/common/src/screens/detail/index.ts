import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { DetailComponent } from './component';
import { Movie } from '@app/store/movie/types';
import { AllStates } from '@app/store';

interface Params {
	id?: string;
	title?: string;
}

export type NavigationProps = NavigationScreenProps<Params>;

interface OwnProps {
	navigation: NavigationScreenProp<Params, any>;
}

interface StateProps {
	movie?: Movie;
}

interface DispatchProps {}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {}

const mapState = (state: AllStates, props: OwnProps): StateProps => {
	const { id } = props.navigation.state.params;
	const movie: Movie | undefined = state.movie.movies.data
		? state.movie.movies.data.find(it => it.id == id)
		: undefined;
	return {
		movie: movie,
	};
};

const mapDispatch = (): DispatchProps => ({});

const DetailScreen = connect(
	mapState,
	mapDispatch
)(DetailComponent);

export default DetailScreen;
