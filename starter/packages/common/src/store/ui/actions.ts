import { ShowToastAction, UIActionTypes, ClearToastAction } from './types';
import { ToastConfiguration } from '@app/types';



export const showToastAction = (toast: ToastConfiguration) : ShowToastAction => {
  return {
    type: UIActionTypes.SHOW_TOAST,
    payload:toast,
  }
}

export const clearToastAction = ():ClearToastAction => {
  return {
    type: UIActionTypes.CLEAR_TOAST,
  }
}
