/* eslint-disable @typescript-eslint/no-var-requires */
import ReactNative from 'react-native';
import { i18n as I18n } from './i18n';
import Constant from '@app/configs/const';
// import moment from 'moment-jalaali'

// Import all locales
const en = require('@app/res/strings-en.json');
const fa = require('@app/res/strings-fa.json');

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
	en,
	fa,
};

export default class Locale {
	public static get current(): string {
		return I18n.currentLocale();
	}
	public static set current(locale: string) {
		I18n.locale = locale;

		// Allow RTL alignment in RTL languages
		ReactNative.I18nManager.forceRTL(this.isLocaleRTL(locale));
		ReactNative.I18nManager.allowRTL(this.isLocaleRTL(locale));
		// set moment locale
		// if (locale===Constant.LOCALE_FA){
		//   moment.loadPersian({ dialect: 'persian-modern' })
		// }
		// else{
		//   moment.locale(Constant.LOCALE_EN)
		// }
	}

	public static get isRTL(): boolean {
		return ReactNative.I18nManager.isRTL;
	}

	public static get isPersian(): boolean {
		return this.current === Constant.LOCALE_FA;
	}

	public static isLocaleRTL(locale: string): boolean {
		return (
			locale.indexOf(Constant.LOCALE_HE) === 0 ||
			locale.indexOf(Constant.LOCALE_AR) === 0 ||
			locale.indexOf(Constant.LOCALE_FA) === 0
		);
	}
}
