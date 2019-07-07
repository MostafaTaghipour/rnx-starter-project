import { ShowToastAction, UIActionTypes, ClearToastAction } from './types';
import { ToastConfiguration } from '@app/types';



export const showToast = (toast: ToastConfiguration) : ShowToastAction => {
  return {
    type: UIActionTypes.SHOW_TOAST,
    payload:toast,
  }
}

export const clearToast = ():ClearToastAction => {
  return {
    type: UIActionTypes.CLEAR_TOAST,
  }
}
