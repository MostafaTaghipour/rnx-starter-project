import React from 'react';
import { View, Text } from 'native-base';
import {  FlatList } from 'react-native';
import { styles, calendarMonthCellContentStyle, calendarMonthCellTextStyle } from './styles';
import { CalendarMonthItem } from './types';
import { EmptyState } from '@app/types';
import TouchableOpacity from '../TouchableOpacity';



interface Props {
	data: CalendarMonthItem[];
	onMonthSelect: (item: CalendarMonthItem) => any;
}

export default class MonthView extends React.Component<Props, EmptyState> {
	constructor(props: Props) {
		super(props);
	}

	renderMonths(item: CalendarMonthItem) {
		return (
			<TouchableOpacity
				onPress={() => this.props.onMonthSelect(item)}
				style={styles.calendarMonthCell}
				disabled={item.isDisabled}
			>
				<View style={calendarMonthCellContentStyle(item)}>
					<Text style={calendarMonthCellTextStyle(item)}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	public render() {
		
		return (
		
				<FlatList
					style={styles.calendarMonthList}
					columnWrapperStyle={styles.calendarMonthListRow}
					data={this.props.data}
					numColumns={3}
					keyboardShouldPersistTaps={"always"}
					keyExtractor={(item) => item.title}
					renderItem={({ item }) => this.renderMonths(item)}
				/>
		
		);
	}
}
