import { Button, Container, Content, Input, Item, Label, Text, Spinner } from 'native-base';
import React from 'react';
import { Props, State } from '.';
import style from './style';
import { ActivityIndicator } from 'react-native';
import Constant from '@app/configs/const';
import { NativeToast } from '@app/helpers/messageHelper';
import R from '@app/res/R';
import { getAppThemeType, ThemeType } from '@app/configs/theme';

export default class AuthComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			form: {
				email: {
					value: '',
					touched: false,
					error: undefined,
					required: true,
				},
				password: {
					value: '',
					touched: false,
					error: undefined,
					required: true,
				},
			},
		};
	}

	handleChange = (name: string, value: any) => {
		var form = this.state.form;

		switch (name) {
			case 'email':
				form.email.error = !value
					? R.strings('error.required')
					: !Constant.EMAIL_RE.test(value)
					? R.strings('error.invalid_email')
					: undefined;
				form.email.value = value;
				break;
			case 'password':
				form.password.touched = true;
				form.password.error = !value
					? R.strings('error.required')
					: value.length < 5
					? R.strings('error.invalid_password')
					: undefined;
				form.password.value = value;
				break;
			default:
				break;
		}

		this.setState(prev => ({
			...prev,
			form: form,
		}));
	};

	handleBlur = (name: string) => {
		var form = this.state.form;

		//@ts-ignore
		form[name].touched = true;

		this.setState(prev => ({
			...prev,
			form: form,
		}));
	};

	isFormValid = () => {
		var isFormValid = true;
		Object.values(this.state.form).forEach(field => {
			isFormValid =
				isFormValid && (field.required ? field.touched : true) && field.error == undefined;
		});
		return isFormValid;
	};

	submit = () => {
		if (this.isFormValid()) {
			this.props.signIn({
				email: this.state.form.email.value,
				password: this.state.form.password.value,
			});
		} else {
			new NativeToast(R.strings('error.invalid_form')).setType('danger').show();
		}
	};

	render() {
		return (
			<Container>
				<Content padder>
					<Item
						style={{ marginTop: 40 }}
						error={this.state.form.email.touched && this.state.form.email.error != undefined}
					>
						<Label> {R.strings('auth.email')}</Label>
						<Input
							keyboardType="email-address"
							disabled={this.props.inProgress}
							onBlur={() => this.handleBlur('email')}
							onChangeText={text => this.handleChange('email', text)}
						/>
					</Item>
					<Text style={style.errorLabel}>
						{this.state.form.email.touched && this.state.form.email.error != undefined
							? this.state.form.email.error
							: ' '}
					</Text>
					<Item
						last
						style={{ marginTop: 12 }}
						error={this.state.form.password.touched && this.state.form.password.error != undefined}
					>
						<Label>{R.strings('auth.password')}</Label>
						<Input
							secureTextEntry={true}
							disabled={this.props.inProgress}
							onBlur={() => this.handleBlur('password')}
							onChangeText={text => this.handleChange('password', text)}
						/>
					</Item>
					<Text style={style.errorLabel}>
						{this.state.form.password.touched && this.state.form.password.error != undefined
							? this.state.form.password.error
							: ' '}
					</Text>
					<Button
					transparent={getAppThemeType()==ThemeType.Apple}
						onPress={this.submit}
						disabled={this.props.inProgress}
						style={{ alignSelf: 'center', marginTop: 20, paddingStart: 8, paddingEnd: 10 }}
					>
						<Text>{R.strings('auth.login')}</Text>
						{this.props.inProgress && <ActivityIndicator />}
					</Button>
				</Content>
			</Container>
		);
	}
}
