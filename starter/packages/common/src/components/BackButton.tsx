import { Icon, Button } from 'native-base';
import React from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import Locale from '@app/configs/locales';
import R from '@app/res/R';

interface BackButtonProps {
	navigation: NavigationScreenProp<NavigationRoute<any>, any>;
}

export default class BackButton extends React.Component<BackButtonProps, Object> {
	render() {
		return (
			<Button transparent onPress={() => this.props.navigation.goBack()}>
				<Icon style={{ transform: [{ scaleX: Locale.isRTL ? -1 : 1 }] }} name={R.icons("arrow-back")} />
			</Button>
		);
	}
}
