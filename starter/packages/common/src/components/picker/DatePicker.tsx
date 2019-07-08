import * as React from 'react';
import { Input, View, Button, Icon, Text } from 'native-base';
import { StyleProp, ViewStyle, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationScreenProp, SafeAreaView, NavigationScreenProps } from 'react-navigation';
import { FieldProps, IconProps, PickerType } from './types';
import styles, {
	modalWrapperStyle,
	modalContainerStyle,
	pickerModalSafeAreaInsets,
	datePickerBottomSectionStyle,
	datePickerTopSectionStyle,
	datePickerModalSafeAreaInsets,
	datePickerTopSectionDayTextStyle,
	datePickerTopSectionYearTextStyle,
	fieldStyle,
	modalContentSectionStyle,
	fieldPlaceHolderTextColor,
} from './styles';
import moment, { Moment } from 'jalali-moment';
import { CalendarDate, CalenderView } from '@app/components/calendar/types';
import Constant from '@app/configs/const';
import R from '@app/res/R';
import Calendar from '@app/components/calendar';
import Locale from '@app/configs/locales';
import { showNativeAlert } from '@app/helpers/uiHelper';
import { isNightMode } from '@app/configs/theme';

//----------------------------------------- Field ------------------------------------

interface ContainerProps {
	containerStyle?: StyleProp<ViewStyle>;
	navigation: NavigationScreenProp<any, any>;
	pickerType?: 'modal' | 'dialog' | 'bottomSheet';
	locale?: 'en' | 'fa';
	format?: string;
	min?: CalendarDate;
	max?: CalendarDate;
	selected?: CalendarDate;
	onSelect?: (value: CalendarDate) => any;
	todayButtonTitle?: string;
	okButtonTitle?: string;
	cancelButtonTitle?: string;
	gesturesEnabled?: boolean;
}

type Props = FieldProps & ContainerProps & IconProps;

interface State {
	selected?: CalendarDate;
}

const defaultLocale = Constant.LOCALE_EN;
const defaultFormat = 'YYYY-MM-DD';

export default class DatePickerField extends React.Component<Props, State> {
	locale: string;
	format: string;

	constructor(props: Props) {
		super(props);
		this.locale = this.props.locale ? this.props.locale : defaultLocale;
		this.format = this.props.format ? this.props.format : defaultFormat;

		this.state = {
			selected: this.props.selected,
		};
	}

	openPicker() {
		const pickerType = this.props.pickerType;
		const min = this.props.min;
		const max = this.props.max;
		const today = this.props.todayButtonTitle;
		const ok = this.props.okButtonTitle;
		const cancel = this.props.cancelButtonTitle;
		const selected = this.state.selected;
		const gesturesEnabled = this.props.gesturesEnabled;

		this.props.navigation.navigate('datePickerModal', {
			returnData: this.returnData.bind(this),
			pickerType,
			locale: this.locale,
			min,
			max,
			today,
			ok,
			cancel,
			selected,
			gesturesEnabled,
		});
	}

	returnData(value: CalendarDate) {
		this.setState({ selected: value });

		if (this.props.onSelect) this.props.onSelect(value);
	}

