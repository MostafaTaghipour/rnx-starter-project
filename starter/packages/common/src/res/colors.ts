import color from 'color';

//https://github.com/qix-/color

export default {
	black: '#000000',
	gray: '#808080',
	silver: '#C0C0C0',
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
	
	// add custom font here ...
	info: '#62B1F6',
	warning: '#f0ad4e',
	danger: '#d9534f',
	success: '#5cb85c',
	border: '#d9d5dc',
	brand: '#1E88E5',
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
		return this.black;
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
