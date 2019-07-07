import { Moment } from 'jalali-moment';

export interface CalendarProps {
	selectedDate?: CalendarDate; 
	minDate?: CalendarDate; 
	maxDate?: CalendarDate; 
	locale?: 'en' | 'fa';
	visibleHeader?: boolean;
	onSelectedDate?: (value:CalendarDate) => any;
	onDateContextChanged?: (dateContext:Moment) => any;
	onCurrentViewChanged?: (currentView: CalenderView) => any;
	// visibleYearView?: boolean;
	// visibleMonthView?: boolean;
	// visibleDayView?: boolean;
}

export enum CalenderView {
	Blank,
	Day,
	Month,
	Year,
	// Time,
}

export interface CalendarDayItem {
	key:string,
	day: number;
	title: string;
	isSelectable: boolean;
	isToday: boolean;
	isSelected: boolean;
	isDisabled: boolean;
}

export interface CalendarMonthItem {
	month: number;
	title: string;
	isThisMonth: boolean;
	isSelected: boolean;
	isDisabled: boolean;
}


export interface CalendarYearItem {
	year: number;
	isThisYear: boolean;
	isSelected: boolean;
	isDisabled: boolean;
}



export interface CalendarDate{
	year:number,
	month:number , 
	day:number 
}

export const defaultDateFormat = 'YYYY-MM-DD'
export const faWeekdaysShort = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export const faMonths = [
	'فروردین',
	'اردیبهشت',
	'خرداد',
	'تیر',
	'مرداد',
	'شهریور',
	'مهر',
	'آبان',
	'آذر',
	'دی',
	'بهمن',
	'اسفند',
];
