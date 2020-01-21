import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import AuthScreen from '@app/screens/auth';
import { MainNavigator } from './mainNavigator';
import SplashScreen from '@app/screens/splash';
import { withBrowserHistory } from '@app/navigators/browser-history';
import routeNames from './routeNames';

// const { withBrowserHistory } = require('react-navigation-browser-history-helpers');

/* for custom transition use this libraries:
	https://github.com/plmok61/react-navigation-transitions
	https://github.com/fram-x/FluidTransitions
	https://medium.com/async-la/custom-transitions-in-react-navigation-2f759408a053
*/
export const creatRootNavigator = (isSignedIn?: boolean): any => {
	const root = isSignedIn == undefined ? SplashScreen : isSignedIn ? MainNavigator : AuthScreen;
	const route: NavigationRouteConfigMap = {
		[routeNames.INDEX]: {
			screen: root,
			path: '',
		},
	};
	const RootNav = createStackNavigator(route, { headerMode: 'none' });
	return withBrowserHistory(RootNav);
};
