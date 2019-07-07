import {
	NavigationActions,
	NavigationContainerComponent,
	NavigationParams,
	NavigationRoute,
	NavigationState,
	NavigationAction,
} from 'react-navigation';

let _navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
	_navigator = navigatorRef;
}

function navigate(routeName: string, params?: NavigationParams) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
}

function getActiveRoute(
	navigationState: NavigationRoute<NavigationParams> | NavigationState
): NavigationRoute<NavigationParams> {
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if (route.routes) {
		return getActiveRoute(route);
	}
	return route;
}

function trackingNavigationStateChange(
	prevNavigationState: NavigationState,
	nextNavigationState: NavigationState,
	action: NavigationAction
) {
	const currentScreen = getActiveRoute(nextNavigationState);
	const prevScreen = getActiveRoute(prevNavigationState);
	// if (currentScreen.routeName == 'settings') {
	// 	navigate('home');
	// }
}

export default {
	navigate,
	setTopLevelNavigator,
	trackingNavigationStateChange,
};
