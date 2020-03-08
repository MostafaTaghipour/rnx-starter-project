import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ToastConfiguration, EmptyState } from '@app/types';
import { showNativeToast } from '@app/helpers/messageHelper';
import { AllStates } from '@app/store';
import { clearToastAction } from '@app/store/ui/actions';

interface OwnProps {}

interface StateProps {
	toast?: ToastConfiguration;
}

interface DispatchProps {
	clear: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class toastr extends Component<Props, EmptyState> {
	public componentDidUpdate(prevProps: Props, _prevState: EmptyState, _snapshot: any) {
		const toast = this.props.toast;
		if (toast == null) {
			return;
		}

		if (prevProps.toast === null || toast !== prevProps.toast) {
			showNativeToast(toast);
			this.props.clear();
		}
	}

	public render() {
		return <View />;
	}
}

const mapState = (state: AllStates): StateProps => {
	return {
		toast: state.ui.toast,
	};
};

const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
	clear: () => dispatch(clearToastAction()),
});

const Toaster = connect(
	mapState,
	mapDispatch
)(toastr);

export default Toaster;
