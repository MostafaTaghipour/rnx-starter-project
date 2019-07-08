// @flow

import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const inputTheme = {
		'.multiline': {
			height: null,
		},
		height: variables.inputHeightBase,
		color: variables.inputColor,
		paddingLeft: 5,
		paddingRight: 5,
		flex: 1,
		fontFamily: variables.fontFamily,
		fontSize: variables.inputFontSize,
		textAlign: variables.textAlign,
		alignSelf: variables.textAlignSelf,
		direction: variables.textDirection,
	};

	return inputTheme;
};
