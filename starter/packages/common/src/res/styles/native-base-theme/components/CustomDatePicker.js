import variable from '../variables/apple';

export default (variables /*: * */ = variable) => {
	const customDatePickerTheme = {
		container: {
			flex: 1,
			backgroundColor: 'blue',
		},
		textContent: {
			fontSize: 20,
			color: 'yellow',
		},
	};
	return customDatePickerTheme;
};
