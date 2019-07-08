// @flow
// https://github.com/GeekyAnts/native-base-docs/blob/master/docs/Theme.md
import { Platform, Dimensions, PixelRatio } from 'react-native';
import R from '@app/res/R';
import Constant from '@app/configs/const';
import Locale from '@app/configs/locales';

const color = require('color');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';
const isIphoneX =
	platform === 'ios' &&
	(deviceHeight === 812 || deviceWidth === 812 || deviceHeight === 896 || deviceWidth === 896);

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
	androidRipple: true,
	androidRippleColor: 'rgba(256, 256, 256, 0.3)',
	androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
	btnUppercaseAndroidText: true,

	// Badge
	badgeBg: '#ED1727',
	badgeColor: '#fff',
	badgePadding: 0,

	// Button
	get btnFontFamily() {
		return R.fonts.medium;
	},
	btnDisabledBg: '#b5b5b5',
	buttonPadding: 6,
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
		return this.fontSizeBase - 1;
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
	cardItemPadding: platform === 'ios' ? 10 : 12,

	// CheckBox
	CheckboxRadius: 0,
	CheckboxBorderWidth: 2,
	CheckboxPaddingLeft: 2,
	CheckboxPaddingBottom: 5,
	CheckboxIconSize: 16,
	CheckboxIconMarginTop: 1,
	CheckboxFontSize: 17,
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
	get brandDark() {
		return '#000';
	},
	get brandLight() {
		return '#f4f4f4';
	},

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
	get footerDefaultBg() {
		return R.colors.brand;
	},
	footerPaddingBottom: 0,
	footerBorderColor: undefined,
	footerBorderWidth: 0,

	// FooterTab
	tabBarTextColor: '#bfc6ea',
	tabBarTextSize: 11,
	activeTab: '#fff',
	get sTabBarActiveTextColor() {
		return R.colors.brand;
	},
	tabBarActiveTextColor: '#fff',
	get tabActiveBgColor() {
		return R.colors.brand;
	},

	// Header
	toolbarBtnColor: '#fff',
	get toolbarDefaultBg() {
		return R.colors.brand;
	},
	toolbarHeight: 56,
	toolbarSearchIconSize: 23,
	toolbarInputColor: '#fff',
	searchBarHeight: platform === 'ios' ? 30 : 40,
	searchBarInputHeight: platform === 'ios' ? 40 : 50,
	toolbarBtnTextColor: '#fff',
	toolbarBorderColor: undefined,
	toolbarBorderWidth: 0,
	iosStatusbar: 'light-content',
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
	iconFontSize: 28,
	iconHeaderSize: 24,
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
	lineHeight: 24,

	// List
	listBg: 'transparent',
	listBorderColor: '#c9c9c9',
	listDividerBg: '#f4f4f4',
	listBtnUnderlayColor: '#DDD',
	listItemPadding: 12,
	listNoteColor: '#808080',
	listNoteSize: 13,
	get listItemSelected() {
		return R.colors.brand;
	},
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
	radioBtnSize: 23,
	radioColor: undefined,
	get radioSelectedColorAndroid() {
		return R.colors.brand;
	},
	radioBtnLineHeight: 24,
	get radioSelectedColor() {
		return this.brandPrimary;
	},

	// Segment
	segmentBackgroundColor: 'transparent',
	segmentActiveBackgroundColor: '#fff',
	segmentTextColor: '#fff',
	get segmentActiveTextColor() {
		return R.colors.brand;
	},
	segmentBorderColor: '#fff',
	get segmentBorderColorMain() {
		return R.colors.brand;
	},

	// Spinner
	get defaultSpinnerColor() {
		return R.colors.brand;
	},
	inverseSpinnerColor: '#1A191B',

	// Tab
	get tabDefaultBg() {
		return R.colors.brand;
	},
	topTabBarTextColor: '#b3c7f9',
	topTabBarActiveTextColor: '#fff',
	topTabBarBorderColor: '#fff',
	topTabBarActiveBorderColor: '#fff',

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
	textAlign: 'auto',
	textAlignSelf: 'auto',
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
	titleFontSize: 19,
	subTitleFontSize: 14,
	subtitleColor: '#FFF',
	titleFontColor: '#FFF',

	// Other
	borderRadiusBase: 2,
	borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
	contentPadding: 10,
	dropdownLinkColor: '#414142',
	inputLineHeight: 24,
	deviceWidth,
	deviceHeight,
	isIphoneX,
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
	get hrLineHeight(){return this.borderWidth},
	get hrLineColor() {
		return R.colors.border;
	},
	get hrTextColor() {
		return R.colors.text;
	},
};
