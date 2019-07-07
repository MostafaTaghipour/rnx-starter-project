import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	containerCenter: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	flex_1: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
	},
	col: {
		flexDirection: 'column',
	},
	full_width: {
		width: '100%',
	},
	full_height: {
		height: '100%',
	},
	align_self_center:{
		alignSelf:'center'
	},
	align_self_start:{
		alignSelf:'flex-start'
	}
});
