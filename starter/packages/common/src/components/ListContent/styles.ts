import R from '@app/res/R';
import Constant from '@app/configs/const';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
const style = StyleSheet.create({
	footerContainer: { height: 100, width: '100%', alignItems: 'center' },
	footerErrorContainer: { flexDirection: 'row', alignItems: 'center', padding: 8 },
	footerErrorButton: { backgroundColor: R.colors.white_smoke },
	footerErrorButtonIcon: { color: R.colors.brand },
	footerErrorTitle: {
		get fontFamily() {
			return R.fonts.medium;
		},
		fontSize: 15,
	},
	//@ts-ignore
	footerErrorSubtitle: {
		color: R.colors.textLighten(3.0),
	
		fontSize: 14,
	},
	listContainer: { flex: 1, width: '100%' },
	fab: { backgroundColor: R.colors.brand, width: 40, height: 40, opacity: 0.8, borderRadius: 20 , position:'absolute' ,  bottom: 30,
    right: 30 , justifyContent: 'center', alignItems: 'center', },
	fabIcon: { fontSize: 20, color:R.colors.white },
	emptyIcon: {
		get color() {
			return R.colors.brandLighten(1.5);
		},
		fontSize: 100,
	},
	emptySection: { alignItems: 'center', marginTop: -24 },
	emptyTitle: { color: R.colors.textLighten(2.0), marginTop: 24 },
	emptyButton: { marginTop: 24, alignSelf: 'center', height: 40 },
	reloadButtonText: { fontSize: 14, marginStart: -24 },

	// panel
	overlay: {
		position: 'absolute',
		zIndex: 5,
		elevation: 5,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: `rgba(0,0,0,0.5)`,
	},
	panel: {
		shadowColor: '#595959',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 8,
		shadowOpacity: 0.8,
		elevation: 6,
		height: '100%',
		zIndex: 6,
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: R.colors.background,
	},
	panelFooter: {
		height: 70,
		width: '100%',
		justifyContent: 'center',

		padding: 8,
		flexDirection: 'row',
	},
	panelHeader: {
		width: '100%',
		justifyContent: 'center',
		padding: 16,
	},
	applyButton: { width: 100, height: 46, alignItems: 'center', justifyContent: 'center' },
	resetButtonText: { color: R.colors.textLighten(2.0) },
	fabSection: {
		zIndex: 6,
		elevation: 6,
		position: 'absolute',
		right: 28,
		bottom: 20,
	},
	title: {
		color: R.colors.textLighten(2.0),
		marginTop: 40,
		alignSelf: 'flex-start',
		fontSize: 16,
		get fontFamily() {
			return R.fonts.bold;
		},
	},
	subtitle: {
		alignSelf: 'flex-start',
		fontSize: 14,
		get fontFamily() {
			return R.fonts.medium;
		},
	},

	optionSection: { flexDirection: 'row', marginTop: 8, flexWrap: 'wrap' },
	filterItem: {
		padding: 16,
	},
	filterHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 36,
	},
	filterHeaderText: {
		alignSelf: 'center',
	},
	filterClearButton: {
		alignSelf: 'center',
		marginTop: -24,
		marginEnd: -4,
	},
});

const getOptionStyle = (selected: boolean): StyleProp<ViewStyle> => {
	return [
		{
			backgroundColor: selected ? R.colors.brand : R.colors.transparent,
			paddingHorizontal: 10,
			paddingVertical: 5,
			marginEnd: 8,
			marginBottom: 4,
		},
		selected && {
			shadowColor: '#595959',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowRadius: 4,
			shadowOpacity: 0.4,
			elevation: 4,
		},
	];
};

const getOptionTextStyle = (selected: boolean): StyleProp<TextStyle> => {
	return {
		color: selected ? R.colors.white : R.colors.textLighten(3.0),
		fontSize: 14,
		get fontFamily() {
			return selected ? R.fonts.medium : R.fonts.bold;
		},
	};
};

export default {
	...style,
	getOptionStyle,
	getOptionTextStyle,
};
