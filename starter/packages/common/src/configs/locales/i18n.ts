import * as RNLocalize from 'react-native-localize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const i18n = require('i18n-js');

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
	i18n.locale = locales[0].languageTag;
}

export default i18n;
