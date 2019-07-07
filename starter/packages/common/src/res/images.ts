import CurrentDevice from '@app/configs/device';
const images = {
	get app_icon() {
		return CurrentDevice.Platform.isAndroid
			? { uri: '_common_src_res_images_app_icon' }
			: require('@app/res/images/app_icon.png');
	},
};

export default images;
