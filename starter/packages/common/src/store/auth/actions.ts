import { AuthActionTypes, SignInModel } from './types';
import { store } from '@app/store';
import { ToastConfiguration } from '@app/types';
import { showToast } from '@app/store/ui/actions';
import R from '@app/res/R';


export const signInAsync = (signInModel : SignInModel) => {
	return (dispatch: any) => {
		//@ts-ignore
		if (!store.getState().app.isConnectToInternet) return;

		// loading
		dispatch({ type: AuthActionTypes.AUTHENTICATION_REQUEST });

		const error = undefined;
		setTimeout(() => {
			if (error) {
				console.error(error);
				// failed
				dispatch({
					type: AuthActionTypes.AUTHENTICATION_FAILURE,
					payload: error,
				});

				const toast: ToastConfiguration = {
					text: R.strings('error.general'),
					textStyle: { fontFamily: R.fonts.default, textAlign: 'center' },
					type: 'danger',
				};
				dispatch(showToast(toast));
			} else {
				dispatch({
					type: AuthActionTypes.AUTHENTICATION_SUCCESS,
					payload: 'sample_token',
				});

				
			}
		}, 3000);
	};
};
