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
	'Remote debugger is in a background',
	'Require cycle',
]);

export default () => (
	<Provider store={store}>
		<PersistGate loading={<SplashComponent />} persistor={persistor}>
			<RootScreen />
		</PersistGate>
	</Provider>
);
