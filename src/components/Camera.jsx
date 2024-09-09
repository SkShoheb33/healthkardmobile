import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View, Platform, Alert } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { styles } from 'src/styles/style';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

function Camera({ getImage, width = 'w-10/12' }) {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      );
      if (result !== RESULTS.GRANTED) {
        Alert.alert(
          "Permission Required",
          "Camera permission is required to take pictures.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
    }
  };

  async function convertImageToBase64(image) {
    try {
      const base64String = await RNFS.readFile(image.path, 'base64');
      return `data:${image.mime};base64,${base64String}`;
    } catch (error) {
      return null;
    }
  }

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(processImage);
  }

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(processImage);
  }

  const processImage = (image) => {
    convertImageToBase64(image).then((base64Image) => {
      getImage(base64Image);
    });
  }

  const handleOpenCamera = () => {
    requestCameraPermission().then(() => {
      openCamera();
    });
  };

  return (
    <View className={ `${width} flex-row items-center justify-center` }>
      <TouchableOpacity onPress={ openGallery } style={ styles.button }>
        <Text style={ styles.blueText }>Upload Picture</Text>
      </TouchableOpacity>
      <Text className='mx-2'>|</Text>
      <TouchableOpacity onPress={ handleOpenCamera } style={ styles.button }>
        <Text style={ styles.blueText }>Take Picture</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Camera