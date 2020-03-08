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
import R from '@app/res/R';
import router from '@app/navigators/router';
import ListContent from '@app/components/ListContent/ListContent';
import configs from '@app/configs';

export default class HomeComponent extends React.Component<Props, State> {
	public static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
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

	public componentDidMount() {
		this.props.fetchData();
	}

	private renderItem(movie: Movie, index: number) {
		return (
			<View style={{ flex: 1, flexDirection: 'row', padding: 8 }}>
				<Thumbnail square source={{ uri: configs.imgBaseUrl + 'w200' + movie.poster_path }} />
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

				<Button transparent onPress={() => router.details(movie.id)}>
					<Text>{R.strings('view')}</Text>
				</Button>
			</View>
		);
	}
	public render() {
		return (
			<Container>
				<ListContent
					loadData={(page, refresh) => {
						this.props.fetchData(page, refresh);
					}}
					lastLoadedPage={this.props.lastPage}
					loading={this.props.loading}
					loaded={this.props.loaded}
					refreshing={this.props.refreshing}
					error={this.props.error}
					data={this.props.data}
					renderItem={(item, index) => this.renderItem(item, index)}
				/>
			</Container>
		);
	}
}
