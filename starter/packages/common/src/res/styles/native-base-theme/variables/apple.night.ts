import R from "@app/res/R";

// @flow
// https://github.com/GeekyAnts/native-base-docs/blob/master/docs/Theme.md
// https://codeburst.io/customizing-nativebase-the-missing-examples-part-1-2fff2bdc0120
// https://codeburst.io/customizing-nativebase-the-missing-examples-part-2-5a4cfcf15414


export default {
	//Color
	get brandDark() { return R.colors.appleNightLightColor},
	get brandLight() { return R.colors.appleNightDarkColor},

	//Container
	get containerBgColor() { return R.colors.appleNightBackgroundColor},

	//Card
	get cardDefaultBg() { return R.colors.appleNightSurfaceColor},
	get cardBorderColor() { return R.colors.appleNightBorderColor},

	//Text
	get textColor() { return R.colors.appleNightLightColor},
	// inverseTextColor() { return inverseTextColor},
	get defaultTextColor() { return R.colors.appleNightLightColor},

	//Header
	get toolbarBtnColor() { return R.colors.appleNightLightColor},
	get toolbarDefaultBg() { return R.colors.appleNightSurfaceColor},
	get toolbarInputColor() { return R.colors.appleNightLightColor},
	get toolbarBtnTextColor() { return R.colors.appleNightLightColor},
	get toolbarBorderColor() { return R.colors.appleNightBorderColor},
	iosStatusbar: 'light-content',

	//Footer
	get footerDefaultBg() { return R.colors.appleNightSurfaceColor},
	get footerBorderColor() { return R.colors.appleNightBorderColor},
	get tabBarTextColor() { return  R.colors.appleNightLowLightColor},
	get activeTab() { return R.colors.appleNightLightColor},
	get sTabBarActiveTextColor() { return R.colors.appleNightLightColor},
	get tabBarActiveTextColor() { return R.colors.appleNightLightColor},
	get tabDefaultBg() { return R.colors.appleNightSurfaceColor},

	//Tab
	get topTabBarTextColor() { return  R.colors.appleNightLowLightColor},
	get topTabBarActiveTextColor() { return R.colors.appleNightLightColor},
	get topTabBarBorderColor() { return R.colors.appleNightBorderColor},
	get topTabBarActiveBorderColor() { return R.colors.appleNightBorderColor},
	get tabBgColor() { return R.colors.appleNightSurfaceColor},

	//Title
	get subtitleColor() { return  R.colors.appleNightLowLightColor},
	get titleFontColor() { return R.colors.appleNightLightColor},

	// List
	get listBorderColor() { return R.colors.appleNightBorderColor},
	get listDividerBg() { return R.colors.appleNightBorderColor},
	get listBtnUnderlayColor() { return R.colors.appleNightBorderColor},
	get listNoteColor() { return  R.colors.appleNightLowLightColor},
	get listSeparatorBackgroundColor() { return R.colors.appleNightSurfaceColor},
	get listSeparatorTextColor() { return  R.colors.appleNightLowLightColor},

	// InputGroup
	get inputBorderColor() { return R.colors.appleNightBorderColor},
	get inputColor() { return R.colors.appleNightLightColor},

	// Radio Button
	get radioColor() { return  R.colors.appleNightLowLightColor},

	// Segment
	get segmentActiveBackgroundColor() { return R.colors.appleNightLightColor},
	get segmentTextColor() { return R.colors.appleNightLightColor},
	get segmentActiveTextColor() { return R.colors.appleNightDarkColor},
	get segmentBorderColor() { return R.colors.appleNightLightColor},

	// Spinner
	get defaultSpinnerColor() { return R.colors.appleNightLightColor},
	get inverseSpinnerColor() { return R.colors.appleNightDarkColor},

	// Toast
	get toastBgColor() { return R.colors.appleNightLightColor},
	get toastTextColor() { return R.colors.appleNightDarkColor},

	// Icon
	get iconColor() { return R.colors.appleNightLightColor},

	//Custom.Hr
	get hrLineColor() {
		return R.colors.appleNightBorderColor;
	},
};
