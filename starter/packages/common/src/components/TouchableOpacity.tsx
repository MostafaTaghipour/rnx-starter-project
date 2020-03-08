import React from 'react';
import { TouchableOpacityProps, TouchableOpacity as TO } from 'react-native';
import Constant from '@app/configs/const';

export default class TouchableOpacity extends React.Component<TouchableOpacityProps> {
	public render() {
		return <TO activeOpacity={Constant.TOUCHABLE_OPACITY_ACTIVE_LEVEL} {...this.props} />;
	}
}
