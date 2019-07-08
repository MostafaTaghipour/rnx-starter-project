// @flow

import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const platform = variables.platform;

	const toastTheme = {
		'.danger': {
			backgroundColor: variables.brandDanger,
			'NativeBase.Text': {
				color: '#fff',
				flex: 1,
			},
		},
		'.warning': {
			backgroundColor: variables.brandWarning,
			'NativeBase.Text': {
				color: '#fff',
				flex: 1,
			},
		},
		'.success': {
			backgroundColor: variables.brandSuccess,
			'NativeBase.Text': {
				color: '#fff',
				flex: 1,
			},
		},
		backgroundColor: variables.toastBgColor,
		borderRadius: platform === 'ios' ? 5 : 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		minHeight: 50,
		'NativeBase.Text': {
			color: variables.toastTextColor,
			flex: 1,
		},
		'NativeBase.Button': {
			backgroundColor: 'transparent',
			height: 30,
			elevation: 0,
			'NativeBase.Text': {
				fontSize: 14,
			},
		},
	};

	return toastTheme;
};
