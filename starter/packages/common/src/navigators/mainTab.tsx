import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabNavigatorConfig,
	NavigationRouteConfigMap,
} from 'react-navigation';
import { HomeStack } from './homeStack';
import SettingsScreen from '@app/screens/setting';
import R from '@app/res/R';
import routeNames from './routeNames';
import router from './router';
import { SettingsStack } from './settingsStack';
import { View } from 'react-native';

const route: NavigationRouteConfigMap = {
	[routeNames.HOME]: { screen: HomeStack, path: '' },
	[routeNames.SETTINGS]: { screen: SettingsStack, path: 'settings' },
};

const config: BottomTabNavigatorConfig = {
	tabBarComponent: props => {
		return (
			<View accessibilityLabel="footer-root">
				<Footer>
					<FooterTab>
						<Button
							vertical
							active={props.navigation.state.index === 0}
							onPress={() => router.home()}
						>
							<Icon name={R.ionIcons('home')} />
							<Text>{R.strings('home.title')}</Text>
						</Button>
						<Button
							vertical
							active={props.navigation.state.index === 1}
							onPress={() => router.settings()}
						>
							<Icon name={R.ionIcons('settings')} />
							<Text>{R.strings('settings.title')}</Text>
						</Button>
					</FooterTab>
				</Footer>
			</View>
		);
	},
};

export default createBottomTabNavigator(route, config);
