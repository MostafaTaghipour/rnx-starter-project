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
import { getAppStyle, getAppThemeType } from '@app/configs/theme';
import Toaster from '@app/components/Toaster';
import R from '@app/res/R';
import navigationService from '@app/navigators/navigationService';
import { Helmet } from 'react-helmet';

export default class RootComponent extends React.Component<Props, State> {
	initHeight: number = 0;
	initWidth: number = 0;

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
		this.initHeight = CurrentDevice.Dimension.height;
		this.initWidth = CurrentDevice.Dimension.width;
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
		if (CurrentDevice.Platform.isNative) {
			const isLandscape = CurrentDevice.Dimension.width > CurrentDevice.Dimension.height;
			if (this.props.isLandscape != isLandscape) this.props.setLandscapeState(isLandscape);
		}

		const size = CurrentDevice.Dimension.size;
		if (this.props.screenSize != size) this.props.setScreenSize(size);
	}

	render() {
		const { token } = this.props;
		const isSignedIn = token ? true : false;
		const RootNavigator = creatRootNavigator(isSignedIn);

		return (
			<Root accessibilityLabel={this.generateAppInfoString()}>
				<StyleProvider style={getAppStyle(this.props.nightMode)}>
					<View
						accessibilityLabel="root-view"
						style={{ flex: 1 }}
						onLayout={this.onLayout.bind(this)}
					>
						{CurrentDevice.Platform.isWeb && (
							<Helmet>
								<html lang={Locale.current} />
								<meta name="description" content="this is a good site" />
								<script type="application/ld+json">{`
									{
										"@context": "http://schema.org"
									}
								`}</script>
							</Helmet>
						)}

						<RootNavigator
							// persistenceKey={Constant.NAVIGATION_PERSIST_KEY}
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

	private generateAppInfoString(): string {
		return `lang = ${this.props.locale}; direction = ${Locale.isRTL ? 'rtl' : 'ltr'}; platform = ${
			CurrentDevice.Platform.type
		}; os = ${CurrentDevice.OS.type}; theme = ${getAppThemeType().toString()}; theme-mode = ${
			this.props.nightMode ? 'dark' : 'light'
		};`;
	}
}
