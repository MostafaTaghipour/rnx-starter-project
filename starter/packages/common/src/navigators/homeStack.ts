import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import HomeScreen from '@app/screens/home';
import DetailScreen from '@app/screens/detail';



const route : NavigationRouteConfigMap = {
	home: {
		screen: HomeScreen,
		path: '',
	},
	details: {
		screen: DetailScreen,
		path: 'detail/:id',
	},
};
export const HomeStack = createStackNavigator(route);


