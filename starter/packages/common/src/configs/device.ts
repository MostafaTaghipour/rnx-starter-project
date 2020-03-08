/* eslint-disable @typescript-eslint/no-var-requires */
import { Platform, Dimensions, PixelRatio } from 'react-native';
import DeviceDetector, { DeviceDetectorResult } from 'device-detector-js';
import { DeviceUUID } from 'device-uuid';

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
	private userAgent = '';
	private deviceType = '';
	private deviceBrand = '';
	private deviceModel = '';
	private osVersion = '';
	private uniqueId = '';

	private static instance: CurrentDevice;
	private constructor() {}
	public init() {
		if (CurrentDevice.Platform.isNative) {
			const DeviceInfo = require('react-native-device-info');
			DeviceInfo.getUserAgent().then((userAgent: string) => {
				this.setInfo(userAgent);
			});
			this.uniqueId = DeviceInfo.getUniqueId();
		} else if (CurrentDevice.Platform.isWeb) {
			this.setInfo(window.navigator.userAgent);
			this.uniqueId = new DeviceUUID(window.navigator.userAgent).get();
		}
	}

	private setInfo(userAgent: string) {
		this.userAgent = userAgent;
		const deviceDetector = new DeviceDetector();
		const res: DeviceDetectorResult = deviceDetector.parse(userAgent);

		if (res.device) {
			this.deviceBrand = res.device.brand;
			this.deviceModel = res.device.model;
			this.deviceType = res.device.type;
		}
		if (res.os) {
			this.osVersion = res.os.version;
		}
	}

	public static getInstance() {
		if (!CurrentDevice.instance) {
			CurrentDevice.instance = new CurrentDevice();
		}
		return CurrentDevice.instance;
	}
	public static Info = class {
		public static get isIphoneX(): boolean {
			return (
				CurrentDevice.OS.type === DeviceOS.iOS &&
				CurrentDevice.Dimension.deviceRatio.toFixed(3) == '0.462'
			);
		}
		public static get userAgent(): string {
			return CurrentDevice.getInstance().userAgent;
		}
		public static get type(): string {
			return CurrentDevice.getInstance().deviceType;
		}
		public static get brand(): string {
			return CurrentDevice.getInstance().deviceBrand;
		}
		public static get model(): string {
			return CurrentDevice.getInstance().deviceModel;
		}
		public static get uniqueId(): string {
			return CurrentDevice.getInstance().uniqueId;
		}
	};
	public static Platform = class {
		public static get type(): DevicePlatform {
			return this.isWeb
				? DevicePlatform.Web
				: this.isIos
				? DevicePlatform.iOS
				: DevicePlatform.Android;
		}

		public static get isWeb(): boolean {
			return Platform.OS === 'web';
		}
		public static get isPWA(): boolean {
			return (
				this.isWeb &&
				//@ts-ignore
				(window.navigator.standalone == true ||
					window.matchMedia('(display-mode: standalone)').matches)
			);
		}
		public static get isNative(): boolean {
			return !this.isWeb;
		}
		public static get isIos(): boolean {
			return Platform.OS === 'ios';
		}
		public static get isAndroid(): boolean {
			return Platform.OS === 'android';
		}
	};

	public static OS = class {
		public static get type(): DeviceOS {
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

		public static get version(): string {
			return CurrentDevice.getInstance().osVersion;
		}
	};

	public static Browser = class {
		public static get type(): BrowserType {
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
	public static Dimension = class {
		public static get windowWidth(): number {
			return Math.round(Dimensions.get('window').width);
		}

		public static get windowHeight(): number {
			return Math.round(Dimensions.get('window').height);
		}

		public static get deviceWidth(): number {
			return CurrentDevice.Platform.isWeb
				? window.screen.width
				: Math.round(Dimensions.get('window').width);
		}

		public static get deviceHeight(): number {
			return CurrentDevice.Platform.isWeb
				? window.screen.height
				: Math.round(Dimensions.get('window').height);
		}

		public static get pixelDensity(): number {
			return PixelRatio.get();
		}

		public static get windowAdjustedWidth(): number {
			return this.windowWidth * this.pixelDensity;
		}

		public static get windowAdjustedHeight(): number {
			return this.windowHeight * this.pixelDensity;
		}

		public static get windowRatio(): number {
			return this.windowWidth / this.windowHeight;
		}

		public static get deviceAdjustedWidth(): number {
			return this.deviceWidth * this.pixelDensity;
		}

		public static get deviceAdjustedHeight(): number {
			return this.deviceHeight * this.pixelDensity;
		}

		public static get deviceRatio(): number {
			return this.deviceWidth / this.deviceHeight;
		}

		public static get isLandscape(): boolean {
			return this.windowWidth > this.windowHeight;
		}

		public static get isPortrait(): boolean {
			return this.windowHeight > this.windowWidth;
		}

		public static get size(): ScreenSize {
			if (this.windowWidth >= 1281) {
				return ScreenSize.Large;
			} else if (this.windowWidth >= 768) {
				return ScreenSize.Medium;
			} else {
				return ScreenSize.Small;
			}
		}
	};
}
