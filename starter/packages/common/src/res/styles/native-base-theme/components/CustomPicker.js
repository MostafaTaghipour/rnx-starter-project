import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const platformStyle = variables.platformStyle;
	const platform = variables.platform;

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
