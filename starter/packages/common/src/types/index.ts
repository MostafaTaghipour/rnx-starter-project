import { RnTextStyleProp, RnViewStyleProp } from 'native-base';

export interface EmptyState {}

export interface EmptyProps {}

export interface ToastConfiguration {
	text: string;
	buttonText?: string;
	position?: 'top' | 'bottom' | 'center';
	type?: 'danger' | 'success' | 'warning';
	duration?: number;
	onClose?: (reason: 'user' | 'timeout' | 'functionCall') => any;
	textStyle?: RnTextStyleProp;
	buttonTextStyle?: RnTextStyleProp;
	buttonStyle?: RnViewStyleProp;
}

export interface ConfirmConfiguration {
	title?: string;
	message: string;
	positiveButtonTitle?: string;
	negativeButtonTitle?: string;
	onPositiveButtonPress?: () => any;
	onNegativeButtonPress?: () => any;
}

export interface AlertConfiguration {
	title?: string;
	message: string;
	buttonTitle?: string;
	onButtonPress?: () => any;
}

