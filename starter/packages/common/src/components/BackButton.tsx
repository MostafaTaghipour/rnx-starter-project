import { Icon, Button } from 'native-base';
import React from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import R from '@app/res/R';
import navigationService from '@app/navigators/navigationService';

interface BackButtonProps {}

export default class BackButton extends React.Component<BackButtonProps, Object> {
	render() {
		return (
			<Button transparent onPress={() => navigationService.goBack()}>
				<Icon style={R.styles.rtl_mirror} name={R.ionIcons('arrow-back')} />
			</Button>
		);
	}
}
