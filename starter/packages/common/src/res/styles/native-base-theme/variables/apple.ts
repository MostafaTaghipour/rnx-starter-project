/* eslint-disable @typescript-eslint/no-var-requires */
// @flow
// https://github.com/GeekyAnts/native-base-docs/blob/master/docs/Theme.md
// https://codeburst.io/customizing-nativebase-the-missing-examples-part-1-2fff2bdc0120
// https://codeburst.io/customizing-nativebase-the-missing-examples-part-2-5a4cfcf15414
import { Platform, Dimensions, PixelRatio } from 'react-native';
import R from '@app/res/R';
import Constant from '@app/configs/const';
import Locale from '@app/configs/locales';
import CurrentDevice, { DeviceOS } from '@app/configs/device';

const color = require('color');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'apple';
const isPWAiPhoneX =
	CurrentDevice.Platform.isPWA &&
	CurrentDevice.OS.type === DeviceOS.iOS &&
	CurrentDevice.Info.isIphoneX;
const isNativeIphoneX = CurrentDevice.Platform.isIos && CurrentDevice.Info.isIphoneX;

export default {
	platformStyle,
	platform,

	//Accordion
	headerStyle: '#edebed',
	iconStyle: '#000',
	contentStyle: '#f5f4f5',
	expandedIconStyle: '#000',
	accordionBorderColor: '#d3d3d3',

	// Android
	androidRipple: false,
	androidRippleColor: undefined,
	androidRippleColorDark: undefined,
	// btnUppercaseAndroidText: false,

	// Badge
	badgeBg: '#ED1727',
	badgeColor: '#fff',
	badgePadding: 3,

	// Button
	get btnFontFamily() {
		return R.fonts.medium;
	},
	btnDisabledBg: '#b5b5b5',
	buttonPadding: 6,
	buttonTransparentByDefault: true,
	get btnPrimaryBg() {
		return this.brandPrimary;
	},
	get btnPrimaryColor() {
		return this.inverseTextColor;
	},
	get btnInfoBg() {
		return this.brandInfo;
	},
	get btnInfoColor() {
		return this.inverseTextColor;
	},
	get btnSuccessBg() {
		return this.brandSuccess;
	},
	get btnSuccessColor() {
		return this.inverseTextColor;
	},
	get btnDangerBg() {
		return this.brandDanger;
	},
	get btnDangerColor() {
		return this.inverseTextColor;
	},
	get btnWarningBg() {
		return this.brandWarning;
	},
	get btnWarningColor() {
		return this.inverseTextColor;
	},
	get btnTextSize() {
		return this.fontSizeBase * 1.1;
	},
	get btnTextSizeLarge() {
		return this.fontSizeBase * 1.5;
	},
	get btnTextSizeSmall() {
		return this.fontSizeBase * 0.8;
	},
	get borderRadiusLarge() {
		return this.fontSizeBase * 3.8;
	},
	get iconSizeLarge() {
		return this.iconFontSize * 1.5;
	},
	get iconSizeSmall() {
		return this.iconFontSize * 0.6;
	},

	// Card
	cardDefaultBg: '#fff',
	cardBorderColor: '#ccc',
	cardBorderRadius: 2,
	cardItemPadding: 10,

	// CheckBox
	CheckboxRadius: 13,
	CheckboxBorderWidth: 1,
	CheckboxPaddingLeft: 4,
	CheckboxPaddingBottom: 0,
	CheckboxIconSize: 21,
	CheckboxIconMarginTop: undefined,
	CheckboxFontSize: 23 / 0.9,
	get checkboxBgColor() {
		return R.colors.brand;
	},
	checkboxSize: 20,
	checkboxTickColor: '#fff',

	// Color
	get brandPrimary() {
		return R.colors.brand;
	},
	get brandInfo() {
		return R.colors.info;
	},
	get brandSuccess() {
		return R.colors.success;
	},
	get brandDanger() {
		return R.colors.danger;
	},
	get brandWarning() {
		return R.colors.warning;
	},
	brandDark: '#000',
	brandLight: '#f4f4f4',

	//Container
	get containerBgColor() {
		return R.colors.background;
	},

	//Date Picker
	datePickerTextColor: '#000',
	datePickerBg: 'transparent',

	// Font
	DefaultFontSize: 16,
	get fontFamily() {
		return R.fonts.default;
	},
	fontSizeBase: 15,
	get fontSizeH1() {
		return this.fontSizeBase * 1.8;
	},
	get fontSizeH2() {
		return this.fontSizeBase * 1.6;
	},
	get fontSizeH3() {
		return this.fontSizeBase * 1.4;
	},

	// Footer
	footerHeight: 55,
	footerDefaultBg: '#F8F8F8',
	footerPaddingBottom: 0,
	footerBorderColor: '#cbcbcb',
	footerBorderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),

	// FooterTab
	tabBarTextColor: '#6b6b6b',
	tabBarTextSize: 14,
	get activeTab() {
		return R.colors.brand;
	},
	get sTabBarActiveTextColor() {
		return R.colors.brand;
	},
	get tabBarActiveTextColor() {
		return R.colors.brand;
	},
	tabActiveBgColor: 'transparent',

	// Header
	get toolbarBtnColor() {
		return R.colors.brand;
	},
	toolbarDefaultBg: '#F8F8F8',
	toolbarHeight: 64,
	toolbarSearchIconSize: 20,
	toolbarInputColor: '#CECDD2',
	searchBarHeight: 30,
	searchBarInputHeight: 30,
	get toolbarBtnTextColor() {
		return R.colors.brand;
	},
	toolbarBorderColor: '#cbcbcb',
	toolbarBorderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
	iosStatusbar: 'dark-content',
	get statusBarColor() {
		return color(this.toolbarDefaultBg)
			.darken(0.2)
			.hex();
	},
	get darkenHeader() {
		return color(this.tabBgColor)
			.darken(0.03)
			.hex();
	},

	// Icon
	iconFamily: Constant.DEFAULT_ICON_FAMILY,
	iconFontSize: 30,
	iconHeaderSize: 33,
	iconColor: '#000',

	// InputGroup
	inputFontSize: 17,
	inputBorderColor: '#D9D5DC',
	inputSuccessBorderColor: '#2b8339',
	inputErrorBorderColor: '#ed2f2f',
	inputHeightBase: 50,
	get inputColor() {
		return this.textColor;
	},
	get inputColorPlaceholder() {
		return '#575757';
	},

	// Line Height
	btnLineHeight: 19,
	lineHeightH1: 32,
	lineHeightH2: 27,
	lineHeightH3: 22,
	lineHeight: 20,
	get listItemSelected() {
		return R.colors.brand;
	},

	// List
	listBg: 'transparent',
	listBorderColor: '#c9c9c9',
	listDividerBg: '#f4f4f4',
	listBtnUnderlayColor: '#DDD',
	listItemPadding: 10,
	listNoteColor: '#808080',
	listNoteSize: 13,
	listSeparatorBackgroundColor: '#F0EFF5',
	listSeparatorTextColor: '#777',

	// Progress Bar
	get defaultProgressColor() {
		return R.colors.brand;
	},
	inverseProgressColor: '#1A191B',

	// Toast
	toastBgColor: 'rgba(0,0,0,0.8)',
	toastTextColor: '#fff',

	// Radio Button
	radioBtnSize: 25,
	radioColor: 'transparent',
	get radioSelectedColorAndroid() {
		return R.colors.brand;
	},
	radioBtnLineHeight: 29,
	get radioSelectedColor() {
		return this.brandPrimary;
	},

	// Segment
	segmentBackgroundColor: 'transparent',
	get segmentActiveBackgroundColor() {
		return R.colors.brand;
	},
	get segmentTextColor() {
		return R.colors.brand;
	},
	segmentActiveTextColor: '#fff',
	get segmentBorderColor() {
		return R.colors.brand;
	},
	segmentBorderColorMain: '#a7a6ab',

	// Spinner
	get defaultSpinnerColor() {
		return R.colors.brand;
	},
	inverseSpinnerColor: '#1A191B',

	// Tab
	tabDefaultBg: '#F8F8F8',
	topTabBarTextColor: '#6b6b6b',
	get topTabBarActiveTextColor() {
		return R.colors.brand;
	},
	topTabBarBorderColor: '#a7a6ab',
	get topTabBarActiveBorderColor() {
		return R.colors.brand;
	},

	// Tabs
	tabBgColor: '#F8F8F8',
	tabFontSize: 15,

	// Text
	get textColor() {
		return R.colors.text;
	},
	get inverseTextColor() {
		return R.colors.inverseText;
	},
	// textAlign: 'auto',
	// textAlignSelf: 'auto',
	noteFontSize: 14,
	get textDirection() {
		return Locale.isRTL ? 'rtl' : 'ltr';
	},
	get defaultTextColor() {
		return this.textColor;
	},

	// Title
	get titleFontfamily() {
		return R.fonts.medium;
	},
	titleFontSize: 17,
	subTitleFontSize: 11,
	subtitleColor: '#8e8e93',
	titleFontColor: '#000',

	// Other
	borderRadiusBase: 5,
	borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
	contentPadding: 10,
	dropdownLinkColor: '#414142',
	inputLineHeight: 24,
	deviceWidth: CurrentDevice.Dimension.windowWidth,
	deviceHeight: CurrentDevice.Dimension.windowHeight,
	isPWAiPhoneX,
	isNativeIphoneX: isNativeIphoneX,
	isIphoneX: isPWAiPhoneX || isNativeIphoneX,
	inputGroupRoundedBorderRadius: 30,

	//iPhoneX SafeArea
	Inset: {
		portrait: {
			topInset: 24,
			leftInset: 0,
			rightInset: 0,
			bottomInset: 34,
		},
		landscape: {
			topInset: 0,
			leftInset: 44,
			rightInset: 44,
			bottomInset: 21,
		},
	},

	//Custom.Hr
	get hrLineHeight() {
		return this.borderWidth;
	},
	get hrLineColor() {
		return R.colors.border;
	},
	get hrTextColor() {
		return R.colors.text;
	},
};
