import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { PickerType } from './types';
import { getAppThemeType, ThemeType } from '@app/configs/theme';
import CurrentDevice from '@app/configs/device';
import Locale from '@app/configs/locales';
import R from '@app/res/R';

const isMaterial = getAppThemeType() == ThemeType.Material;
const brandColor = R.colors.brand;
const bgColor = R.colors.background;
const iosDefaultHeaderColor = '#F8F8F8';
const toolbarHeight = isMaterial ? 56 : 64;
const shadowColor = '#595959';
const cornerRadius = 16;

/* #region  modal */
const modalStyles = StyleSheet.create({
	modalContainer: {
		backgroundColor: isMaterial ? brandColor : iosDefaultHeaderColor,
		flex: 1,
		flexDirection: 'column',
		shadowColor: shadowColor,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 8,
		shadowOpacity: 0.8,
		elevation: 8,
	},
	modalContentSection: {
		flex: 1,
		backgroundColor: bgColor,
		borderBottomStartRadius: isMaterial ? 0 : cornerRadius,
		borderBottomEndRadius: isMaterial ? 0 : cornerRadius,
	},
});

export const modalWrapperStyle = (pickerType: PickerType): StyleProp<ViewStyle> => {
	return [
		R.styles.col,
		R.styles.flex_1,
		pickerType == PickerType.dialog
			? {
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center',
			  }
			: {
					justifyContent: 'flex-end',
			  },
	];
};

export const modalContainerStyle = (pickerType: PickerType): StyleProp<ViewStyle> => {
	return [
		modalStyles.modalContainer,
		pickerType == PickerType.dialog
			? {
					borderRadius: isMaterial ? 0 : cornerRadius,
					height: '80%',
					width: '90%',
					maxWidth: 400,
					maxHeight: 600,
			  }
			: pickerType == PickerType.bottomSheet
			? {
					borderTopStartRadius: isMaterial ? 0 : cornerRadius,
					borderTopEndRadius: isMaterial ? 0 : cornerRadius,
					height: '80%',
					width: '100%',
					maxHeight: 500,
			  }
			: {
					height: '100%',
					width: '100%',
			  },
	];
};

/* #endregion */

/* #region  field */
const filedStyles = StyleSheet.create({
	fieldContainer: {
		flex: 1,
		height: 50,
	},
	field: {
		flex: 1,
		width: '100%',
		alignSelf: 'flex-start',
	},
	fieldIcon: {
		fontSize: 20,
		margin: 8,
		color: R.colors.gray,
		alignSelf: 'center',
	},
});

export const fieldStyle = (): any => {
	return [
		filedStyles.field,
		{
			textAlign: CurrentDevice.Platform.isIos ? (Locale.isRTL ? 'right' : 'left') : undefined,
		},
	];
};
/* #endregion */

/* #region  picker */

const pickerStyles = StyleSheet.create({
	pickerListItem: {
		flex: 1,
		paddingEnd: 16,
		paddingStart: 16,
		paddingTop: 8,
		paddingBottom: 8,
	},
	pickerListItemText: {
		alignSelf: 'flex-start',
	},
	pickerTopSection: {
		flexDirection: 'row',
		height: toolbarHeight,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: R.colors.border,
		borderTopStartRadius: isMaterial ? 0 : cornerRadius,
		borderTopEndRadius: isMaterial ? 0 : cornerRadius,
	},
	pickerSearchField: {
		flex: 1,
		alignSelf: 'flex-start',
	},
	pickerCloseIcon: {
		fontSize: isMaterial ? 24 : 36,
		alignSelf: 'center',
	},
});

export const pickerTopSectionStyle = (pickerType: PickerType): StyleProp<ViewStyle> => {
	return [
		pickerStyles.pickerTopSection,
		pickerType == PickerType.modal
			? {
					backgroundColor: isMaterial ? brandColor : iosDefaultHeaderColor,
			  }
			: {
					backgroundColor: isMaterial ? bgColor : iosDefaultHeaderColor,
			  },
	];
};

export const pickerCloseButtonStyle = (pickerType: PickerType): any => {
	return [
		pickerStyles.pickerCloseIcon,
		pickerType == PickerType.modal
			? {
					color: isMaterial ? R.colors.white : brandColor,
			  }
			: {
					color: isMaterial ? R.colors.black : brandColor,
			  },
	];
};

