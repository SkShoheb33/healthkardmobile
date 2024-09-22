import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View, Platform, Alert } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { styles } from 'src/styles/style';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import storage from '@react-native-firebase/storage';

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

  const uploadImageToFirebase = async (image) => {
    const { path, filename } = image;
    const reference = storage().ref(`users/${filename || Date.now()}`);

    try {
      await reference.putFile(path);
      const url = await reference.getDownloadURL();
      return url;
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      return null;
    }
  }

  const processImage = async (image) => {
    const imageUrl = await uploadImageToFirebase(image);
    if (imageUrl) {
      getImage(imageUrl);
    } else {
      Alert.alert("Upload Failed", "Failed to upload image. Please try again.");
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