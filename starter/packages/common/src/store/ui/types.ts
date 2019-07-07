import { Action } from 'redux';
import { ToastConfiguration } from '@app/types';




export interface UIState {
  toast?: ToastConfiguration
}


// actions
export enum UIActionTypes {
    SHOW_TOAST = 'SHOW_TOAST',
    CLEAR_TOAST = 'CLEAR_TOAST'
}

export interface ShowToastAction extends Action<UIActionTypes.SHOW_TOAST>{
	payload: ToastConfiguration
}

export interface ClearToastAction extends Action<UIActionTypes.CLEAR_TOAST>{}


export type UIActions = ShowToastAction | ClearToastAction 
