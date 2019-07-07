import * as React from 'react';
import { View, Text, Button, Icon, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { styles, calendarArrowIconStyle, calendarTitleStyle, isMaterial } from './styles';
import moment, { Moment } from 'jalali-moment';
import {
	CalendarDayItem,
	CalendarProps,
	CalenderView,
	faWeekdaysShort,
	faMonths,
	defaultDateFormat,
	CalendarMonthItem,
	CalendarYearItem,
} from './types';
import DayView from './DayView';
import MonthView from './MonthView';
import YearView from './YearView';
import Constant from '@app/configs/const';
import R from '@app/res/R';


interface State {
	dateContext: Moment;
	currentView: CalenderView;
	selected?: Moment;
	title: string;
	visibleHeader: boolean;
	visibleTitle: boolean;
	visibleArrows: boolean;
}

interface OwnProps {}
type Props = OwnProps & CalendarProps;

export default class Calendar extends React.Component<Props, State> {
	private weekdays: string[] = [];
	private weekdaysShort: string[] = [];
	private months: string[] = [];
	private locale: string;
	private today: Moment;
	private minDate?: Moment;
	private maxDate?: Moment;

	constructor(props: Props) {
		super(props);

		this.locale = this.props.locale ? this.props.locale : Constant.LOCALE_EN;
		moment.locale(this.locale);
		this.today = moment();

		this.state = {
			dateContext: this.today,
			currentView: CalenderView.Blank,
			selected: undefined,
			title: '',
			visibleTitle: true,
			visibleArrows: true,
			visibleHeader: false,
		};
	}

	componentDidMount() {
		// setTimeout(() => {
			this.init();
		// }, 400);
	}

	private init() {
		this.weekdays = moment.weekdays(true);
		this.weekdaysShort =
			this.locale == Constant.LOCALE_FA ? faWeekdaysShort : moment.weekdaysShort(true);
		this.months = this.locale == Constant.LOCALE_FA ? faMonths : moment.months();
		this.minDate = this.props.minDate
			? moment.from(
					`${this.props.minDate.year}-${this.props.minDate.month}-${this.props.minDate.day}`,
					this.locale,
					defaultDateFormat
			  )
			: undefined;
		this.maxDate = this.props.maxDate
			? moment.from(
					`${this.props.maxDate.year}-${this.props.maxDate.month}-${this.props.maxDate.day}`,
					this.locale,
					defaultDateFormat
			  )
			: undefined;
		const selected = this.props.selectedDate
			? moment.from(
					`${this.props.selectedDate.year}-${this.props.selectedDate.month}-${
						this.props.selectedDate.day
					}`,
					this.locale,
					defaultDateFormat
			  )
			: undefined;
		const dateContext = selected ? selected : moment();
		this.setState(prev => ({
			...prev,
			dateContext: dateContext,
			currentView: CalenderView.Day,
			selected: selected,
			title: dateContext.format('MMMM'),
			visibleHeader: false,
		}));
		if (this.props.onCurrentViewChanged) this.props.onCurrentViewChanged(CalenderView.Day);
		if (this.props.onDateContextChanged) this.props.onDateContextChanged(dateContext);
	}

	componentDidUpdate() {
		var title = '';
		if (this.state.currentView == CalenderView.Day) title = this.month();
		else if (this.state.currentView == CalenderView.Month) title = this.year().toString();
		if (this.state.title != title)
			this.setState(prevState => ({
				...prevState,
				title,
			}));

		const visibleTitle =
			this.state.currentView == CalenderView.Day || this.state.currentView == CalenderView.Month;
		if (this.state.visibleTitle != visibleTitle)
			this.setState(prevState => ({
				...prevState,
				visibleTitle,
			}));

		const visibleArrows = this.state.currentView == CalenderView.Day;
		if (this.state.visibleArrows != visibleArrows)
			this.setState(prevState => ({
				...prevState,
				visibleArrows,
			}));

		const visibleHeader =
			this.state.currentView == CalenderView.Day || this.state.currentView == CalenderView.Month;
		if (this.state.visibleHeader != visibleHeader)
			this.setState(prevState => ({
				...prevState,
				visibleHeader,
			}));
	}

	private year = (): number => {
		const y =
			this.locale == Constant.LOCALE_FA
				? this.state.dateContext.jYear()
				: this.state.dateContext.year();
		return y;
	};
	private month = (): string => {
		return this.state.dateContext.format('MMMM');
	};
	private daysInMonth = (): number => {
		return this.state.dateContext.daysInMonth();
	};
	private currentDay = (): number => {
		return +this.today.format('D');
	};
	private firthDayOfMonth = (): number => {
		return (
			+moment(this.state.dateContext)
				.startOf('month')
				.format('d') + (this.locale == Constant.LOCALE_FA ? 1 : 0)
		);
	};
	private dayItems = (): CalendarDayItem[] => {
		const res: CalendarDayItem[] = [];

		var key = 0
		if (this.firthDayOfMonth() < 7)
			for (let i = 0; i < this.firthDayOfMonth(); i++) {
				key = key + i
				res.push({
					key : key.toString(),
					day: 0,
					title: '',
					isSelectable: false,
					isSelected: false,
					isToday: false,
					isDisabled: true,
				});
			}

		const isDisabled =
			(this.minDate != undefined &&
				moment(this.state.dateContext).isBefore(this.minDate, 'month')) ||
			(this.maxDate != undefined && moment(this.state.dateContext).isAfter(this.maxDate, 'month'));

		const minIsSameMonth =
			this.minDate != undefined && moment(this.state.dateContext).isSame(this.minDate, 'month');
		const maxIsSameMonth =
			this.maxDate != undefined && moment(this.state.dateContext).isSame(this.maxDate, 'month');
		const minDay = this.minDate != undefined ? +this.minDate.format('D') : undefined;
		const maxDay = this.maxDate != undefined ? +this.maxDate.format('D') : undefined;

		for (let d = 1; d <= this.daysInMonth(); d++) {
			const disabled =
				isDisabled || (minIsSameMonth && d < minDay!) || (maxIsSameMonth && d > maxDay!);

				key = key + d;

			res.push({
				key:key.toString(),
				day: d,
				title: d.toString(),
				isSelectable: true,
				isSelected:
					this.state.selected != undefined &&
					moment(this.state.dateContext).isSame(this.state.selected, 'month') &&
					d == +this.state.selected.format('D'),
				isToday:
					moment(this.state.dateContext).isSame(this.today, 'month') && d == this.currentDay(),
				isDisabled: disabled,
			});
		}

		return res;
	};

	private monthItems = (): CalendarMonthItem[] => {
		const res: CalendarMonthItem[] = [];

		const minIsSameYear =
			this.minDate != undefined && moment(this.state.dateContext).isSame(this.minDate, 'year');
		const maxIsSameYear =
			this.maxDate != undefined && moment(this.state.dateContext).isSame(this.maxDate, 'year');

		const minMonth = this.minDate != undefined ? this.minDate.month() : undefined;
		const maxMonth = this.maxDate != undefined ? this.maxDate.month() : undefined;

		const isDisabled =
			(this.minDate != undefined &&
				moment(this.state.dateContext).isBefore(this.minDate, 'year')) ||
			(this.maxDate != undefined && moment(this.state.dateContext).isAfter(this.maxDate, 'year'));

		this.months.forEach((m, i) => {
			const disabled =
				isDisabled || (minIsSameYear && i < minMonth!) || (maxIsSameYear && i > maxMonth!);
			res.push({
				month: i,
				title: m,
				isSelected:
					this.state.selected != undefined &&
					moment(this.state.dateContext).isSame(this.state.selected, 'year') &&
					i == this.state.selected.month(),
				isThisMonth:
					moment(this.state.dateContext).isSame(this.today, 'year') && i == this.today.month(),
				isDisabled: disabled,
			});
		});

		return res;
	};

	private yearItems = (): CalendarYearItem[] => {
		const res: CalendarYearItem[] = [];

		if (this.locale == Constant.LOCALE_FA)
			for (let y = 1320; y < 1420; y++) {
				const isDisabled =
					(this.minDate != undefined && y < this.minDate.jYear()) ||
					(this.maxDate != undefined && y > this.maxDate.jYear());

				res.push({
					year: y,
					isSelected: this.state.selected != undefined && y == this.state.selected.jYear(),
					isThisYear: y == this.today.jYear(),
					isDisabled: isDisabled,
				});
			}
		else
			for (let y = 1940; y < 2040; y++) {
				const isDisabled =
					(this.minDate != undefined && y < this.minDate.year()) ||
					(this.maxDate != undefined && y > this.maxDate.year());

				res.push({
					year: y,
					isSelected: this.state.selected != undefined && y == this.state.selected.year(),
					isThisYear: y == this.today.year(),
					isDisabled: isDisabled,
				});
			}

		return res;
	};

	private renderSwitch() {
		switch (this.state.currentView) {
			case CalenderView.Day:
				return (
					<DayView
						data={this.dayItems()}
						dayTitles={this.weekdaysShort}
						onDaySelect={item => this.onDayClick(item)}
					/>
				);
			case CalenderView.Month:
				return (
					<MonthView data={this.monthItems()} onMonthSelect={item => this.onMonthClick(item)} />
				);
			case CalenderView.Year:
				return <YearView data={this.yearItems()} onYearSelect={item => this.onYearClick(item)} />;
			default:
				return (
					<View style={R.styles.containerCenter}>
						<Spinner />
					</View>
				);
		}
	}

	public render() {
		return (
			<View style={[styles.calendarContainer]}>
				<View style={styles.calendarContent}>
					{this.state.visibleHeader ? (
						<View style={styles.calendarHeader}>
							{this.state.visibleArrows ? (
								<Button transparent dark={isMaterial} onPress={() => this.onPrevClick()}>
									<Icon style={calendarArrowIconStyle(this.locale)} name="ios-arrow-back" />
								</Button>
							) : null}

							{this.state.visibleTitle ? (
								<TouchableOpacity
									style={styles.calendarTitleContainer}
									onPress={() => this.onTitleClick()}
								>
									<Text style={calendarTitleStyle()}>{this.state.title}</Text>
								</TouchableOpacity>
							) : null}

							{this.state.visibleArrows ? (
								<Button transparent dark={isMaterial} onPress={() => this.onNextClick()}>
									<Icon style={calendarArrowIconStyle(this.locale)} name="ios-arrow-forward" />
								</Button>
							) : null}
						</View>
					) : null}

					{this.renderSwitch()}
				</View>
			</View>
		);
	}

	private onDayClick(item: CalendarDayItem): void {
		this.setSelectedDate(this.year(), this.months.indexOf(this.month()) + 1, item.day);
	}

	private onMonthClick(item: CalendarMonthItem): any {
		this.setCurrentView(CalenderView.Day);
		this.goTo(this.year(), item.month);
	}

	private onYearClick(item: CalendarYearItem): any {
		this.setCurrentView(CalenderView.Month);
		this.goTo(item.year, this.months.indexOf(this.month()) + 1);
	}

	private setSelectedDate(year: number, month: number, day: number) {
		const selected = moment.from(`${year}-${month}-${day}`, this.locale, defaultDateFormat);

		if (moment(this.state.selected).isSame(selected, 'day')) return;

		this.setState(prevState => ({
			...prevState,
			selected: selected,
		}));

		if (this.props.onSelectedDate) this.props.onSelectedDate({ year, month, day });
	}

	private onNextClick(): void {
		var monthNo = this.months.indexOf(this.month());
		var year = this.year();
		if (monthNo == 11) {
			year = year + 1;
			monthNo = 0;
		} else {
			monthNo = monthNo + 1;
		}
		this.goTo(year, monthNo);
	}
	private onPrevClick(): void {
		var monthNo = this.months.indexOf(this.month());
		var year = this.year();
		if (monthNo == 0) {
			year = year - 1;
			monthNo = 11;
		} else {
			monthNo = monthNo - 1;
		}

		this.goTo(year, monthNo);
	}
	private onTitleClick(): void {
		if (this.state.currentView == CalenderView.Day) this.setCurrentView(CalenderView.Month);
		else if (this.state.currentView == CalenderView.Month) this.setCurrentView(CalenderView.Year);
	}

	private goTo(year: number | undefined, monthNo: number | undefined): void {
		const y = year == undefined ? this.year() : year;
		const m = monthNo == undefined ? this.months.indexOf(this.month()) : monthNo;
		var dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set({ year: y, month: m });
		this.setState(prevState => ({
			...prevState,
			dateContext: dateContext,
		}));

		if (this.props.onDateContextChanged) this.props.onDateContextChanged(dateContext);
	}

	gotoToday() {
		const y = this.locale == Constant.LOCALE_FA ? this.today.jYear() : this.today.year();
		const m = this.today.month();
		this.goTo(y, m);
	}
	setCurrentView(view: CalenderView) {
		this.setState(prev => ({ ...prev, currentView: view }));
		if (this.props.onCurrentViewChanged) this.props.onCurrentViewChanged(view);
	}
}
