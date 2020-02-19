const { override, babelInclude, addWebpackAlias } = require('customize-cra');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

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
	const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

	config.plugins.push(
		new webpack.DefinePlugin({
			__DEV__: isDev,
		})
	);

	const env =
		process.argv[2] && process.argv[2].startsWith('--')
			? process.argv[2].split('--')[1]
			: 'production';

	config.plugins.push(
		new webpack.DefinePlugin({
			buildEnvironment: JSON.stringify(env),
		})
	);

	config.entry.push(resolveModule(resolveApp, 'custom-font-loader'));
	return config;
};

const swConfig = config => {
	
	config.plugins = config.plugins.map(plugin => {
	
		
		if (plugin.constructor.name === 'GenerateSW') {

			return new WorkboxWebpackPlugin.InjectManifest({
				swSrc: './src/custom-service-worker.js',
				swDest: 'service-worker.js',
			});
		}
		return plugin;
	});
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
	extraConfigs,
	swConfig
);
