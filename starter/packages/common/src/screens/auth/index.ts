import { NavigationScreenProp } from 'react-navigation';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import AuthComponent from './component';
import { SignInModel } from '@app/store/auth/types';
import { AllStates } from '@app/store';
import { signInAsyncAction } from '@app/store/auth/actions';


interface OwnProps {
	navigation: NavigationScreenProp<any, any>;
}

interface StateProps {
	inProgress:boolean
}

interface DispatchProps {
	signIn: (signInModel: SignInModel) => void;
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {
	form: {
		email: {
			value: string;
			touched: boolean;
			error?: string;
			required : boolean
		};
		password: {
			value: string;
			touched: boolean;
			error?: string;
			required : boolean
		};
	};
}

const mapState = (state: AllStates): StateProps => {
	return {
		inProgress: state.auth.inProcess
	};
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
	signIn: (signInModel: SignInModel) => dispatch(signInAsyncAction(signInModel)),
});

const AuthScreen = connect(
	mapState,
	mapDispatch
)(AuthComponent);

export default AuthScreen;
