import { Content, Spinner } from 'native-base';
import React from 'react';
import R from '@app/res/R';

interface Props {
	spinnerColor?: string;
}

interface State {}

export default class WaitingContent extends React.Component<Props, State> {
	public constructor(props: Props) {
		super(props);
	}

	public render() {
		return (
			<Content
				scrollEnabled={false}
				contentContainerStyle={[R.styles.containerCenter, R.styles.padding_16]}
			>
				<Spinner color={this.props.spinnerColor} />
			</Content>
		);
	}
}
