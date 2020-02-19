import {
	NavigationActions,
	NavigationContainerComponent,
	NavigationParams,
	NavigationRoute,
	NavigationState,
	NavigationAction,
	NavigationResetActionPayload,
	StackActions,
} from 'react-navigation';
import configs from '@app/configs';

let _navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
	_navigator = navigatorRef;
}

function getTopLevelNavigator(): Promise<NavigationContainerComponent> {
	return new Promise(resolve => {
		if (_navigator) {
			resolve(_navigator);
			return;
		}
		const interval = setInterval(() => {
			if (_navigator) {
				clearInterval(interval);
				resolve(_navigator);
			}
		}, 50);
	});
}

function navigate(routeName: string, params?: NavigationParams) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
}

function dispatch(action: NavigationAction) {
	_navigator.dispatch(action);
}

function resetStack(options: NavigationResetActionPayload) {
	const resetAction = StackActions.reset(options);
	_navigator.dispatch(resetAction);
}

function goBack() {
	_navigator.dispatch(NavigationActions.back());
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

function getActiveRouteStack(
	navigationState: NavigationRoute<NavigationParams> | NavigationState,
	routeStack: (NavigationRoute<NavigationParams> | NavigationState)[] = []
): (NavigationRoute<NavigationParams> | NavigationState)[] {
	const activeRoute = navigationState.routes[navigationState.index];

	if (
		routeStack.length == 0 ||
		//@ts-ignore
		routeStack[routeStack.length - 1].routeName != activeRoute.routeName
	)
		routeStack.push(activeRoute);

	if (activeRoute.routes && activeRoute.routes.length > 0) {
		return getActiveRouteStack(activeRoute, routeStack);
	}

	return routeStack;
}

function trackingNavigationStateChange(
	prevNavigationState: NavigationState,
	nextNavigationState: NavigationState,
	action: NavigationAction
) {
	const currentScreen = getActiveRoute(nextNavigationState);
	const prevScreen = getActiveRoute(prevNavigationState);
	const currentRoute = getActiveRouteStack(nextNavigationState);

	if (configs.isDebugMode && (action.type === 'Navigation/NAVIGATE' || action.type === 'Navigation/BACK'))
		//@ts-ignore
		console.log(currentRoute.map(x => x.routeName).join(' > '));

	// if (currentScreen.routeName == 'settings') {
	// 	navigate('home');
	// }
}

export default {
	navigate,
	setTopLevelNavigator,
	getTopLevelNavigator,
	trackingNavigationStateChange,
	dispatch,
	goBack,
	resetStack,
	getActiveRoute,
	getActiveRouteStack,
};
