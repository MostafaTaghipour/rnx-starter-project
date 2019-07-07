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



const route: NavigationRouteConfigMap = {
	home: { screen: HomeStack, path: 'home' },
	settings: { screen: SettingsScreen, path: 'settings' },
};

const config: BottomTabNavigatorConfig = {
	tabBarComponent: props => {
		return (
			<Footer>
				<FooterTab>
					<Button
						vertical
						active={props.navigation.state.index === 0}
						onPress={() => props.navigation.navigate('home')}
					>
						<Icon name={R.icons('home')} />
						<Text >{R.strings('home.title')}</Text>
					</Button>
					<Button
						vertical
						active={props.navigation.state.index === 1}
						onPress={() => props.navigation.navigate('settings')}
					>
						<Icon name={R.icons('settings')} />
						<Text>{R.strings('settings.title')}</Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	},
};

export default createBottomTabNavigator(route, config);
