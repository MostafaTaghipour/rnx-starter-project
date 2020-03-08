import {
	Body,
	Container,
	Content,
	Header,
	Left,
	Right,
	Title,
	ListItem,
	Button,
	Icon,
	Switch,
	Text,
} from 'native-base';
import React from 'react';
import { Props, State } from '.';
import MenuButton from '@app/components/MenuButton';
import Locale from '@app/configs/locales';
import DatePickerField from '@app/components/picker/DatePicker';
import Constant from '@app/configs/const';
// import PickerField from '@app/components/picker/Picker';
import R from '@app/res/R';
import { restartApp } from '@app/helpers/appHelpers';
import PickerField from '@app/components/picker/Picker';
import routeNames from '@app/navigators/routeNames';
import { prettyDateFormat } from '@app/helpers/dateHelper';
import { View } from 'react-native';

export default class SettingComponent extends React.Component<Props, State> {
	public constructor(props: Props) {
		super(props);

		this.state = {
			locales: [R.strings('settings.persian'), R.strings('settings.english')],
		};
	}

	public render() {
		return (
			<Container>
				<Header>
					<Left>
						<MenuButton navigation={this.props.navigation} />
					</Left>
					<Body>
						<Title>{R.strings('settings.title')}</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<ListItem itemDivider style={{ height: 40 }} />
					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: R.colors.navy }}>
								<Icon active name={R.ionIcons('moon')} />
							</Button>
						</Left>
						<Body>
							<Text style={[R.styles.align_self_start, { marginStart: 10 }]}>
								{R.strings('settings.night_mode')}
							</Text>
						</Body>
						<Right>
							<Switch
								value={this.props.nightMode}
								onValueChange={checked => {
									if (checked != this.props.nightMode) {
										this.props.setNightMode(checked);
										setTimeout(() => {
											restartApp();
										}, 1000);
									}
								}}
							/>
						</Right>
					</ListItem>
					<ListItem icon last>
						<Left>
							<Button style={{ backgroundColor: R.colors.brand }}>
								<Icon active name={R.ionIcons('globe')} />
							</Button>
						</Left>
						<Body>
							<PickerField
								containerStyle={{ marginEnd: 10, marginStart: 5 }}
								placeholder={R.strings('settings.select_locale')}
								pickerType="bottomSheet"
								iconName="ios-arrow-down"
								data={this.state.locales}
								routeName={routeNames.LANGUAGE_PICKER}
								selectedItem={
									this.props.locale == Constant.LOCALE_FA
										? R.strings('settings.persian')
										: R.strings('settings.english')
								}
								onSelect={(index: number, value: string) => {
									const newLocale =
										value == R.strings('settings.persian')
											? Constant.LOCALE_FA
											: Constant.LOCALE_EN;
									const currentLocale = this.props.locale;
									if (newLocale != currentLocale) {
										setTimeout(() => {
											this.props.setLocale(newLocale);
											setTimeout(() => {
												Locale.current = newLocale;
												restartApp();
											}, 1000);
										}, 300);
									}
								}}
							/>
						</Body>
					</ListItem>
					<ListItem itemDivider style={{ height: 40 }} />
					<ListItem icon last>
						<Left>
							<Button style={{ backgroundColor: R.colors.orange }}>
								<Icon active name={R.ionIcons('calendar')} />
							</Button>
						</Left>
						<Body>
							<DatePickerField
								containerStyle={{ marginEnd: 10, marginStart: 5 }}
								locale={Locale.current == Constant.LOCALE_FA ? 'fa' : 'en'}
								placeholder={R.strings('settings.select_date')}
								pickerType="dialog"
								routeName={routeNames.DATE_PICKER}
								okButtonTitle={R.strings('ok')}
								cancelButtonTitle={R.strings('cancel')}
								todayButtonTitle={R.strings('today')}
								format={prettyDateFormat()}
								iconName="ios-arrow-down"
								selected={this.state.datePickerSelected}
								// min={{
								// 	year: 1398,
								// 	month: 2,
								// 	day: 10,
								// }}
								// max={{
								// 	year: 1398,
								// 	month: 4,
								// 	day: 10,
								// }}
								onSelect={value => {
									this.setState(prev => ({ ...prev, datePickerSelected: value }));
								}}
							/>
						</Body>
					</ListItem>
				</Content>
			</Container>
		);
	}
}
