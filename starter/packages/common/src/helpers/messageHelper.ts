import { RnTextStyleProp, RnViewStyleProp, Toast } from 'native-base';
import { Alert } from 'react-native';
import { ToastConfiguration, AlertConfiguration, ConfirmConfiguration } from '@app/types';
import CurrentDevice from '@app/configs/device';
import R from '@app/res/R';

/* #region  Toast */
export class NativeToast {
	private _text: string = '';
	private _buttonText?: string;
	private _position?: 'top' | 'bottom' | 'center' = 'bottom';
	private _type?: 'danger' | 'success' | 'warning';
	private _duration?: number;
	private _onClose?: (reason: 'user' | 'timeout' | 'functionCall') => any;
	private _textStyle?: RnTextStyleProp = {
		fontFamily: R.fonts.regular,
		fontSize: 14,
		textAlign: 'center',
	};
	private _buttonTextStyle?: RnTextStyleProp = { fontFamily: R.fonts.bold };
	private _buttonStyle?: RnViewStyleProp;

	public constructor(text: string) {
		this._text = text;
	}

	public setButtonText(text: string) {
		this._buttonText = text;
		return this;
	}

	public setPosition(position: 'top' | 'bottom' | 'center') {
		this._position = position;
		return this;
	}

	public setType(type: 'danger' | 'success' | 'warning') {
		this._type = type;
		return this;
	}

	public setDuration(duration: number) {
		this._duration = duration;
		return this;
	}

	public setTextStyle(textStyle: RnTextStyleProp) {
		this._textStyle = textStyle;
		return this;
	}
	public setButtonTextStyle(textStyle: RnTextStyleProp) {
		this._buttonTextStyle = textStyle;
		return this;
	}
	public setButtonStyle(buttonStyle: RnTextStyleProp) {
		this._buttonStyle = buttonStyle;
		return this;
	}

	public onClose(onClose: (reason: 'user' | 'timeout' | 'functionCall') => any) {
		this._onClose = onClose;
		return this;
	}

	public show() {
		Toast.show({
			text: this._text,
			buttonText: this._buttonText,
			position: this._position,
			type: this._type,
			duration: this._duration,
			onClose: this._onClose,
			textStyle: this._textStyle,
			buttonTextStyle: this._buttonTextStyle,
			buttonStyle: this._buttonStyle,
		});
	}
}

export const showNativeToast = (config: ToastConfiguration) => {
	var toast = new NativeToast(config.text);

	if (config.buttonStyle) toast.setButtonStyle(config.buttonStyle);
	if (config.buttonText) toast.setButtonText(config.buttonText);
	if (config.buttonTextStyle) toast.setButtonTextStyle(config.buttonTextStyle);
	if (config.duration) toast.setDuration(config.duration);
	if (config.onClose) toast.onClose(config.onClose);
	if (config.position) toast.setPosition(config.position);
	if (config.textStyle) toast.setTextStyle(config.textStyle);
	if (config.type) toast.setType(config.type);

	toast.show();
};
/* #endregion */

/* #region  Alert */
export class NativeAlert {
	private _title: string = '';
	private readonly _message: string;
	private _buttonTitle: string = 'OK';
	private _onButtonPress?: () => any;

	public constructor(message: string) {
		this._message = message;
	}

	public setTitle(title: string) {
		this._title = title;
		return this;
	}

	public setButtonTitle(title: string) {
		this._buttonTitle = title;
		return this;
	}

	public onButtonPress(onPress: () => any) {
		this._onButtonPress = onPress;
		return this;
	}

	public show() {
		if (CurrentDevice.Platform.isNative) {
			Alert.alert(
				this._title,
				this._message,
				[{ text: this._buttonTitle, onPress: () => this._onButtonPress }],
				{ cancelable: false }
			);
		} else {
			alert(`${this._title}\n${this._message}`);
			if (this._onButtonPress) this._onButtonPress();
		}
	}
}

export const showNativeAlert = (config: AlertConfiguration) => {
	var alert = new NativeAlert(config.message);

	if (config.title) alert.setTitle(config.title);
	if (config.buttonTitle) alert.setButtonTitle(config.buttonTitle);
	if (config.onButtonPress) alert.onButtonPress(config.onButtonPress);

	alert.show();
};

/* #endregion */

/* #region  Confirm */
export class NativeConfirm {
	private _title: string = '';
	private readonly _message: string;
	private _positiveButtonTitle: string = 'Yes';
	private _negativeButtonTitle: string = 'No';
	private _onPositiveButtonPress: () => any = () => {};
	private _onNegativeButtonPress: () => any = () => {};

	public constructor(message: string) {
		this._message = message;
	}

	public setTitle(title: string) {
		this._title = title;
		return this;
	}

	public setPositiveButtonTitle(title: string) {
		this._positiveButtonTitle = title;
		return this;
	}
	public setNegativeButtonTitle(title: string) {
		this._negativeButtonTitle = title;
		return this;
	}

	public onPositiveButtonPress(onPress: () => any) {
		this._onPositiveButtonPress = onPress;
		return this;
	}

	public onNegativeButtonPress(onPress: () => any) {
		this._onNegativeButtonPress = onPress;
		return this;
	}

	public show() {
		if (CurrentDevice.Platform.isNative) {
			Alert.alert(
				this._title,
				this._message,
				[
					{ text: this._positiveButtonTitle, onPress: () => this._onPositiveButtonPress() },
					{ text: this._negativeButtonTitle, onPress: () => this._onNegativeButtonPress() },
				],
				{ cancelable: false }
			);
		} else {
			const res = window.confirm(`${this._title}\n${this._message}`);
			if (res) this._onPositiveButtonPress();
			else this._onNegativeButtonPress();
		}
	}
}

export const showNativeConfirm = (config: ConfirmConfiguration) => {
	var confirm = new NativeConfirm(config.message);

	if (config.title) confirm.setTitle(config.title);
	if (config.negativeButtonTitle) confirm.setNegativeButtonTitle(config.negativeButtonTitle);
	if (config.positiveButtonTitle) confirm.setPositiveButtonTitle(config.positiveButtonTitle);
	if (config.onNegativeButtonPress) confirm.onNegativeButtonPress(config.onNegativeButtonPress);
	if (config.onPositiveButtonPress) confirm.onPositiveButtonPress(config.onPositiveButtonPress);

	confirm.show();
};

/* #endregion */
