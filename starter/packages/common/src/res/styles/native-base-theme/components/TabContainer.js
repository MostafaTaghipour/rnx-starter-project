// @flow

import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const platformStyle = variables.platformStyle;
	const platform = variables.platform;

	const tabContainerTheme = {
		elevation: 3,
		height: 50,
		flexDirection: 'row',
		shadowColor: platformStyle === 'material' ? '#000' : undefined,
		shadowOffset: platformStyle === 'material' ? { width: 0, height: 2 } : undefined,
		shadowOpacity: platformStyle === 'material' ? 0.2 : undefined,
		shadowRadius: platformStyle === 'material' ? 1.2 : undefined,
		justifyContent: 'space-around',
		borderBottomWidth: platform === 'ios' ? variables.borderWidth : 0,
		borderColor: variables.topTabBarBorderColor,
	};

	return tabContainerTheme;
};
