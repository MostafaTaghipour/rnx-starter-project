import { StyleProp, TextStyle } from "react-native";

export enum PickerType {
	modal = 'modal',
	dialog = 'dialog',
	bottomSheet = 'bottomSheet',
}

export interface FieldProps {
	placeholder?: string;
	placeholderTextColor?: string;
	fieldStyle?: StyleProp<TextStyle>;
}

export interface IconProps {
	iconName?: string;
	iconStyle?: StyleProp<TextStyle>;
}
