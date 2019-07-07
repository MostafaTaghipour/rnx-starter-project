import { setNightMode } from './../../store/app/actions';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { ThunkDispatch } from 'redux-thunk';
import SettingComponent from './component';
import { CalendarDate } from '@app/components/calendar/types';
import { AllStates } from '@app/store';
import { setLocaleAsync } from '@app/store/app/actions';

interface OwnProps {
	navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
	setLocale: (newLocale: string) => any;
	setNightMode: (nightMode: boolean) => any;
}

interface StateProps {
	locale: string;
	nightMode: boolean;
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {
	locales: string[];
	datePickerSelected?: CalendarDate;
}

const mapState = (state: AllStates): StateProps => {
	return {
		locale: state.app.locale,
		nightMode: state.app.nightMode,
	};
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
	setLocale: (newLocale: string) => dispatch(setLocaleAsync(newLocale)),
	setNightMode: (nightMode: boolean) => dispatch(setNightMode(nightMode)),
});

const SettingScreen = connect(
	mapState,
	mapDispatch
)(SettingComponent);

export default SettingScreen;
