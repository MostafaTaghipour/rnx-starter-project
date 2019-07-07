const { override, babelInclude, addWebpackAlias } = require('customize-cra');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
	'web.mjs',
	'mjs',
	'web.js',
	'js',
	'web.ts',
	'ts',
	'web.tsx',
	'tsx',
	'json',
	'web.jsx',
	'jsx',
];

const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find(extension =>
		fs.existsSync(resolveFn(`${filePath}.${extension}`))
	);

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

const extraConfigs = config => {
	config.plugins.push(
		new webpack.DefinePlugin({
			__DEV__: true,
		})
	);
	config.entry.push(resolveModule(resolveApp, 'custom-font-loader'));
	return config;
};

module.exports = override(
	babelInclude([
		// tell Babel to include common files
		path.resolve('src'),
		path.resolve('../common/src'),
		path.resolve('../../node_modules/native-base'),
		path.resolve('../../node_modules/native-base-shoutem-theme'),
		path.resolve('../../node_modules/react-native-tab-view'),
		path.resolve('../../node_modules/react-native-paper'),
		path.resolve('../../node_modules/react-native-vector-icons'),
		path.resolve('../../node_modules/react-native-safe-area-view'),
		path.resolve('../../node_modules/react-native-easy-grid'),
		path.resolve('../../node_modules/react-native-drawer'),
		path.resolve('../../node_modules/react-native-keyboard-aware-scroll-view'),
		path.resolve('../../node_modules/react-native-web'),
		path.resolve('../../node_modules/static-container'),
		path.resolve('../../node_modules/react-navigation-browser-history-helpers'),
		path.resolve('../../node_modules/react-navigation-deprecated-tab-navigator'),
		path.resolve('../../node_modules/react-navigation-drawer'),
		path.resolve('../../node_modules/react-navigation-stack'),
		path.resolve('../../node_modules/react-navigation-tabs'),
		path.resolve('../../node_modules/react-navigation'),
		path.resolve('../../node_modules/react-native-screens'),
	]),
	addWebpackAlias({
		['@app']: path.resolve('../common/src'),
	}),
	extraConfigs
);
