import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import RootComponent from './component';
import { Animated } from 'react-native';
import { AllStates } from '@app/store';
import { ScreenSize } from '@app/configs/device';
import { setScreenSize, setLandscapeState } from '@app/store/app/actions';

interface OwnProps {}

interface DispatchProps {
	setLandscapeState: (isLandscape: boolean) => any;
	setScreenSize: (screenSize: ScreenSize) => any;
}

interface StateProps {
	isConnectToInternet: boolean;
	token?: string;
	locale: string;
	nightMode: boolean;
	isLandscape: boolean;
	screenSize: ScreenSize;
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {
	bannerAnim: Animated.Value;
}

const mapState = (state: AllStates): StateProps => {
	return {
		isConnectToInternet: state.app.isConnectToInternet,
		token: state.auth.token,
		locale: state.app.locale,
		nightMode: state.app.nightMode,
		isLandscape: state.app.isLandscape,
		screenSize: state.app.screenSize,
	};
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
	setLandscapeState: (isLandscape: boolean) => dispatch(setLandscapeState(isLandscape)),
	setScreenSize: (screenSize: ScreenSize) => dispatch(setScreenSize(screenSize)),
});

const RootScreen = connect(
	mapState,
	mapDispatch
)(RootComponent);

export default RootScreen;
