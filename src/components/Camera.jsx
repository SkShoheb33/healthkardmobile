import React from 'react'
import { Text, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Button from './Button';
import RNFS from 'react-native-fs';

function Camera({label, getImage, width}) {

  async function convertImageToBase64(image) {
    try {
      const base64String = await RNFS.readFile(image.path, 'base64');
      return `data:${image.mime};base64,${base64String}`;
    } catch (error) {
      return null;
    }
  }
  const openCamera = ()=>{
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
    <Button label={label} onPress={openCamera} style={`${width} p-4`}/>
  )
}

export default Camera