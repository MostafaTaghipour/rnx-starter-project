
import mainDrawer from './mainDrawer';
import mainTab from './mainTab';
import CurrentDevice, { DeviceOS } from '@app/configs/device';

enum NavigationOption {
	BasedOnPlatform,
	ForceTab,
	ForceDrawer,
}


export enum NavigationType{
	Tab,
	Drawer
}

const NATIVE_NAV = NavigationOption.BasedOnPlatform;
const WEB_NAV = NATIVE_NAV;


export function getNavigationType(): NavigationType {
	if (CurrentDevice.Platform.isNative) {
		if (NATIVE_NAV == NavigationOption.BasedOnPlatform)
			return CurrentDevice.OS.type === DeviceOS.Mac || CurrentDevice.OS.type === DeviceOS.iOS
				? NavigationType.Tab
				: NavigationType.Drawer;
		else if (NATIVE_NAV == NavigationOption.ForceTab) return NavigationType.Tab;
		else return NavigationType.Drawer;
	} else {
		if (WEB_NAV == NavigationOption.BasedOnPlatform)
			return CurrentDevice.OS.type === DeviceOS.Mac || CurrentDevice.OS.type === DeviceOS.iOS
				? NavigationType.Tab
				: NavigationType.Drawer;
		else if (WEB_NAV == NavigationOption.ForceTab) return NavigationType.Tab;
		else return NavigationType.Drawer;
	}
}


export const MainNavigator = getNavigationType()===NavigationType.Tab ? mainTab : mainDrawer;
