import images from './images';
import Color from './colors';
import Font from './fonts';
import commonStyles from './styles/common-styles';
import { i18n as I18n } from '@app/configs/locales/i18n';
import { getAppThemeType, ThemeType } from '@app/configs/theme';

export default {
	get images() {
		return images;
	},
	get colors() {
		return Color
	},
	get fonts() {
		return Font;
	},
	get styles() {
		return commonStyles;
	},
	strings(name:string, params = {}) : string {
		return I18n.t(name, params)
	},
	icons(iconName: string): string  {
		return getAppThemeType() == ThemeType.Material ? `md-${iconName}` : `ios-${iconName}`;
	}
};
