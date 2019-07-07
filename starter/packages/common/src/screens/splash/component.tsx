import React from 'react';
import { StatusBar, Image } from 'react-native';
import { Container, Content } from 'native-base';
import { Props, State } from '.';
import images from '@app/res/images';
import R from '@app/res/R';


export default class SplashComponent extends React.Component<Props, State> {
	render() {
		return (
			<Container>
				<StatusBar barStyle="default" />
				<Content contentContainerStyle={[R.styles.containerCenter]}>
					<Image
						source={ images.app_icon}
						style={{ width: 100, height: 100 }}
					/>
				</Content>
			</Container>
		);
	}
}
