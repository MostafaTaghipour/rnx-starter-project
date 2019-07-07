import { connect } from 'react-redux';
import SplashComponent from './component';

interface OwnProps {
}

interface DispatchProps {}

interface StateProps {
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {
}

const mapState = (): StateProps => {
	return {

	};
};

const mapDispatch = (): DispatchProps => ({});

const SplashScreen = connect(
	mapState,
	mapDispatch
)(SplashComponent);

export default SplashScreen;
