import { NetInfo, ConnectionInfo, ConnectionType } from 'react-native';
import { store } from '@app/store';
import { setConnectivityStatusAction } from '@app/store/app/actions';
import configs from '..';

export class Reachability {
	private static instance: Reachability;
	private constructor() {}
	public static getInstance() {
		if (!Reachability.instance) {
			Reachability.instance = new Reachability();
		}
		return Reachability.instance;
	}

	public registerForConnectionChange() {
		NetInfo.getConnectionInfo().then(this.handleConnectionChange);
		NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
		NetInfo.isConnected.fetch().then(this.handleConnectivityChange);
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
	}

	public unregisterForConnectionChange() {
		NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
		NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
	}

	private handleConnectionChange(connectionInfo: ConnectionInfo | ConnectionType) {
		if (configs.isDebugMode) console.log(connectionInfo);
	}

	private handleConnectivityChange(isConnected: boolean) {
		if (configs.isDebugMode) console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
		store.dispatch(setConnectivityStatusAction(isConnected));
	}
}
