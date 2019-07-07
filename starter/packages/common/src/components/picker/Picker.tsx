import * as React from 'react';
import { Input, View, Button, Icon, Text , connectStyle } from 'native-base';
import {
	StyleProp,
	ViewStyle,
	TouchableOpacity,
	TouchableWithoutFeedback,
	FlatList,
} from 'react-native';
import { NavigationScreenProp, SafeAreaView, NavigationScreenProps } from 'react-navigation';
import { FieldProps, IconProps, PickerType } from './types';
import styles, {
	modalContainerStyle,
	pickerTopSectionStyle,
	pickerCloseButtonStyle,
	pickerSearchFieldPlaceHolderTextColor,
	modalWrapperStyle,
	pickerModalSafeAreaInsets,
	fieldStyle,
	pickerSearchField,
} from './styles';
import R from '@app/res/R';


//----------------------------------------- Field ------------------------------------

interface ContainerProps {
	containerStyle?: StyleProp<ViewStyle>;
	navigation: NavigationScreenProp<any, any>;
	data: ReadonlyArray<string>;
	selectedItem?: string;
	onSelect: (index: number, value: string) => void;
	pickerType?: 'modal' | 'dialog' | 'bottomSheet';
	gesturesEnabled?: boolean;
}

type Props = FieldProps & ContainerProps & IconProps;

interface State {
	selectedValue?: any;
}

 class PickerField extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			selectedValue: props.selectedItem,
		};
	}

	openPicker() {
		const d = this.props.data;
		const i = this.props.selectedItem;
		const t = this.props.pickerType;
		const gesturesEnabled = this.props.gesturesEnabled;

		this.props.navigation.navigate('pickerModal', {
			returnData: this.returnData.bind(this),
			data: d,
			selectedItem: i,
			pickerType: t,
			gesturesEnabled
		});
	}

	returnData(index: number, value: string) {
		this.setState({ selectedValue: value });
		this.props.onSelect(index, value);
	}

	public render() {
		const themeStyles = this.props.style;
		return (
			<View style={[styles.fieldContainer, this.props.containerStyle , themeStyles.container]}>
				<TouchableOpacity style={R.styles.flex_1} onPress={() => this.openPicker()}>
					<View style={[R.styles.row, R.styles.flex_1]} pointerEvents="none">
						<View style={R.styles.flex_1} pointerEvents="none">
							<Input
								multiline={false}
								editable={false}
								value={this.state.selectedValue ? this.state.selectedValue!.toString() : ''}
								style={[fieldStyle(), this.props.fieldStyle]}
								placeholder={this.props.placeholder}
								placeholderTextColor={this.props.placeholderTextColor}
							/>
						</View>
						{this.props.iconName ? (
							<Icon style={styles.fieldIcon} name={this.props.iconName!} />
						) : null}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const defaultStyles = {
	container: {
	  flex: 1,
	  backgroundColor: 'black',
	},
	textContent: {
	  fontSize: 20,
	  color: 'white',
	},
  };
  
  
  export default connectStyle('My.CustomPicker', defaultStyles)(PickerField);

//----------------------------------------- MODAL ------------------------------------

interface ModalProps {
	navigation: NavigationScreenProp<any, any>;
}

interface ModalState {
	data: ReadonlyArray<string>;
	selectedItem?: string;
}

export class PickerModalScreen extends React.Component<ModalProps, ModalState> {
	originalData: string[] = [];

	static navigationOptions = ({ navigation }: NavigationScreenProps) => {
	
		//@ts-ignore
		const { gesturesEnabled = true , pickerType = PickerType.modal } = navigation.state.params;
		
		return {
			gesturesEnabled: gesturesEnabled,
			gestureDirection: 'default',
			gestureResponseDistance: {
				vertical: pickerType == PickerType.modal ? 64 : pickerType == PickerType.dialog ? 120 : 200,
			},
		};
	};

	constructor(props: ModalProps) {
		super(props);
		this.state = {
			data: [],
			selectedItem: undefined,
		};
	}
	componentDidMount() {
		const d = this.props.navigation.state.params.data
			? this.props.navigation.state.params.data
			: [];
		const i = this.props.navigation.state.params.selectedItem;

		this.originalData = d;

		this.setState({
			data: d,
			selectedItem: i,
		});
	}

	setSelectedValue(value: string) {
		const index = this.originalData.indexOf(value);
		this.props.navigation.state.params.returnData(index, value);
		this.finish();
	}

	searchFilterFunction(text: string) {
		const newData = this.originalData.filter(item => {
			const itemData = item.toUpperCase();
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});

		this.setState(prevState => ({ ...prevState, data: newData }));
	}

	finish() {
		this.props.navigation.goBack();
	}

	renderItem(item: string) {
		const selected = this.state.selectedItem === item;

		return (
			<TouchableOpacity onPress={() => this.setSelectedValue(item)}>
				<View
					style={[
						styles.pickerListItem,
						{
							backgroundColor: selected ? R.colors.brandLighten(0.8) : R.colors.transparent,
						},
					]}
				>
					<Text style={styles.pickerListItemText}>{item}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		const { pickerType = PickerType.modal } = this.props.navigation.state.params;

		return (
			<TouchableWithoutFeedback onPress={() => this.finish()}>
				<View style={modalWrapperStyle(pickerType)}>
					<TouchableWithoutFeedback onPress={() => null}>
						<View style={modalContainerStyle(pickerType)}>
							<SafeAreaView
								forceInset={pickerModalSafeAreaInsets(pickerType)}
								style={R.styles.flex_1}
							>
								<View style={pickerTopSectionStyle(pickerType)}>
									<Button
										style={R.styles.align_self_center}
										transparent
										onPress={() => this.finish()}
									>
										<Icon style={pickerCloseButtonStyle(pickerType)} name={R.icons('close')} />
									</Button>
									<View style={R.styles.flex_1}>
										<Input
											editable={true}
											style={pickerSearchField(pickerType)}
											placeholder={R.strings('search_placeholder')}
											placeholderTextColor={pickerSearchFieldPlaceHolderTextColor(pickerType)}
											onChangeText={text => this.searchFilterFunction(text)}
										/>
									</View>
								</View>
								<View style={styles.modalContentSection}>
									<FlatList
										style={R.styles.flex_1}
										keyExtractor={item => item}
										data={this.state.data}
										renderItem={({ item, index }) => this.renderItem(item)}
									/>
								</View>
							</SafeAreaView>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
