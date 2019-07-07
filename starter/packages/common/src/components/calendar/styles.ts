import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { CalendarDayItem, CalendarMonthItem, CalendarYearItem } from './types';
import { getAppThemeType, ThemeType } from '@app/configs/theme';
import R from '@app/res/R';
import Locale from '@app/configs/locales';


export const isMaterial = getAppThemeType() == ThemeType.Material;
const brandColor = R.colors.brand;

export const styles = StyleSheet.create({
	calendarContainer: {
		flex: 1,
	},
	calendarHeader: {
		height: 60,
		flexDirection: 'row',
		paddingTop: 8,
		paddingBottom: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	calendarTitleContainer: {
		flex:1,
		alignItems:'center'
	},

	calendarTitle: {
		fontSize:18
	},

	calendarContent: {
		padding: 8,
		flex: 1,
	},
	calendarDayHeader: {
		flexDirection: 'row',
	},
	calendarDayHeaderCell: {
		flex: 1,
		flexDirection: 'column',
		padding: 8,
		alignItems: 'center',
	},
	calendarDayHeaderCellText: {
		color: brandColor,
		fontSize: 12,
	},

	calendarDayList: {
		flex: 1,
	},
	calendarDayListRow: {},

	calendarDayCell: {
		width: '14.285%', // (100 %) / (7 cell)
		padding: 8,
		alignItems: 'center',
	},
	calendarDayCellContent: {
		width: 36,
		height: 36,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 18,
		overflow:'hidden'
	},
	calendarDayCellText: {
		padding: 4,
	},

	calendarMonthList: {
		flex: 1,
	},
	calendarMonthListRow: {},

	calendarMonthCell: {
		padding: 8,
		flex: 1,
		alignItems: 'center',
	},
	calendarMonthCellContent: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 8,
		paddingLeft: 8,
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},
	calendarMonthCellText: {
		flex: 1,
		alignSelf: 'center',
	},

	calendarYearList: {
		flex: 1,
	},
	calendarYearListRow: {},

	calendarYearCell: {
		padding: 8,
		flex: 1,
		alignItems: 'center',
	},
	calendarYearCellContent: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 8,
		paddingLeft: 8,
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},
	calendarYearCellText: {
		flex: 1,
		alignSelf: 'center',
	},
});

export const calendarDayCellTextStyle = (item: CalendarDayItem) => {
	return [
		styles.calendarDayCellText,
		item.isDisabled
			? {
					color: R.colors.gray,
			  }
			: null,
		item.isSelected
			? {
					color: R.colors.white,
			  }
			: null,
	];
};

export const calendarDayCellContentStyle = (item: CalendarDayItem): StyleProp<ViewStyle> => {
	return [
		styles.calendarDayCellContent,
		item.isToday
			? {
					borderWidth: 1,
					borderColor: brandColor,
			  }
			: null,
		item.isSelected
			? {
					backgroundColor: brandColor,
			  }
			: null,
	];
};

export const calendarArrowIconStyle = (locale: string): any => {
	return {
		transform: [{ scaleX: Locale.isLocaleRTL(locale) ? -1 : 1 }],
		fontSize: 24,
	};
};

export const calendarMonthCellContentStyle = (item: CalendarMonthItem): any => {
	return [
		styles.calendarMonthCellContent,
		item.isThisMonth
			? {
					borderWidth: 1,
					borderColor: brandColor,
			  }
			: null,
		item.isSelected
			? {
					backgroundColor: brandColor,
			  }
			: null,
	];
};

export const calendarMonthCellTextStyle = (item: CalendarMonthItem): any => {
	return [
		styles.calendarMonthCellText,
		item.isDisabled
			? {
					color: R.colors.gray,
			  }
			: null,
		item.isSelected
			? {
					color: R.colors.white,
			  }
			: null,
	];
};


export const calendarYearCellContentStyle = (item: CalendarYearItem): any => {
	return [
		styles.calendarYearCellContent,
		item.isThisYear
			? {
					borderWidth: 1,
					borderColor: brandColor,
			  }
			: null,
		item.isSelected
			? {
					backgroundColor: brandColor,
			  }
			: null,
	];
};

export const calendarYearCellTextStyle = (item: CalendarYearItem): any => {
	return [
		styles.calendarYearCellText,
		item.isDisabled
			? {
					color: R.colors.gray,
			  }
			: null,
		item.isSelected
			? {
					color: R.colors.white,
			  }
			: null,
	];
};
export const calendarTitleStyle = (): any => {
	return [
		styles.calendarTitle,
		{
			fontFamily:R.fonts.medium
		}
	];
};
