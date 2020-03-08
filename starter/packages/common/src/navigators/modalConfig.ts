import { StackNavigatorConfig } from 'react-navigation';
import { Easing, Animated } from 'react-native';

const modalConfig: StackNavigatorConfig = {
	headerMode: 'none',
	mode: 'modal',
	transparentCard: true,
	transitionConfig: () => ({
		containerStyle: {
			backgroundColor: 'rgba(0,0,0,0.7)',
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
				outputRange: [1, 1, 0.2],
			});
			return { opacity, transform: [{ translateY }] };
		},
	}),
};
export default modalConfig;
