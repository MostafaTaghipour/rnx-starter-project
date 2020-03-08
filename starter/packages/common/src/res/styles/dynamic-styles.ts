import { StyleSheet } from 'react-native';
import Locale from '@app/configs/locales';

export default () => {
	return StyleSheet.create({
		get rtl_mirror() {
			return { transform: [{ scaleX: Locale.isRTL ? -1 : 1 }] };
		},
	});
};
