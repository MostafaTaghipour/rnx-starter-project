import Entypo from 'react-native-vector-icons/Fonts/Entypo.ttf';
import Foundation from 'react-native-vector-icons/Fonts/Foundation.ttf';
import EvilIcons from 'react-native-vector-icons/Fonts/EvilIcons.ttf';
import FontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import Ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import MaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import MaterialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import Octicons from 'react-native-vector-icons/Fonts/Octicons.ttf';
import SimpleLineIcons from 'react-native-vector-icons/Fonts/SimpleLineIcons.ttf';
import Zocial from 'react-native-vector-icons/Fonts/Zocial.ttf';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import VazirReqular from '@proj/common/src/res/fonts/vazir/Vazir-FD.ttf';
import VazirMedium from '@proj/common/src/res/fonts/vazir/Vazir-Medium-FD.ttf';
import VazirBold from '@proj/common/src/res/fonts/vazir/Vazir-Bold-FD.ttf';
import VazirThin from '@proj/common/src/res/fonts/vazir/Vazir-Thin-FD.ttf';
import VazirLight from '@proj/common/src/res/fonts/vazir/Vazir-Light-FD.ttf';

const fontList = {
	Entypo,
	EvilIcons,
	FontAwesome,
	fontcustom: Foundation,
	Ionicons,
	'Material Design Icons': MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
	'simple-line-icons': SimpleLineIcons,
	Zocial,
	Roboto,
	Roboto_medium: RobotoMedium,
	'Vazir-FD': VazirReqular,
	'Vazir-Medium-FD': VazirMedium,
	'Vazir-Bold-FD': VazirBold,
	'Vazir-Thin-FD': VazirThin,
	'Vazir-Light-FD': VazirLight,
};

Object.keys(fontList).map(font => {
	const iconFontStyles = `@font-face {
    src: url(${fontList[font]});
    font-family: ${font};
  }`;

	// Create stylesheet
	const style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = iconFontStyles;
	} else {
		style.appendChild(document.createTextNode(iconFontStyles));
	}

	// Inject stylesheet
	document.head.appendChild(style);
});
