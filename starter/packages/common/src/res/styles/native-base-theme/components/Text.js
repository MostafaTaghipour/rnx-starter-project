// @flow

import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const textTheme = {
		fontSize: variables.DefaultFontSize,
		fontFamily: variables.fontFamily,
		direction: variables.textDirection,
		alignSelf: variables.textAlignSelf,
		textAlign: variables.textAlign,
		color: variables.textColor,
		'.note': {
			color: '#a7a7a7',
			fontSize: variables.noteFontSize,
		},
	};

	return textTheme;
};
