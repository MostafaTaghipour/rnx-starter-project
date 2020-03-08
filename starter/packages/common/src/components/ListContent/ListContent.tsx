import { Content, View, Spinner, Text, Icon, Button, Fab } from 'native-base';
import React from 'react';
import R from '@app/res/R';
import Constant from '@app/configs/const';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent, FlatListProps } from 'react-native';
import Hr from '@app/components/Hr';
import styles from './styles';
import EmptyContent from '../EmptyContent';
import WaitingContent from '../WaitingContent';
import TouchableOpacity from '../TouchableOpacity';

interface Props {
	loadData: (page: number, refresh: boolean) => any;
	lastLoadedPage: number;
	loading: boolean;
	loaded: boolean;
	refreshing: boolean;
	error?: any;
	disablePagination?: boolean;
	data: any[];
	renderItem: (item: any, index: number) => React.ReactElement;
	emptyStateTitle?: string;
	emptyStateExtraComponent?: () => React.ReactElement;
}

interface State {
	showScrollTop: boolean;
}

export default class ListContent extends React.Component<Props, State> {
	private listRef: React.RefObject<FlatList<any>> = React.createRef();

	public constructor(props: Props) {
		super(props);
		this.state = {
			showScrollTop: false,
		};
	}
	public componentDidMount() {
		this.load();
	}

	private load = (page = Constant.PAGINATION_FIRST_PAGE_NUMBER, refresh: boolean = false): void => {
		this.props.loadData(page, refresh);
	};

	private handleRefresh = (): void => {
		this.load(undefined, true);
	};
	private handleLoadMore = (): void => {
		if (this.props.disablePagination === true) return;
		this.load(this.props.lastLoadedPage + 1, false);
	};

	private onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
		const { y = 0 } = event.nativeEvent.contentOffset;
		const showScrollTop = y > 1000;
		if (this.state.showScrollTop != showScrollTop)
			this.setState(prev => ({
				...prev,
				showScrollTop: showScrollTop,
			}));
	};
	private scrollTop = (): void => {
		if (this.listRef.current) this.listRef.current.scrollToOffset({ animated: true, offset: 0 });
	};

	private renderFooter = (): React.ReactElement | null => {
		{
			if (this.props.loading || this.props.error)
				return (
					<View style={styles.footerContainer}>
						{this.props.loading && <Spinner />}
						{this.props.error && (
							<View style={styles.footerErrorContainer}>
								<Button
									onPress={() => this.handleLoadMore()}
									rounded
									style={styles.footerErrorButton}
								>
									<Icon name={R.ionIcons('refresh')} style={styles.footerErrorButtonIcon} />
								</Button>
								<View style={[R.styles.col, R.styles.margin_top_8, R.styles.margin_start_8]}>
									<Text style={styles.footerErrorTitle}>{R.strings('error.loading_error')}</Text>
									<Text style={styles.footerErrorSubtitle}>
										{R.strings('error.please_try_again')}
									</Text>
								</View>
							</View>
						)}
					</View>
				);
			else return null;
		}
	};

	private renderContent = (): React.ReactElement => {
		var res = <View />;

		//show content
		if (this.props.loaded) {
			//there is data
			if (this.props.data.length > 0) {
				res = (
					<View style={styles.listContainer}>
						<FlatList
							ref={this.listRef}
							style={[R.styles.flex_1]}
							data={this.props.data}
							renderItem={({ item, index }) => this.props.renderItem(item, index)}
							// ItemSeparatorComponent={() => <Hr />}
							keyExtractor={(it, idx) => `${idx}`}
							refreshing={this.props.refreshing}
							onRefresh={this.handleRefresh}
							onEndReached={this.handleLoadMore}
							onEndReachedThreshold={2}
							ListFooterComponent={() =>
								this.props.disablePagination === true ? null : this.renderFooter()
							}
							onScroll={this.onScroll}
						/>
						{this.state.showScrollTop && (
							<TouchableOpacity onPress={() => this.scrollTop()} style={styles.fab}>
								<Icon name={R.ionIcons('arrow-up')} style={styles.fabIcon} />
							</TouchableOpacity>
						)}
					</View>
				);
			}
			//there is no data
			else {
				res = (
					<EmptyContent
						icon={R.ionIcons('cube')}
						title={this.props.emptyStateTitle || R.strings('no_item_exist')}
						extraComponent={this.props.emptyStateExtraComponent}
					/>
				);
			}
		}
		// initial state loading
		else if (this.props.loading && this.props.data.length == 0) {
			res = <WaitingContent />;
		}
		// initial state error
		else if (this.props.error && this.props.data.length == 0) {
			res = res = (
				<EmptyContent
					icon={R.ionIcons('close-circle-outline')}
					title={R.strings('error.loading_error')}
					extraComponent={() => {
						return (
							<Button onPress={() => this.load()} rounded small style={styles.emptyButton}>
								<Icon name={R.ionIcons('refresh')} />
								<Text style={styles.reloadButtonText}>{R.strings('try_again')}</Text>
							</Button>
						);
					}}
				/>
			);
		}
		return res;
	};

	public render() {
		return (
			<Content scrollEnabled={false} contentContainerStyle={R.styles.containerCenter}>
				{this.renderContent()}
			</Content>
		);
	}
}
