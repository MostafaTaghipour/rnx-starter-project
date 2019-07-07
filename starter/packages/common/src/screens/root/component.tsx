import React from 'react';
import { StyleProvider, View, Root, Text } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { Animated, LayoutChangeEvent, Dimensions } from 'react-native';
import { Props, State } from '.';
import style from './style';
import Locale from '@app/configs/locales';
import CurrentDevice from '@app/configs/device';
import { Reachability } from '@app/configs/reachability';
import { creatRootNavigator } from '@app/navigators/rootNavigator';
import { getAppStyle } from '@app/configs/theme';
import Toaster from '@app/components/Toaster';
import R from '@app/res/R';
import navigationService from '@app/navigators/navigationService';
import SplashComponent from '../splash/component';
import Constant from '@app/configs/const';

export default class RootComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		Locale.current = props.locale;

		this.state = {
			bannerAnim: new Animated.Value(this.props.isConnectToInternet ? 0 : 1),
		};
	}

	componentDidMount() {
		if (CurrentDevice.Platform.isNative) {
			SplashScreen.hide();
		}

		Reachability.getInstance().registerForConnectionChange();
	}

	componentWillUnmount() {
		Reachability.getInstance().unregisterForConnectionChange();
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.isConnectToInternet !== this.props.isConnectToInternet) {
			Animated.timing(this.state.bannerAnim, {
				toValue: prevProps.isConnectToInternet ? 1 : 0,
				duration: 300,
			}).start();
		}
	}

	onLayout(e: LayoutChangeEvent) {
		const isLandscape = e.nativeEvent.layout.width > e.nativeEvent.layout.height;
		 this.props.setLandscapeState(isLandscape);

		const size = CurrentDevice.Dimension.size;
		if (this.props.screenSize != size) this.props.setScreenSize(size);


	}

	render() {
		const { token } = this.props;
		const isSignedIn = token ? true : false;
		const RootNavigator = creatRootNavigator(isSignedIn);

		return (
			<Root accessibilityLabel="native-base-root">
				<StyleProvider style={getAppStyle(true)}>
					<View style={{ flex: 1 }} onLayout={this.onLayout.bind(this)}>
						<RootNavigator
							persistenceKey={Constant.NAVIGATION_PERSIST_KEY}
							// renderLoadingExperimental={() => <SplashComponent />}
							onNavigationStateChange={navigationService.trackingNavigationStateChange}
							navigatorRef={(navigatorRef: any) =>
								navigationService.setTopLevelNavigator(navigatorRef)
							}
						/>
						<Toaster />
						{this.props.isConnectToInternet ? null : (
							<Animated.View style={[style.offlineBrand, { opacity: this.state.bannerAnim }]}>
								<Text>{R.strings('offline_mode_desc')}</Text>
							</Animated.View>
						)}
					</View>
				</StyleProvider>
			</Root>
		);
	}
}
