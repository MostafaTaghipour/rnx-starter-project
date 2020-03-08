// import { NavigationActions } from 'react-navigation';
// import { AppNavigator } from '@app/navigators/rootNavigator';

// const initialAction = { type: NavigationActions.INIT };
// const initialState = AppNavigator.router.getStateForAction(initialAction);

// const navigationReducer = (state = initialState, action: any) => {
// 	let newState = AppNavigator.router.getStateForAction(action, state);

// 	if (action.params && action.params.replace) {
// 		// In order to replace the previous route
// 		// we'll remove the item at index - 1 and then decrement the index.
// 		newState.routes.splice(newState.index - 1, 1);
// 		newState.index--;
// 	}

// 	newState.routes.forEach((route: any, i: number) => {
// 		if (!route.params) route.params = {};
// 		if (i === newState.index) route.params.active = true;
// 		else route.params.active = false;
// 	});

// 	return newState;
// };

// export default navigationReducer;
