import { AppRegistry } from 'react-native-web';
import App from '@proj/common/src/app';
import './index.css';
import * as serviceWorker from './serviceWorker';

// register the app
AppRegistry.registerComponent('starter', () => App);

AppRegistry.runApplication('starter', {
	rootTag: document.getElementById('root'),
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
