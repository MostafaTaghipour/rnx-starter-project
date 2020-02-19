import {
	Body,
	Container,
	Content,
	Header,
	Left,
	Right,
	Title,
	Text,
	View,
	Button,
	H3,
} from 'native-base';
import React, { Fragment } from 'react';
import { Props, State, NavigationProps } from '.';
import { Image } from 'react-native';
import BackButton from '@app/components/BackButton';
import commonStyles from '@app/res/styles/common-styles';
import configs from '@app/configs';
import { Helmet } from 'react-helmet';
import CurrentDevice from '@app/configs/device';

export class DetailComponent extends React.Component<Props, State> {
	static navigationOptions = ({ navigation }: NavigationProps) => ({
		header: (
			<Header>
				<Left>
					<BackButton />
				</Left>
				<Body>
					<Title>{navigation.state.params ? navigation.state.params.title : ''}</Title>
				</Body>
				<Right />
			</Header>
		),
	});

	_setNavigationParams() {
		this.props.navigation.setParams({
			title: this.props.movie ? this.props.movie.title : '',
		});
	}

	componentWillMount() {
		this._setNavigationParams();
	}

	render() {
		const movie = this.props.movie;
		let content;
		if (movie) {
			content = (
				<View style={{ flex: 1 }}>
					<Image
						source={{ uri: configs.imgBaseUrl + 'w500' + movie.poster_path }}
						style={{ height: 500, width: undefined, flex: 1 }}
					/>
					<View style={{ padding: 16 }}>
						<H3>{movie.title}</H3>
						<Text note style={{ marginTop: 16 }}>
							{movie.overview}
						</Text>
					</View>
				</View>
			);
		} else {
			content = <View />;
		}
		return (
			<Fragment>
				{CurrentDevice.Platform.isWeb && (
					<Helmet>
						<title>{this.props.movie ? this.props.movie!!.title : ''}</title>
					</Helmet>
				)}

				<Container>
					<Content contentContainerStyle={commonStyles.containerCenter}>{content}</Content>
				</Container>
			</Fragment>
		);
	}
}
