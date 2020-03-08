import { Icon, Text, Content, Container, View } from 'native-base';
import React from 'react';
import {
	createDrawerNavigator,
	NavigationRouteConfigMap,
	DrawerNavigatorConfig,
	DrawerItems,
	DrawerItemsProps,
} from 'react-navigation';
import { HomeStack } from './homeStack';
import R from '@app/res/R';
import Locale from '@app/configs/locales';
import { Image } from 'react-native';
import { isNightMode, getAppThemeType, ThemeType } from '@app/configs/theme';
import Hr from '@app/components/Hr';
import CurrentDevice from '@app/configs/device';
import routeNames from './routeNames';
import { SettingsStack } from './settingsStack';

const itemStyle = () => {
	return {
		fontFamily: R.fonts.medium,
		padding: 16,
	};
};

const iconStyle = () => {
	return [
		isNightMode() && {
			color:
				getAppThemeType() == ThemeType.Material
					? R.colors.materialNightLightColor
					: R.colors.appleNightLightColor,
		},
	];
};

const drawerHeaderStyle = (): any => {
	return [
		{
			flex: 1,
			height: 200,
			alignItems: 'center',
			backgroundColor: R.colors.brand,
			padding: 20,
		},
		isNightMode() && {
			backgroundColor: undefined,
		},
	];
};

function renderDrawerContent(props: DrawerItemsProps) {
	return (
		<Container>
			<Content>
				<View style={drawerHeaderStyle()}>
					<Image source={R.images.app_icon} style={{ width: 100, height: 100, marginTop: 30 }} />
					<Text style={{ color: R.colors.white }}>{R.strings('welcome_msg')}</Text>
				</View>
				<Hr />
				<DrawerItems {...props} />
			</Content>
		</Container>
	);
}

const route: NavigationRouteConfigMap = {
	[routeNames.HOME]: {
		screen: HomeStack,
		navigationOptions: {
			drawerLabel: () => <Text style={itemStyle()}>{R.strings('home.title')}</Text>,
			drawerIcon: () => <Icon style={iconStyle()} name={R.ionIcons('home')} />,
		},
		path: '',
	},
	[routeNames.SETTINGS]: {
		screen: SettingsStack,
		navigationOptions: {
			drawerLabel: () => <Text style={itemStyle()}>{R.strings('settings.title')}</Text>,
			drawerIcon: () => <Icon style={iconStyle()} name={R.ionIcons('settings')} />,
		},
		path: 'settings',
	},
};
const config: DrawerNavigatorConfig = {
	drawerPosition: CurrentDevice.Platform.isAndroid ? (Locale.isRTL ? 'right' : 'left') : 'left',
	contentComponent: props => {
		return renderDrawerContent(props);
	},
};

export default createDrawerNavigator(route, config);
