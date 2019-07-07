import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const customPickerTheme = {
		container: {
			flex: 1,
			backgroundColor: 'blue',
		},
		textContent: {
			fontSize: 20,
			color: 'yellow',
		},
	};
	return customPickerTheme;
};
