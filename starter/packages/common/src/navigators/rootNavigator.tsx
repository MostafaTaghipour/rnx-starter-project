import {
	createStackNavigator,
	NavigationRouteConfigMap,
	StackNavigatorConfig,
} from 'react-navigation';
import { Easing, Animated } from 'react-native';
import { PickerModalScreen } from '@app/components/picker/Picker';
import { DatePickerModalScreen } from '@app/components/picker/DatePicker';
import AuthScreen from '@app/screens/auth';
import { MainNavigator } from './mainNavigator';
import SplashScreen from '@app/screens/splash';
const { withBrowserHistory } = require('react-navigation-browser-history-helpers');


/* for custom transition use this libraries:
	https://github.com/plmok61/react-navigation-transitions
	https://github.com/fram-x/FluidTransitions
	https://medium.com/async-la/custom-transitions-in-react-navigation-2f759408a053
*/
export const creatRootNavigator = (isSignedIn?: boolean): any => {
	// const initialRouteName = isSignedIn == undefined ? 'loading' : isSignedIn ? 'app' : 'auth';
	// const root= createSwitchNavigator(
	// 	{
	// 		loading: {
	// 			screen: SplashScreen,
	// 			path: 'loading',
	// 		},
	// 		auth: {
	// 			screen: AuthScreen,
	// 			path: 'auth',
	// 		},
	// 		app: {
	// 			screen: MainNavigator,
	// 			path: '',
	// 		},
	// 	},
	// 	{
	// 		initialRouteName: initialRouteName,
	// 	}
	// );

	const root = isSignedIn == undefined ? SplashScreen : isSignedIn ? MainNavigator : AuthScreen;

	const route: NavigationRouteConfigMap = {
		index: {
			screen: root,
			path: '',
		},
		pickerModal: {
			screen: PickerModalScreen,
			path: 'picker-modal',
		},
		datePickerModal: {
			screen: DatePickerModalScreen,
			path: 'date-picker-modal',
		},
	};

	const config: StackNavigatorConfig = {
		initialRouteName: 'index',
		headerMode: 'none',
		mode: 'modal',
		transparentCard: true,
		// navigationOptions:{
		// 	gesturesEnabled: true,
		// 	gestureDirection:'default',
		// 	gestureResponseDistance:{
		// 		vertical:60,
		// 	}
		// },
		transitionConfig: () => ({
			containerStyle: {
				backgroundColor: '#000000',
			},
			transitionSpec: {
				duration: 500,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing,
				useNativeDriver: true,
			},
			screenInterpolator: sceneProps => {
				const { layout, position, scene } = sceneProps;
				const thisSceneIndex = scene.index;
				const height = layout.initHeight;
				const translateY = position.interpolate({
					inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
					outputRange: [height, 0, 0],
				});
				const opacity = position.interpolate({
					inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
					outputRange: [1, 1, 0.5],
				});
				return { opacity, transform: [{ translateY }] };
			},
		}),
	};

	const RootNav = createStackNavigator(route, config);

	return withBrowserHistory(RootNav);
};


