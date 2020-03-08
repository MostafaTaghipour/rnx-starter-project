import mainDrawer from './mainDrawer';
import mainTab from './mainTab';
import CurrentDevice, { DeviceOS } from '@app/configs/device';

enum TransitionOption {
	BasedOnPlatform,
	ForceIosStyle,
	ForceAndroidStyle,
}

export enum TransitionType {
	iosStyle,
	AndroidStyle,
}

const NATIVE_TRANS = TransitionOption.BasedOnPlatform;
const WEB_TRANS = NATIVE_TRANS;

export function getTransitionType(): TransitionType {
	if (CurrentDevice.Platform.isNative) {
		if (NATIVE_TRANS == TransitionOption.BasedOnPlatform)
			return CurrentDevice.OS.type === DeviceOS.Mac || CurrentDevice.OS.type === DeviceOS.iOS
				? TransitionType.iosStyle
				: TransitionType.AndroidStyle;
		else if (NATIVE_TRANS == TransitionOption.ForceIosStyle) return TransitionType.iosStyle;
		else return TransitionType.AndroidStyle;
	} else {
		if (WEB_TRANS == TransitionOption.BasedOnPlatform)
			return CurrentDevice.OS.type === DeviceOS.Mac || CurrentDevice.OS.type === DeviceOS.iOS
				? TransitionType.iosStyle
				: TransitionType.AndroidStyle;
		else if (WEB_TRANS == TransitionOption.ForceIosStyle) return TransitionType.iosStyle;
		else return TransitionType.AndroidStyle;
	}
}
