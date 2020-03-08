import color from 'color';

//https://github.com/qix-/color

export default {
	black: '#000000',
	gray: '#808080',
	silver: '#C0C0C0',
	white_smoke: '#F1F1F1',
	white: '#FFFFFF',
	fuchsia: '#FF00FF',
	purple: '#800080',
	maroon: '#800000',
	red: '#FF0000',
	orange: '#FF8000',
	yellow: '#FFFF00',
	olive: '#808000',
	green: '#008000',
	lime: '#00FF00',
	aqua: '#00FFFF',
	teal: '#008080',
	blue: '#0000FF',
	navy: '#000080',
	transparent: 'transparent',

	// add custom colors here ...
	info: '#62B1F6',
	warning: '#f0ad4e',
	danger: '#d9534f',
	success: '#5cb85c',
	border: '#d9d5dc',
	brand: '#1E88E5',

	appleNightBackgroundColor: '#0d0d0d',
	appleNightSurfaceColor: '#161616',
	appleNightLightColor: '#fefefe',
	appleNightLowLightColor: '#6b6b6b',
	appleNightDarkColor: '#000',
	appleNightBorderColor: '#2b2b2b',

	materialNightBackgroundColor: '#121212',
	materialNightSurfaceColor: '#1d1d1d',
	materialNightLightColor: '#e1e1e1',
	materialNightLowLightColor: '#a0a0a0',
	materialNightDarkColor: '#000',
	materialNightBorderColor: '#2b2b2b',

	brandLighten(value: number): string {
		return color(this.brand)
			.lighten(value)
			.hex();
	},

	brandDarken(value: number): string {
		return color(this.brand)
			.darken(value)
			.hex();
	},

	get text(): string {
		return '#272727';
	},

	textLighten(value: number): string {
		return color(this.text)
			.lighten(value)
			.hex();
	},

	textDarken(value: number): string {
		return color(this.text)
			.darken(value)
			.hex();
	},

	get inverseText(): string {
		return this.white;
	},

	get background(): string {
		return this.white;
	},
};
