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
import SettingsScreen from '@app/screens/setting';
import { Image } from 'react-native';
import Hr from '@app/components/Hr';

const itemStyle = () => {
	return {
		fontFamily: R.fonts.medium,
		padding: 16,
	};
};

function renderDrawerContent(props: DrawerItemsProps) {
	return (
		<Container>
			<Content>
				<View
					style={{
						flex: 1,
						height: 200,
						alignItems: 'center',
						backgroundColor: R.colors.brand,
					}}
				>
					<Image source={R.images.app_icon} style={{ width: 100, height: 100, marginTop: 40 }} />
					<Text style={{ color: R.colors.white }}>{R.strings('welcome_msg')}</Text>
				</View>
				<DrawerItems {...props} />
			</Content>
		</Container>
	);
}

const route: NavigationRouteConfigMap = {
	home: {
		screen: HomeStack,
		navigationOptions: {
			drawerLabel: () => <Text style={itemStyle()}>{R.strings('home.title')}</Text>,
			drawerIcon: () => <Icon name={R.icons('home')} />,
		},
	},
	settings: {
		screen: SettingsScreen,
		navigationOptions: {
			drawerLabel: () => <Text style={itemStyle()}>{R.strings('settings.title')}</Text>,
			drawerIcon: () => <Icon name={R.icons('settings')} />,
		},
	},
};
const config: DrawerNavigatorConfig = {
	drawerPosition: Locale.isRTL ? 'right' : 'left',
	contentComponent: props => {
		return renderDrawerContent(props);
	},
};

export default createDrawerNavigator(route, config);
