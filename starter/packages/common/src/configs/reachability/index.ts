import NetInfo, { NetInfoSubscription, NetInfoState } from '@react-native-community/netinfo';
import { store } from '@app/store';
import { setConnectivityStatusAction } from '@app/store/app/actions';
import configs from '..';

export class Reachability {
	private unsubscribe?: NetInfoSubscription;
	private static instance: Reachability;
	private constructor() {}
	public static getInstance() {
		if (!Reachability.instance) {
			Reachability.instance = new Reachability();
		}
		return Reachability.instance;
	}

	public registerForConnectionChange() {
		this.unsubscribe = NetInfo.addEventListener(state => {
			this.handleConnectionChange(state);
			this.handleConnectivityChange(state.isConnected);
		});
	}

	public unregisterForConnectionChange() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	private handleConnectionChange(info: NetInfoState) {
		if (configs.isDebugMode) console.log(info);
	}

	private handleConnectivityChange(isConnected: boolean) {
		if (configs.isDebugMode) console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
		store.dispatch(setConnectivityStatusAction(isConnected));
	}
}
