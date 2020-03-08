import {
	NavigationTransitionProps,
	StackNavigatorConfig,
	StackViewTransitionConfigs,
} from 'react-navigation';
import { getTransitionType, TransitionType } from './transitionOptions';

const stackConfig: StackNavigatorConfig = {
	mode: 'card',
	transparentCard: true,
	navigationOptions: {
		gesturesEnabled: true,
	},
	cardStyle: {
		backgroundColor: '#000',
		// shadowColor: '#000',
		// shadowOffset: {
		// 	width: 2,
		// 	height: 3,
		// },
		// shadowRadius: 8,
		// shadowOpacity: 0.8,
		// elevation: 8,
	},
	transitionConfig: () =>
		getTransitionType() == TransitionType.iosStyle
			? StackViewTransitionConfigs.SlideFromRightIOS
			: StackViewTransitionConfigs.FadeInFromBottomAndroid,
};

export default stackConfig;
