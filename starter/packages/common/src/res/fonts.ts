import Locale from '@app/configs/locales';
import { getAppThemeType, ThemeType } from '@app/configs/theme';
import CurrentDevice from '@app/configs/device';

export default {
	get thin(): string {
		return Locale.isPersian ? 'Vazir-Thin-FD' : getLatinFont();
	},
	get light(): string {
		return Locale.isPersian ? 'Vazir-Light-FD' : getLatinFont();
	},
	get regular(): string {
		return Locale.isPersian ? 'Vazir-FD' : getLatinFont();
	},
	get medium(): string {
		return Locale.isPersian ? 'Vazir-Medium-FD' : getLatinFont(true);
	},
	get bold(): string {
		return Locale.isPersian ? 'Vazir-Bold-FD' : getLatinFont(true);
	},
	get default(): string {
		return this.regular;
	},
};

function getLatinFont(isMedium: boolean = false): string {
	if (getAppThemeType() == ThemeType.Apple) return CurrentDevice.Platform.isNative ? 'System' : '';
	return isMedium ? 'Roboto_medium' : 'Roboto';
}
