import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Button from './Button';
import RNFS from 'react-native-fs';
import { styles } from 'src/styles/style';

function Camera({ label, getImage, width }) {

  async function convertImageToBase64(image) {
    try {
      const base64String = await RNFS.readFile(image.path, 'base64');
      return `data:${image.mime};base64,${base64String}`;
    } catch (error) {
      return null;
    }
  }
  const openCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      convertImageToBase64(image).then((base64Image) => {
        getImage(base64Image);
      });
    });
  }
  return (
    <TouchableOpacity onPress={ openCamera }>
      <Text style={ styles.blueText }>Change Picture</Text>
    </TouchableOpacity>
  )
}

export default Camera