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


export type iconType =
	| 'AntDesign'
	| 'Entypo'
	| 'EvilIcons'
	| 'Feather'
	| 'FontAwesome'
	| 'FontAwesome5'
	| 'Foundation'
	| 'Ionicons'
	| 'MaterialCommunityIcons'
	| 'MaterialIcons'
	| 'Octicons'
	| 'SimpleLineIcons'
	| 'Zocial';


export type TextAlign = "auto" | "left" | "right" | "center" | "justify"
export type ItemAlign = "stretch" | "flex-start" | "flex-end" | "enter" | "baseline"
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type AlignContent = 'flex-start'| 'flex-end'| 'center'| 'stretch'| 'space-between'| 'space-around'
export type JustifyContent = 'flex-start'| 'flex-end'| 'center'| 'space-between'| 'space-around'| 'space-evenly'

