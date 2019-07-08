import R from "@app/res/R";
import color from "color";

// @flow
// https://github.com/GeekyAnts/native-base-docs/blob/master/docs/Theme.md
// https://codeburst.io/customizing-nativebase-the-missing-examples-part-1-2fff2bdc0120
// https://codeburst.io/customizing-nativebase-the-missing-examples-part-2-5a4cfcf15414


export default {
	//Color
	get brandDark() { return R.colors.materialNightLightColor},
	get brandLight() { return R.colors.materialNightDarkColor},

	//Container
	get containerBgColor() { return R.colors.materialNightBackgroundColor},

	//Card
	get cardDefaultBg() { return R.colors.materialNightSurfaceColor},
	get cardBorderColor() { return R.colors.materialNightBorderColor},

	//Texts
	get textColor() { return R.colors.materialNightLightColor},
	// inverseTextColor() { return inverseTextColor},
	get defaultTextColor() { return R.colors.materialNightLightColor},

	//Header
	get toolbarBtnColor() { return R.colors.materialNightLightColor},
	get toolbarDefaultBg() { return R.colors.materialNightSurfaceColor},
	get toolbarInputColor() { return R.colors.materialNightLightColor},
	get toolbarBtnTextColor() { return R.colors.materialNightLightColor},
	// get toolbarBorderColor() { return R.colors.materialNightBorderColor},
	// iosStatusbar: 'light-content',
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

	//Footer
	get footerDefaultBg() { return R.colors.materialNightSurfaceColor},
	// get footerBorderColor() { return R.colors.materialNightBorderColor},
	get tabBarTextColor() { return  R.colors.materialNightLowLightColor},
	get activeTab() { return R.colors.materialNightLightColor},
	get sTabBarActiveTextColor() { return R.colors.materialNightLightColor},
	get tabBarActiveTextColor() { return R.colors.materialNightLightColor},
	get tabDefaultBg() { return R.colors.materialNightSurfaceColor},
	 tabActiveBgColor: 'transparent',

	//Tab
	get topTabBarTextColor() { return  R.colors.materialNightLowLightColor},
	get topTabBarActiveTextColor() { return R.colors.materialNightLightColor},
	get topTabBarBorderColor() { return R.colors.materialNightBorderColor},
	get topTabBarActiveBorderColor() { return R.colors.materialNightBorderColor},
	get tabBgColor() { return R.colors.materialNightSurfaceColor},
	

	//Title
	get subtitleColor() { return  R.colors.materialNightLowLightColor},
	get titleFontColor() { return R.colors.materialNightLightColor},

	// List
	get listBorderColor() { return R.colors.materialNightBorderColor},
	get listDividerBg() { return R.colors.materialNightBorderColor},
	get listBtnUnderlayColor() { return R.colors.materialNightBorderColor},
	get listNoteColor() { return  R.colors.materialNightLowLightColor},
	get listSeparatorBackgroundColor() { return R.colors.materialNightSurfaceColor},
	get listSeparatorTextColor() { return  R.colors.materialNightLowLightColor},

	// InputGroup
	get inputBorderColor() { return R.colors.materialNightBorderColor},
	get inputColor() { return R.colors.materialNightLightColor},

	// Radio Button
	get radioColor() { return  R.colors.materialNightLowLightColor},

	// Segment
	get segmentActiveBackgroundColor() { return R.colors.materialNightLightColor},
	get segmentTextColor() { return R.colors.materialNightLightColor},
	get segmentActiveTextColor() { return R.colors.materialNightDarkColor},
	get segmentBorderColor() { return R.colors.materialNightLightColor},

	// Spinner
	get defaultSpinnerColor() { return R.colors.materialNightLightColor},
	get inverseSpinnerColor() { return R.colors.materialNightDarkColor},

	// Toast
	get toastBgColor() { return R.colors.materialNightLightColor},
	get toastTextColor() { return R.colors.materialNightDarkColor},


	// Icon
	get iconColor() { return R.colors.materialNightLightColor},

	//Custom.Hr
	get hrLineColor() {
		return R.colors.materialNightBorderColor;
	},


};
