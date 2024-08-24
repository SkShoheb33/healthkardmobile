import { PermissionsAndroid, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

async function requestStoragePermission() {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    title: 'Storage Permission',
                    message: 'App needs access to your storage to upload files.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else {
        return true;
    }
}

export const pickFile = async() => {
    const permissionGranted = await requestStoragePermission();
    if (!permissionGranted) {
        console.error('Permission not granted');
        return;
    }

    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });

        const filePath = await resolveFilePath(res[0].uri);
        upload(filePath, res[0].name);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
        } else {
            console.error('DocumentPicker Error: ', err);
        }
    }
};

const resolveFilePath = async(uri) => {
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
        try {
            // Read the file content as base64
            const fileData = await RNFS.readFile(uri, 'base64');
            // Temporarily save to a local file
            const tempFilePath = `${RNFS.CachesDirectoryPath}/${Date.now()}.tmp`;
            await RNFS.writeFile(tempFilePath, fileData, 'base64');
            return tempFilePath;
        } catch (err) {
            console.error('Error resolving file path:', err);
            return null;
        }
    }
    return uri;
};
const upload = async(filePath, fileName) => {
    if (filePath) {
        try {
            const fileExists = await RNFS.exists(filePath);
            if (!fileExists) {
                console.error('File does not exist at path:', filePath);
                return;
            }

            const fileRef = storage().ref(fileName);

            await fileRef.putFile(filePath);
            const fileURL = await fileRef.getDownloadURL();
            return fileURL;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    } else {
        console.error('Invalid file path');
    }
};