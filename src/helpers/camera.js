import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

async function convertImageToBase64(image) {
    try {
        const base64String = await RNFS.readFile(image.path, 'base64');
        return `data:${image.mime};base64,${base64String}`;
    } catch (error) {
        return null;
    }
}
export const openCamera = async () => {
    await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    }).then(image => {
        convertImageToBase64(image).then((base64Image) => {
            return base64Image;
        });
    });
}