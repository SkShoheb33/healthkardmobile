import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { styles } from 'src/styles/style';

function Camera({ label = 'Upload or Take Picture', getImage, width = 'w-10/12' }) {

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

  return (
    <View className={ `${width} items-center justify-center` }>
      <Text style={ styles.blueText }>{ label }</Text>
      <View className="flex-row justify-around w-full mt-2">
        <TouchableOpacity onPress={ openGallery } style={ styles.button }>
          <Text style={ styles.buttonText }>Upload Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ openCamera } style={ styles.button }>
          <Text style={ styles.buttonText }>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Camera