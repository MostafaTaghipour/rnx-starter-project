// @flow

import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const h3Theme = {
		color: variables.textColor,
		fontSize: variables.fontSizeH3,
		fontFamily: variables.fontFamily,
		lineHeight: variables.lineHeightH3,
		textAlign: variables.textAlign,
		alignSelf: variables.textAlignSelf,
		direction: variables.textDirection,
	};

	return h3Theme;
};
