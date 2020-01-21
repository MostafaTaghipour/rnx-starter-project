import { Content, View, Text, Icon, Spinner } from 'native-base';
import React from 'react';
import R from '@app/res/R';
import Constant from '@app/configs/const';
import { StyleSheet } from 'react-native';
import { iconType } from '@app/types';

interface Props {
	spinnerColor?: string;
}

interface State {}

export default class WaitingContent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<Content
			scrollEnabled={false} contentContainerStyle={[R.styles.containerCenter,R.styles.padding_16]}
			>
				<Spinner color={this.props.spinnerColor} />
			</Content>
		);
	}
}

const styles = StyleSheet.create({});
