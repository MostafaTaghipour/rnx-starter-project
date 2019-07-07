import R from '@app/res/R';

const backgroundColor = '#0d0d0d';
const surfaceColor = '#161616';
const textColor = '#fefefe';
const textSecondaryColor = '#6b6b6b';
const inverseTextColor = '#000';
const borderColor = '#2b2b2b';

export default {
	//Color
	brandDark: textColor,
	brandLight: inverseTextColor,

	//Container
	containerBgColor: backgroundColor,

	//Card
	cardDefaultBg: surfaceColor,
	cardBorderColor: borderColor,

	//Text
	textColor: textColor,
	// inverseTextColor: inverseTextColor,
	defaultTextColor: textColor,

	//Header
	toolbarBtnColor: textColor,
	toolbarDefaultBg: surfaceColor,
	toolbarInputColor: textColor,
	toolbarBtnTextColor: textColor,
	toolbarBorderColor: borderColor,
	iosStatusbar: 'light-content',

	//Footer
	footerDefaultBg: surfaceColor,
	footerBorderColor: borderColor,
	tabBarTextColor: textSecondaryColor,
	activeTab: textColor,
	sTabBarActiveTextColor: textColor,
	tabBarActiveTextColor: textColor,
	tabDefaultBg: surfaceColor,

	//Tab
	topTabBarTextColor: textSecondaryColor,
	topTabBarActiveTextColor: textColor,
	topTabBarBorderColor: borderColor,
	topTabBarActiveBorderColor: borderColor,
	tabBgColor: surfaceColor,

	//Title
	subtitleColor: textSecondaryColor,
	titleFontColor: textColor,

	// List
	listBorderColor: borderColor,
	listDividerBg: borderColor,
	listBtnUnderlayColor: borderColor,
	listNoteColor: textSecondaryColor,
	listSeparatorBackgroundColor: surfaceColor,
	listSeparatorTextColor: textSecondaryColor,

	// InputGroup
	inputBorderColor: borderColor,
	inputColor: textColor,

	// Radio Button
	radioColor: textSecondaryColor,

	// Segment
	segmentActiveBackgroundColor: textColor,
	segmentTextColor: textColor,
	segmentActiveTextColor: inverseTextColor,
	segmentBorderColor: textColor,

	// Spinner
	defaultSpinnerColor: textColor,
	inverseSpinnerColor: inverseTextColor,

	// Toast
	toastBgColor: textColor,
	toastTextColor: inverseTextColor,
};
