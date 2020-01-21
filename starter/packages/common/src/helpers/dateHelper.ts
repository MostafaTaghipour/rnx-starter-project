import Locale from '@app/configs/locales';
import moment, { Moment } from 'jalali-moment';
import { CalendarDate } from '@app/components/calendar/types';
import Constant from '@app/configs/const';


export const prettyDateFormat = (): string => {
	return Locale.current == Constant.LOCALE_FA ? 'dddd، Do MMMM YYYY' : 'dddd, MMMM Do YYYY';
}; 

export const stringToMoment = (
	value: string,
	locale = Locale.current,
	format = 'YYYY-MM-DD'
): Moment => {
	return moment.from(value, locale, format);
};

export const yearMonthDayToMoment = (
	year: number,
	month: number,
	day: number,
	locale = Locale.current,
): Moment => {
	return moment.from(`${year}-${month}-${day}`, locale, 'YYYY-MM-DD');
};

export const calenderDateToMoment = (
	date: CalendarDate,
	locale = Locale.current,
): Moment => {
	return yearMonthDayToMoment(date.year, date.month, date.day, locale);
};

export const momentToCalendarDate = (moment: Moment, locale = Locale.current): CalendarDate => {
	return {
		year: locale ? moment.jYear() : moment.year(),
		month: moment.month() + 1,
		day: +moment.format('D'),
	};
};

export const momentToIsoFormat = (moment: Moment): string => {
	return moment.locale(Constant.LOCALE_EN).format(Constant.DATE_ISO_FORMAT);
};
export const calendarDateToIsoFormat = (date: CalendarDate): string => {
	return momentToIsoFormat(calenderDateToMoment(date));
};
