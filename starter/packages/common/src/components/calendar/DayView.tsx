import React, { Fragment } from 'react';
import { View, Text } from 'native-base';
import { FlatList } from 'react-native';
import { calendarDayCellContentStyle, calendarDayCellTextStyle, styles } from './styles';
import { CalendarDayItem } from './types';
import { EmptyState } from '@app/types';
import TouchableOpacity from '../TouchableOpacity';

interface Props {
	data: CalendarDayItem[];
	dayTitles: string[];
	onDaySelect: (item: CalendarDayItem) => any;
}

export default class DayView extends React.Component<Props, EmptyState> {
	public constructor(props: Props) {
		super(props);
	}

	private renderDays(item: CalendarDayItem, index: number) {
		return (
			<TouchableOpacity
				key={item.key}
				onPress={() => this.props.onDaySelect(item)}
				style={styles.calendarDayCell}
				disabled={!item.isSelectable || item.isDisabled}
			>
				<View style={calendarDayCellContentStyle(item)}>
					<Text style={calendarDayCellTextStyle(item)}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	private weekdays = this.props.dayTitles.map(day => {
		return (
			<View key={day} style={styles.calendarDayHeaderCell}>
				<Text style={styles.calendarDayHeaderCellText}>{day}</Text>
			</View>
		);
	});

	public render() {
		return (
			<Fragment>
				<View style={styles.calendarDayHeader}>{this.weekdays}</View>
				<FlatList
					style={styles.calendarDayList}
					columnWrapperStyle={styles.calendarDayListRow}
					data={this.props.data}
					numColumns={7}
					keyboardShouldPersistTaps={'always'}
					keyExtractor={(item, index) => item.key}
					renderItem={({ item, index }) => this.renderDays(item, index)}
				/>
			</Fragment>
		);
	}
}
