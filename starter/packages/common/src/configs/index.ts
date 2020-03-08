/* eslint-disable no-undef */
import { NativeModules } from 'react-native';
import CurrentDevice from './device';
import defaultConfig from './environments/default.env.json';
import development from './environments/development.env.json';
import staging from './environments/staging.env.json';

export type environmentType = 'development' | 'staging' | 'production';

const allEnvConfig = { development, staging, production: defaultConfig };

const { ReactNativeConfig } = NativeModules;
const environment: environmentType = CurrentDevice.Platform.isNative
	? ReactNativeConfig.buildEnvironment
	: //@ts-ignore
	  //@ts-ignore
	  buildEnvironment;
const environmentConfig = allEnvConfig[environment] || {};
// const environmentPlatformConfig = environmentConfig[CurrentDevice.Platform.type] || {};
const envConfig = Object.assign({}, defaultConfig, environmentConfig);

export default {
	environment,
	isDebugMode: __DEV__,
	isReleaseMode: !__DEV__,
	...envConfig,
};
