import React from 'react';
import { View, Text } from 'native-base';
import { FlatList } from 'react-native';
import { styles, calendarYearCellContentStyle, calendarYearCellTextStyle } from './styles';
import { CalendarYearItem } from './types';
import { EmptyState } from '@app/types';
import TouchableOpacity from '../TouchableOpacity';

interface Props {
	data: CalendarYearItem[];
	onYearSelect: (item: CalendarYearItem) => any;
}

export default class YearView extends React.Component<Props, EmptyState> {
	private listRef: React.RefObject<FlatList<CalendarYearItem>> = React.createRef();

	public constructor(props: Props) {
		super(props);
	}

	public componentDidMount() {
		setTimeout(() => {
			this.scrollToToday();
		}, 1000);
	}

	private scrollToToday = () => {
		const today = this.props.data.filter((item, index) => item.isThisYear)[0];

		if (this.listRef.current) this.listRef.current.scrollToItem({ animated: false, item: today });
	};

	private renderYears(item: CalendarYearItem) {
		return (
			<TouchableOpacity
				onPress={() => this.props.onYearSelect(item)}
				style={styles.calendarYearCell}
				disabled={item.isDisabled}
			>
				<View style={calendarYearCellContentStyle(item)}>
					<Text style={calendarYearCellTextStyle(item)}>{item.year.toString()}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	public render() {
		return (
			<FlatList
				ref={this.listRef}
				style={styles.calendarYearList}
				data={this.props.data}
				getItemLayout={(data, index) => ({
					length: 60,
					offset: 60 * index,
					index,
				})}
				keyboardShouldPersistTaps="always"
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.year.toString()}
				renderItem={({ item }) => this.renderYears(item)}
			/>
		);
	}
}
