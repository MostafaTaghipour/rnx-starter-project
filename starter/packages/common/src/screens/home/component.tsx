import {
	Body,
	Button,
	Container,
	Content,
	Header,
	Left,
	Right,
	Text,
	Title,
	H3,
	Spinner,
	Thumbnail,
} from 'native-base';
import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Props, State } from '.';
import styles from './style';
import { FlatList, View, RefreshControl } from 'react-native';
import MenuButton from '@app/components/MenuButton';
import { Movie } from '@app/store/movie/types';
import { BASE_IMAGE_URL } from '@app/configs/webApi';
import R from '@app/res/R';


export default class HomeComponent extends React.Component<Props, State> {
	static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
		header: () => {
			return (
				<Header>
					<Left>
						<MenuButton navigation={navigation} />
					</Left>
					<Body>
						<Title>{R.strings('home.title')}</Title>
					</Body>
					<Right />
				</Header>
			);
		},
	});

	componentDidMount() {
		this.props.fetchData();
	}

	renderItems(movie: Movie) {
		return (
			<View style={{ flex: 1, flexDirection: 'row', padding: 8 }}>
				<Thumbnail square source={{ uri: BASE_IMAGE_URL + 'w200' + movie.poster_path }} />
				<View
					style={{
						paddingLeft: 8,
						paddingRight: 8,
						flexGrow: 1,
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				>
					<Text>{movie.title.substring(0, 20)}</Text>
					<Text note numberOfLines={1} style={{ width: 200 }}>
						{movie.overview}
					</Text>
				</View>

				<Button
					transparent
					onPress={() => this.props.navigation.navigate('details', { id: movie.id })}
				>
					<Text>{R.strings('view')}</Text>
				</Button>
			</View>
		);
	}
	render() {
		let content = <View />;
		if (this.props.moviesFetched && this.props.movies.length > 0)
			content = (
				<FlatList
					style={{ width: '100%' }}
					data={this.props.movies}
					keyExtractor={item => item.title}
					renderItem={({ item }) => this.renderItems(item)}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={this.props.isFetching}
							onRefresh={() => this.props.fetchData()}
						/>
					}
				/>
			);
		else if (this.props.isFetching && !this.props.moviesFetched) content = <Spinner />;
		else content = <H3 style={styles.secondaryText}>{R.strings('empty_text')}</H3>;

		return (
			<Container>
				<Content scrollEnabled={false} contentContainerStyle={R.styles.containerCenter}>{content}</Content>
			</Container>
		);
	}
}
