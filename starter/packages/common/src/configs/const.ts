export default abstract class Constant {
	static readonly LOCALE_FA: string = 'fa';
	static readonly LOCALE_EN: string = 'en';
	static readonly LOCALE_HE: string = 'he';
	static readonly LOCALE_AR: string = 'ar';
	static readonly DEFAULT_LOCALE: string = Constant.LOCALE_FA;
	static readonly DEFAULT_NIGHT_MODE: boolean = false;
	static readonly DEFAULT_ICON_FAMILY: string = 'Ionicons';
	static readonly NAVIGATION_PERSIST_KEY: string = 'navigationPersistenceKey';
	static readonly EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	static readonly DATE_ISO_FORMAT: string = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
	static readonly TOUCHABLE_OPACITY_ACTIVE_LEVEL: number = 0.6;
	static readonly PAGINATION_FIRST_PAGE_NUMBER: number = 1;
	static readonly PAGINATION_PAGE_SIZE: number = 10;
	static readonly PAGINATION_DEFAULT_TOTAL: number = 100;
}
