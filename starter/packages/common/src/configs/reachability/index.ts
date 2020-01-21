import NetInfo, { NetInfoSubscription, NetInfoState } from '@react-native-community/netinfo';
import { store } from '@app/store';
import { setConnectivityStatusAction } from '@app/store/app/actions';

export class Reachability {
	private unsubscribe?: NetInfoSubscription;
	private static instance: Reachability;
	private constructor() {}
	static getInstance() {
		if (!Reachability.instance) {
			Reachability.instance = new Reachability();
		}
		return Reachability.instance;
	}

	registerForConnectionChange() {
		this.unsubscribe = NetInfo.addEventListener(state => {
			this.handleConnectionChange(state);
			this.handleConnectivityChange(state.isConnected);
		});
	}

	unregisterForConnectionChange() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	private handleConnectionChange(info: NetInfoState) {
		if (__DEV__) console.log(info);
	}

	private handleConnectivityChange(isConnected: boolean) {
		if (__DEV__) console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
		store.dispatch(setConnectivityStatusAction(isConnected));
	}
}
