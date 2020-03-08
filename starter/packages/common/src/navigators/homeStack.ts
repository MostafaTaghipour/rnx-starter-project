import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import HomeScreen from '@app/screens/home';
import DetailScreen from '@app/screens/detail';
import stackConfig from './stackConfig';
import routeNames from './routeNames';

const route: NavigationRouteConfigMap = {
	[routeNames.HOME]: {
		screen: HomeScreen,
		path: '',
	},
	[routeNames.DETAILS]: {
		screen: DetailScreen,
		path: 'detail/:id',
	},
};
export const HomeStack = createStackNavigator(route, stackConfig);
