import { UIState, UIActions, UIActionTypes } from './types';
import { Reducer } from 'redux';

const initialState: UIState = {
	toast: undefined,
};

export const uiReducer: Reducer<UIState, UIActions> = (state = initialState, action) => {
	switch (action.type) {
		case UIActionTypes.SHOW_TOAST:
			return {
				...state,
				toast: action.payload,
			};
		case UIActionTypes.CLEAR_TOAST:
			return {
				...state,
				toast: undefined,
			};

		default:
			return state;
	}
};
