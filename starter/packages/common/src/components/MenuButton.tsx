import { Icon, Button, View } from 'native-base';
import React from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { getNavigationType, NavigationType } from '@app/navigators/mainNavigator';


interface MenuButtonProps {
	navigation: NavigationScreenProp<NavigationRoute<any>, any>;
}

export default class MenuButton extends React.Component<MenuButtonProps, Object> {
	render() {
		if (getNavigationType() === NavigationType.Drawer) {
			return (
				<Button transparent onPress={() => this.props.navigation.openDrawer()}>
					<Icon name="menu" />
				</Button>
			);
		} else {
			return <View />;
		}
	}
}
