// @flow

import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const contentTheme = {
		flex: 1,
		backgroundColor: 'transparent',
		'NativeBase.Segment': {
			borderWidth: 0,
			backgroundColor: 'transparent',
		},
	};

	return contentTheme;
};
