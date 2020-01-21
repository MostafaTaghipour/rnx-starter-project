import CurrentDevice from '@app/configs/device';
//@ts-ignore
import RNRestart from 'react-native-restart';
import { Linking } from 'react-native';
import Locale from '@app/configs/locales';
import Constant from '@app/configs/const';



export const restartApp = () => {
	if (CurrentDevice.Platform.isNative) {
		RNRestart.Restart();
	} else {
		window.location.reload(false);
	}
};

export const openUrl = (url?: string) => {
	var urlStr = url || '';
	Linking.canOpenURL(urlStr).then(supported => {
		if (supported) {
			Linking.openURL(urlStr);
		} else {
			if (__DEV__) "Don't know how to open URI: " + url;
		}
	});
};

export const callPhoneNumber = (phoneNumber?: string) => {
	var phone = '';

	if (CurrentDevice.Platform.isAndroid) {
		phone = `tel:${phoneNumber}`;
	} else if (CurrentDevice.Platform.isIos) {
		phone = `telprompt:${phoneNumber}`;
	}

	openUrl(phone);
};

const persianNumberArr = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumberArr = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
export const convertPersianNumbersToEnglish = (value: any) => {
	if (typeof value === 'string') {
		let i = 0;
		for (; i < 10; i++) {
			value = value.replace(persianNumberArr[i], i).replace(arabicNumberArr[i], i);
		}
	}
	return value;
};

export const commaSeparated = (array: string[]): string => {
	return array.join(`${Locale.current == Constant.LOCALE_FA ? '،' : ','} `);
};
