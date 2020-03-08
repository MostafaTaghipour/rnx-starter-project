module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'plugin:prettier/recommended'],
	plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
	rules: {
		indent: 'off',
		'@typescript-eslint/indent': ['warn', 'tab'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/prefer-interface': 'off',
		'@typescript-eslint/camelcase': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-non-null-assertion': 'warn',
		'@typescript-eslint/class-name-casing': 'warn',
		'@typescript-eslint/no-use-before-define': 'warn',
	},
};
