import { Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

async function requestStoragePermission() {
    if (Platform.OS === 'android') {
        try {
            const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            return result === RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else {
        return true;
    }
}

export const pickFile = async () => {
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
        return upload(filePath, res[0].name);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
        } else {
            console.error('DocumentPicker Error: ', err);
        }
    }
};

const resolveFilePath = async (uri) => {
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
const upload = async (filePath, fileName) => {
    if (filePath) {
        try {
            const fileExists = await RNFS.exists(filePath);
            if (!fileExists) {
                console.error('File does not exist at path:', filePath);
                return;
            }

            const fileRef = storage().ref(`hospitals/${fileName}$${Date.now()}$${fileName.split('.').pop()}`);

            await fileRef.putFile(filePath);
            console.log(fileName);
            const fileURL = await fileRef.getDownloadURL();
            return fileURL;
            // return { fileURL, fileName };
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    } else {
        console.error('Invalid file path');
    }
};

export const getFileNameFromURL = (url) => {
    const parts = url.split('/');
    const fileNameWithParams = parts[parts.length - 1];
    const fileName = fileNameWithParams.split('?')[0];
    const decodedFileName = decodeURIComponent(fileName);
    const [, originalName, time, extension] = decodedFileName.split('$');
    return `${originalName}.${extension}`;
};

export const deleteFile = async (fileURL) => {
    if (!fileURL || (!fileURL.startsWith('gs://') && !fileURL.startsWith('https://'))) {
        console.error('Invalid file URL:', fileURL);
        return;
    }

    try {
        const fileRef = storage().refFromURL(fileURL);
        console.log({ fileRef });
        // Check if the file exists
        const fileExists = await fileRef.getDownloadURL().then(() => true).catch(() => false);
        if (!fileExists) {
            console.error('File does not exist at the specified URL:', fileURL);
            return;
        }

        await fileRef.delete();
        console.log('File deleted successfully');
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};