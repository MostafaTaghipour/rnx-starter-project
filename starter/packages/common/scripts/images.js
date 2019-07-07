const fs = require('fs');
const path = require('path');

const imageFileNames = () => {
	var res = [];
	const files = fs.readdirSync('src/res/images');
	// .filter(file => {
	// 	return file.endsWith('.png');
	// })
	// .map(file => {
	// 	console.log(file);

	// 	return file
	// 		.replace('.png', '')
	// 		.replace('@2x', '')
	// 		.replace('@3x', '');
	// });

	files.forEach((val, index, arr) => {
		const name = path
			.parse(val)
			.name.replace('@2x', '')
			.replace('@3x', '');
		const ext = path.parse(val).ext;
		const twoX = name + '@2x';
		const threeX = name + '@3x';
		const retina = arr.includes(twoX + ext)
			? twoX
			: arr.includes(threeX + ext)
			? threeX
			: undefined;
		res.push({
			name: name.toLowerCase(),
			ext: ext.toLowerCase(),
			retina: retina ? retina.toLowerCase() : undefined,
		});
	});

	return res.filter((obj, pos, arr) => {
		return arr.map(mapObj => mapObj['name']).indexOf(obj['name']) === pos;
	});
};

const generate = () => {
	let properties = imageFileNames()
		.map(item => {
			var res;
			// if (item.retina) {
			// 	res = `get ${item.name}() {
			// 		return CurrentDevice.Platform.isAndroid
			// 		? { uri: '_common_src_res_images_${item.name}' }
			// 		: CurrentDevice.Platform.isWeb
			// 		? require('@app/res/images/${item.retina}${item.ext}')
			// 		: require('@app/res/images/${item.name}${item.ext}');
			// 	}`;
			// } else {
			res = `get ${item.name}() {
					return CurrentDevice.Platform.isAndroid
					? { uri: '_common_src_res_images_${item.name}' }
					: require('@app/res/images/${item.name}${item.ext}');
				}`;
			// }

			return res;
		})
		.join(',\n  ');

	const string = `
		import CurrentDevice from '@app/configs/device';
		const images = {
	  	${properties}
		};

		export default images;
	`;

	fs.writeFileSync('src/res/images.ts', string, 'utf8');
};

generate();
