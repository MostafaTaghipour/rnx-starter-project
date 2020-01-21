import { Content, View, Text, Icon } from 'native-base';
import React from 'react';
import R from '@app/res/R';
import Constant from '@app/configs/const';
import { StyleSheet } from 'react-native';
import { iconType } from '@app/types';

interface Props {
	icon: string;
	iconType? : iconType
	iconSize?: number;
	title: string;
	extraComponent?: () => React.ReactElement;
}

interface State {}

export default class EmptyContent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<Content scrollEnabled={false} contentContainerStyle={[R.styles.containerCenter,R.styles.padding_16]}>
				<View style={styles.emptySection}>
					<Icon
						name={this.props.icon}
						type={this.props.iconType || Constant.DEFAULT_ICON_FAMILY}
						style={[styles.emptyIcon, this.props.iconSize && { fontSize: this.props.iconSize }]}
					/>
					<Text style={styles.emptyTitle}>{this.props.title }</Text>
					{this.props.extraComponent && this.props.extraComponent()}
				</View>
			</Content>
		);
	}
}

const styles = StyleSheet.create({
	emptyIcon: {
		get color() {
			return R.colors.brand;
		},
		fontSize: 100,
	},
	emptySection: { alignItems: 'center', marginTop: -24 },
	emptyTitle: { color: R.colors.textLighten(2), marginTop: 24 ,  lineHeight:35  , textAlign:'center'},
});
