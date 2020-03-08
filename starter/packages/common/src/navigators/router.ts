import navigationService from './navigationService';
import routeNames from './routeNames';
import { CalendarDate } from '@app/components/calendar/types';

const picker = (
	routeName: string,
	data: ReadonlyArray<string>,
	gesturesEnabled = true,
	pickerType?: 'modal' | 'dialog' | 'bottomSheet',
	selectedItem?: string,
	returnData?: (index: number, value: string) => any
) => {
	navigationService.navigate(routeName, {
		data,
		selectedItem,
		pickerType,
		gesturesEnabled,
		returnData,
	});
};

const datePicker = (
	routeName: string,
	locale: string,
	gesturesEnabled = true,
	min?: CalendarDate,
	max?: CalendarDate,
	selected?: CalendarDate,
	today?: string,
	ok?: string,
	cancel?: string,
	pickerType?: 'modal' | 'dialog' | 'bottomSheet',
	returnData?: (value: CalendarDate) => any
) => {
	navigationService.navigate(routeName, {
		min,
		max,
		ok,
		cancel,
		today,
		selected,
		pickerType,
		gesturesEnabled,
		returnData,
		locale,
	});
};

const home = () => {
	navigationService.navigate(routeNames.HOME);
};

const settings = () => {
	navigationService.navigate(routeNames.SETTINGS);
};

const detail = (id: number) => {
	navigationService.navigate(routeNames.DETAILS, { id });
};

export default {
	picker,
	datePicker,
	home,
	settings,
	details: detail,
};