	public render() {
		return (
			<View style={[styles.fieldContainer, this.props.containerStyle]}>
				<TouchableOpacity style={R.styles.flex_1} onPress={() => this.openPicker()}>
					<View style={[R.styles.row, R.styles.flex_1]} pointerEvents="none">
						<View style={R.styles.flex_1} pointerEvents="none">
							<Input
								multiline={false}
								editable={false}
								value={
									this.state.selected
										? moment
												.from(
													`${this.state.selected.year}-${this.state.selected.month}-${
														this.state.selected.day
													}`,
													this.locale,
													defaultFormat
												)
												.format(this.format)
										: ''
								}
								style={[fieldStyle(), this.props.fieldStyle]}
								placeholder={this.props.placeholder}
								placeholderTextColor={
									this.props.placeholderTextColor
										? this.props.placeholderTextColor
										: fieldPlaceHolderTextColor(isNightMode())
								}
							/>
						</View>
						{this.props.iconName ? (
							<Icon style={styles.fieldIcon} name={this.props.iconName!} />
						) : null}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

//----------------------------------------- MODAL ------------------------------------

interface ModalProps {
	navigation: NavigationScreenProp<any, any>;
}

interface ModalState {
	selected?: CalendarDate;
	currentView: CalenderView;
	dateContext?: Moment;
}

export class DatePickerModalScreen extends React.Component<ModalProps, ModalState> {
	static navigationOptions = ({ navigation }: NavigationScreenProps) => {
		//@ts-ignore
		const { gesturesEnabled = true, pickerType = PickerType.modal } = navigation.state.params;

		return {
			gesturesEnabled: gesturesEnabled,
			gestureDirection: 'default',
			gestureResponseDistance: {
				vertical: pickerType == PickerType.modal ? 64 : pickerType == PickerType.dialog ? 120 : 200,
			},
		};
	};
	calendarRef: React.RefObject<Calendar> = React.createRef();

	constructor(props: ModalProps) {
		super(props);

		const { selected } = this.props.navigation.state.params;

		this.state = {
			selected: selected,
			currentView: CalenderView.Day,
		};
	}
	componentDidMount() {}

	finish() {
		this.props.navigation.goBack();
	}

	setSelectedValue(value: CalendarDate) {
		this.setState({
			selected: value,
		});
	}
	done(): void {
		this.props.navigation.state.params.returnData(this.state.selected);
		this.finish();
	}

	gotoToday(): void {
		if (this.calendarRef.current) this.calendarRef.current.gotoToday();
	}

	render() {
		const {
			pickerType = PickerType.modal,
			locale = defaultLocale,
			min,
			max,
			today = 'Today',
			ok = 'OK',
			cancel = 'Cancel',
		} = this.props.navigation.state.params;
		const nightMode = isNightMode();
		return (
			<TouchableWithoutFeedback onPress={() => this.finish()}>
				<View style={modalWrapperStyle(pickerType)}>
					<TouchableWithoutFeedback onPress={() => null}>
						<View style={modalContainerStyle(pickerType, nightMode)}>
							<SafeAreaView
								forceInset={datePickerModalSafeAreaInsets(pickerType)}
								style={R.styles.flex_1}
							>
								<View style={datePickerTopSectionStyle(pickerType, nightMode)}>
									<TouchableOpacity
										onPress={() => {
											if (this.calendarRef.current)
												this.calendarRef.current.setCurrentView(CalenderView.Day);
										}}
									>
										<Text
											style={datePickerTopSectionDayTextStyle(
												pickerType,
												this.state.currentView != CalenderView.Year,
												nightMode
											)}
										>
											{this.state.dateContext
												? this.state.dateContext.format(
														Locale.isPersian ? 'dddd، D MMMM' : 'dddd, MMMM D'
												  )
												: ''}
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											if (this.calendarRef.current)
												this.calendarRef.current.setCurrentView(CalenderView.Year);
										}}
									>
										<Text
											style={datePickerTopSectionYearTextStyle(
												pickerType,
												this.state.currentView == CalenderView.Year,
												nightMode
											)}
										>
											{this.state.dateContext
												? Locale.isPersian
													? this.state.dateContext.jYear()
													: this.state.dateContext.year()
												: ''}
										</Text>
									</TouchableOpacity>
								</View>
								<View style={modalContentSectionStyle(nightMode)}>
									<Calendar
										ref={this.calendarRef}
										selectedDate={this.state.selected}
										locale={locale}
										minDate={min}
										maxDate={max}
										onDateContextChanged={value => this.onDateContextChanged(value)}
										onCurrentViewChanged={value => this.onViewChanged(value)}
										onSelectedDate={value => this.setSelectedValue(value)}
									/>
								</View>
								<View style={datePickerBottomSectionStyle(pickerType, nightMode)}>
									<Button transparent onPress={() => this.gotoToday()}>
										<Text>{today}</Text>
									</Button>
									<View style={[R.styles.row]}>
										<Button transparent onPress={() => this.finish()}>
											<Text>{cancel}</Text>
										</Button>
										<Button
											disabled={this.state.selected == undefined}
											transparent
											onPress={() => this.done()}
										>
											<Text>{ok}</Text>
										</Button>
									</View>
								</View>
							</SafeAreaView>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		);
	}
	onViewChanged(value: CalenderView): any {
		this.setState(prev => ({ ...prev, currentView: value }));
	}
	onDateContextChanged(value: moment.Moment): any {
		this.setState(prev => ({ ...prev, dateContext: value }));
	}
}
