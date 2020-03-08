export default abstract class Constant {
	public static readonly LOCALE_FA: string = 'fa';
	public static readonly LOCALE_EN: string = 'en';
	public static readonly LOCALE_HE: string = 'he';
	public static readonly LOCALE_AR: string = 'ar';
	public static readonly DEFAULT_LOCALE: string = Constant.LOCALE_FA;
	public static readonly DEFAULT_NIGHT_MODE: boolean = false;
	public static readonly DEFAULT_ICON_FAMILY: string = 'Ionicons';
	public static readonly NAVIGATION_PERSIST_KEY: string = 'navigationPersistenceKey';
	public static readonly EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	public static readonly DATE_ISO_FORMAT: string = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
	public static readonly TOUCHABLE_OPACITY_ACTIVE_LEVEL: number = 0.6;
	public static readonly PAGINATION_FIRST_PAGE_NUMBER: number = 1;
	public static readonly PAGINATION_PAGE_SIZE: number = 10;
	public static readonly PAGINATION_DEFAULT_TOTAL: number = 100;
}
