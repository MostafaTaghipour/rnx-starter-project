import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import SettingsScreen from '@app/screens/setting';
import { PickerModalScreen } from '@app/components/picker/Picker';
import { DatePickerModalScreen } from '@app/components/picker/DatePicker';
import routeNames from './routeNames';
import modalConfig from './modalConfig';

const route: NavigationRouteConfigMap = {
	[routeNames.SETTINGS]: {
		screen: SettingsScreen,
		path: '',
	},
	[routeNames.LANGUAGE_PICKER]: {
		screen: PickerModalScreen,
		path: 'select-language',
	},
	[routeNames.DATE_PICKER]: {
		screen: DatePickerModalScreen,
		path: 'select-date',
	},
};

export const SettingsStack = createStackNavigator(route, modalConfig);