export const pickerSearchField = (pickerType: PickerType): any => {
	return [
		pickerStyles.pickerSearchField,
		pickerType == PickerType.modal
			? {
					color: isMaterial ? R.colors.inverseText : R.colors.text,
			  }
			: {
					color: R.colors.text,
			  },
	];
};

export const pickerSearchFieldPlaceHolderTextColor = (
	pickerType: PickerType
): string | undefined => {
	return pickerType == PickerType.modal && isMaterial ? R.colors.silver : undefined;
};

/* #endregion */

/* #region  date picker */

const datePickerStyles = StyleSheet.create({
	datePickerTopSection: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: R.colors.border,
		borderTopStartRadius: isMaterial ? 0 : cornerRadius,
		borderTopEndRadius: isMaterial ? 0 : cornerRadius,
		padding: 16,
	},
	datePickerBottomSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: toolbarHeight,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: isMaterial ? bgColor : R.colors.border,
		borderBottomStartRadius: isMaterial ? 0 : cornerRadius,
		borderBottomEndRadius: isMaterial ? 0 : cornerRadius,
		backgroundColor: isMaterial ? bgColor : iosDefaultHeaderColor,
	},
});

export const datePickerTopSectionStyle = (pickerType: PickerType): StyleProp<ViewStyle> => {
	return [
		datePickerStyles.datePickerTopSection,
		pickerType == PickerType.dialog
			? {
					height: isMaterial ? 100 : 64,
					backgroundColor: isMaterial ? brandColor : iosDefaultHeaderColor,
			  }
			: pickerType == PickerType.bottomSheet
			? {
					height: isMaterial ? 80 : 64,
					backgroundColor: isMaterial ? bgColor : iosDefaultHeaderColor,
			  }
			: {
					height: isMaterial ? 100 : 64,
					backgroundColor: isMaterial ? brandColor : iosDefaultHeaderColor,
			  },
		isMaterial
			? {
					flexDirection: 'column-reverse',
					alignItems: 'flex-start',
					justifyContent: 'space-around',
			  }
			: {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
			  },
	];
};

export const datePickerTopSectionDayTextStyle = (
	pickerType: PickerType,
	isActive: boolean
): any => {
	return [
		{
			fontFamily: isActive ? R.fonts.bold : R.fonts.medium,
			fontSize: isActive ? 19 : 16,
		},
		pickerType == PickerType.bottomSheet
			? {
					color: isActive ? R.colors.black : R.colors.gray,
			  }
			: {
					color: isMaterial
						? isActive
							? R.colors.white
							: R.colors.silver
						: isActive
						? R.colors.black
						: R.colors.gray,
			  },
	];
};

export const datePickerTopSectionYearTextStyle = (
	pickerType: PickerType,
	isActive: boolean
): any => {
	return [
		{
			fontFamily: isActive ? R.fonts.bold : R.fonts.medium,
			fontSize: isActive ? 19 : 16,
		},
		pickerType == PickerType.bottomSheet
			? {
					color: isActive ? R.colors.black : R.colors.gray,
			  }
			: {
					color: isMaterial
						? isActive
							? R.colors.white
							: R.colors.silver
						: isActive
						? R.colors.black
						: R.colors.gray,
			  },
	];
};

export const datePickerBottomSectionStyle = (pickerType: PickerType): StyleProp<ViewStyle> => {
	return [
		datePickerStyles.datePickerBottomSection,
		pickerType == PickerType.dialog
			? {
					backgroundColor: isMaterial ? bgColor : iosDefaultHeaderColor,
			  }
			: pickerType == PickerType.bottomSheet
			? {
					backgroundColor: bgColor,
			  }
			: {
					backgroundColor: isMaterial ? bgColor : iosDefaultHeaderColor,
			  },
	];
};

export const pickerModalSafeAreaInsets = (pickerType: PickerType): any => {
	return { bottom: 'never', top: pickerType == PickerType.modal ? 'always' : 'never' };
};

export const datePickerModalSafeAreaInsets = (pickerType: PickerType): any => {
	return {
		bottom: pickerType == PickerType.modal ? 'always' : 'never',
		top: pickerType == PickerType.modal ? 'always' : 'never',
	};
};
/* #endregion */

const styles = {
	...modalStyles,
	...filedStyles,
	...pickerStyles,
	...datePickerStyles,
};
export default styles;
