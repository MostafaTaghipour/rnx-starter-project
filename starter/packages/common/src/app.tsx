import React from 'react';
import RootScreen from './screens/root';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import SplashComponent from './screens/splash/component';


YellowBox.ignoreWarnings([
	'useNativeDriver',
	'Functions are not valid as a React child',
	"Can't perform a React state",
]);

export default () => (
	<Provider store={store}>
		<PersistGate loading={() => <SplashComponent />} persistor={persistor}>
			<RootScreen />
		</PersistGate>
	</Provider>
);


/* 
	Change App Display Name:
		- packages/mobile/ios/{proj_folder}/info.plist => CFBundleDisplayName
		- packages/mobile/android/app/src/main/res/values/strings.xml => app_name
		- packages/web/public/index.html => <title> tag
		- packages/web/public/manifest.json => short_name and name
		- packages/desktop/package.json => productName

	Change App Icon:
		- packages/common/src/res/images/app_icon
		- packages/mobile/ios/{proj_folder}/Images.xcassets
		- packages/mobile/android/app/src/main/res/mipmap/ic_launcher
		- packages/web/public/img/icons
		- packages/desktop/assets/icons
	
	Change Splash:
		- packages/common/src/screens/splash
		- packages/mobile/ios/{proj_folder}/Base.lproj/LaunchScreen.xib
		- packages/mobile/android/app/src/main/res/drawable/background_splash.xml
*/
