import CurrentDevice, { DeviceOS } from './device';
import material from '@app/res/styles/native-base-theme/variables/material';
import apple from '@app/res/styles/native-base-theme/variables/apple';
import materialNight from '@app/res/styles/native-base-theme/variables/material.night';
import appleNight from '@app/res/styles/native-base-theme/variables/apple.night';
import getTheme from '@app/res/styles/native-base-theme/components';
import Constant from './const';

export enum ThemeType {
	Apple,
	Material,
}

enum ThemeOption {
	BasedOnPlatform,
	ForceApple,
	ForceMaterial,
}

const NATIVE_THEME = ThemeOption.BasedOnPlatform;
const WEB_THEME = NATIVE_THEME;

let _nightMode = Constant.DEFAULT_NIGHT_MODE

export const getAppThemeType = (): ThemeType => {
	if (CurrentDevice.Platform.isNative) {
		if (NATIVE_THEME == ThemeOption.BasedOnPlatform)
			return CurrentDevice.OS.type === DeviceOS.Mac || CurrentDevice.OS.type === DeviceOS.iOS
				? ThemeType.Apple
				: ThemeType.Material;
		else if (NATIVE_THEME == ThemeOption.ForceApple) return ThemeType.Apple;
		else return ThemeType.Material;
	} else {
		if (WEB_THEME == ThemeOption.BasedOnPlatform)
			return CurrentDevice.OS.type === DeviceOS.Mac || CurrentDevice.OS.type === DeviceOS.iOS
				? ThemeType.Apple
				: ThemeType.Material;
		else if (WEB_THEME == ThemeOption.ForceApple) return ThemeType.Apple;
		else return ThemeType.Material;
	}
}

export const getAppStyle = (nightMode: boolean): any => {
	_nightMode = nightMode
	var theme: any;
	if (getAppThemeType() === ThemeType.Material) {
		theme = _nightMode ? { ...material, ...materialNight } : material;
	} else {
		theme = _nightMode ? { ...apple, ...appleNight } : apple;
	}
	return getTheme(theme);
}

export const isNightMode = ():  boolean => _nightMode