import { Platform, Dimensions, PixelRatio } from 'react-native';

export enum DevicePlatform {
	Web = 'web',
	iOS = 'ios',
	Android = 'android',
}
export enum DeviceOS {
	Mac = 'mac',
	iOS = 'ios',
	Android = 'android',
	Windows = 'window',
	WindowsPhone = 'windowPhone',
	Linux = 'linux',
	Unknown = 'unknown',
}

export enum BrowserType {
	Edge = 'edge',
	Opera = 'opera',
	Chrome = 'chrome',
	IE = 'ie',
	Firefox = 'firefox',
	Safari = 'safari',
	Unknown = 'unknown',
}

export enum ScreenSize {
	Small = 'small',
	Medium = 'medium',
	Large = 'large',
}

export default class CurrentDevice {
	static Platform = class {
		static get type(): DevicePlatform {
			return this.isWeb
				? DevicePlatform.Web
				: this.isIos
				? DevicePlatform.iOS
				: DevicePlatform.Android;
		}

		static get isWeb(): boolean {
			return Platform.OS === 'web';
		}
		static get isNative(): boolean {
			return !this.isWeb;
		}
		static get isIos(): boolean {
			return Platform.OS === 'ios';
		}
		static get isAndroid(): boolean {
			return Platform.OS === 'android';
		}
	};

	static OS = class {
		static get type(): DeviceOS {
			const plt = Platform.OS;

			if (plt === 'android') return DeviceOS.Android;

			if (plt === 'ios') return DeviceOS.iOS;

			if (plt === 'web') {
				var userAgent = window.navigator.userAgent,
					platform = window.navigator.platform,
					macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
					windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
					windowsPhonePlatforms = ['windows phone', 'windows mobile'],
					iosPlatforms = ['iPhone', 'iPad', 'iPod'],
					os = null;

				if (macosPlatforms.indexOf(platform) !== -1) {
					os = 'Mac OS';
					return DeviceOS.Mac;
				} else if (iosPlatforms.indexOf(platform) !== -1) {
					os = 'iOS';
					return DeviceOS.iOS;
				} else if (windowsPhonePlatforms.indexOf(platform) !== -1) {
					os = 'Windows phone';
					return DeviceOS.WindowsPhone;
				} else if (windowsPlatforms.indexOf(platform) !== -1) {
					os = 'Windows';
					return DeviceOS.Windows;
				} else if (/Android/.test(userAgent)) {
					os = 'Android';
					return DeviceOS.Android;
				} else if (!os && /Linux/.test(platform)) {
					os = 'Linux';
					return DeviceOS.Linux;
				}
			}

			return DeviceOS.Unknown;
		}
	};

	static Browser = class {
		static get type(): BrowserType {
			var userAgent =
				//@ts-ignore
				navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase() || window.opera;

			switch (true) {
				case userAgent.indexOf('edge') > -1:
					return BrowserType.Edge;
				//@ts-ignore
				case userAgent.indexOf('opr') > -1 && !!window.opr:
					return BrowserType.Opera;
				//@ts-ignore
				case userAgent.indexOf('chrome') > -1 && !!window.chrome:
					return BrowserType.Chrome;
				case userAgent.indexOf('trident') > -1:
					return BrowserType.IE;
				case userAgent.indexOf('firefox') > -1:
					return BrowserType.Firefox;
				case userAgent.indexOf('safari') > -1:
					return BrowserType.Safari;
				default:
					return BrowserType.Unknown;
			}
		}
	};
	static Dimension = class {
		static get width(): number {
			return Math.round(Dimensions.get('window').width);
		}

		static get height(): number {
			return Math.round(Dimensions.get('window').height);
		}

		static get pixelDensity(): number {
			return PixelRatio.get();
		}

		static get adjustedWidth(): number {
			return this.width * this.pixelDensity;
		}

		static get adjustedHeight(): number {
			return this.height * this.pixelDensity;
		}

		static get isLandscape(): boolean {
			return this.width > this.height;
		}

		static get isPortrait(): boolean {
			return this.height > this.width;
		}

		static get size(): ScreenSize {
			if (this.width >= 1281) {
				return ScreenSize.Large;
			} else if (this.width >= 768) {
				return ScreenSize.Medium;
			} else {
				return ScreenSize.Small;
			}
		}
	};
}
