export const i18n = require('i18n-js');
import * as RNLocalize from "react-native-localize";

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
    i18n.locale = locales[0].languageTag;
}

export default i18n;
