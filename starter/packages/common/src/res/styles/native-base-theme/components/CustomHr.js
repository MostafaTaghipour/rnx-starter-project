// @flow
import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const platformStyle = variables.platformStyle;
	const platform = variables.platform;

	const customHrTheme = {
		line: {
			flex: 1,
			height: variables.hrLineHeight,
			backgroundColor: variables.hrLineColor,
		},
		text: {
			color: variables.hrTextColor,
			flex: 1,
			textAlign: 'center',
			marginLeft: 15,
			marginRight: 15,
		},
	};

	return customHrTheme;
};
