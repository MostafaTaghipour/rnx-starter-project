import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { createBrowserHistory } from 'history';
import qs from 'query-string';
import navigationService from '@app/navigators/navigationService';

const getCorrectAction = action => {
	if (action.action) return getCorrectAction(action.action);
	return action;
};

const getPathAndParamsFromLocation = (location, basePath = '/', uriPrefix = '') => {
	const path = location.pathname.replace(uriPrefix, '').substr(basePath.length);
	const params = qs.parse(location.search);

	return { path, params };
};

const matchPathAndParams = (current, next) => {
	if (current.path !== next.path) return false;
	if (qs.stringify(current.params) !== qs.stringify(next.params)) return false;

	return true;
};

const paramsToString = params => {
	return qs.stringify(params);
};

export default function withBrowserHistory(Navigator) {
	const Wrapper = class extends Component {
		disable = false;

		static propTypes = {
			navigatorRef: PropTypes.func,
			basePath: PropTypes.string,
			uriPrefix: PropTypes.string,
		};

		static defaultProps = {
			navigatorRef: null,
			basePath: '/',
			uriPrefix: '',
		};

		constructor(props) {
			super(props);

			if (this.disable) return;

			this.history = createBrowserHistory();
			this.pathAndParams = getPathAndParamsFromLocation(
				this.history.location,
				this.props.basePath,
				this.props.uriPrefix
			);

			const action =
				Navigator.router.getActionForPathAndParams(
					this.pathAndParams.path,
					this.pathAndParams.params
				) || NavigationActions.init();

			const ac = getCorrectAction(action);
			navigationService.getTopLevelNavigator().then(nav => {
				nav.dispatch(ac);
			});
		}

		componentDidMount() {
			if (this.disable) return;
			this.unlistener = this.history.listen((location, act) => {
				const pathAndParams = getPathAndParamsFromLocation(
					location,
					this.props.basePath,
					this.props.uriPrefix
				);

				if (matchPathAndParams(this.pathAndParams, pathAndParams)) return;

				this.pathAndParams = pathAndParams;

				const action = Navigator.router.getActionForPathAndParams(
					pathAndParams.path,
					pathAndParams.params
				);

				const ac = getCorrectAction(action);

				navigationService.getTopLevelNavigator().then(nav => {
					nav.dispatch(ac);
				});
			});
		}

		componentWillUnmount() {
			if (this.disable) return;
			this.unlistener();
		}

		handleNavigationStateChange = (prevState, nextState, action) => {
			this.props.onNavigationStateChange &&
				this.props.onNavigationStateChange(prevState, nextState, action);

			if (this.disable) return;

			const { basePath } = this.props;
			const pathAndParams = Navigator.router.getPathAndParamsForState(nextState);

			if (matchPathAndParams(this.pathAndParams, pathAndParams)) return;
			this.pathAndParams = pathAndParams;

			if (action.ignoreHistory) return;

			const prevRouteStack = navigationService.getActiveRouteStack(prevState);
			const nextRouteStack = navigationService.getActiveRouteStack(nextState);

			const diffRoute = nextRouteStack.length - prevRouteStack.length;

			if (diffRoute >= 0 && action.type === 'Navigation/NAVIGATE') {
				this.history.push({
					pathname: `${basePath}${pathAndParams.path}`,
					search: paramsToString(pathAndParams.params),
				});
			} else if (action.type === 'Navigation/BACK') {
				this.history.goBack();
			}
		};

		render() {
			const { navigatorRef, onNavigationStateChange, ...restProps } = this.props;

			return (
				<Navigator
					ref={ref => {
						navigatorRef && navigatorRef(ref);
					}}
					onNavigationStateChange={this.handleNavigationStateChange}
					{...restProps}
				/>
			);
		}
	};
	Wrapper.router = Navigator.router;
	return Wrapper;
}
