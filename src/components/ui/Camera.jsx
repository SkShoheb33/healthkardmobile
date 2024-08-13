import React from 'react';
import { View } from 'react-native';
import Button from './Button';
import { launchCamera } from 'react-native-image-picker';

function Camera() {
  const takePicture = () => {
    launchCamera({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const { uri } = response.assets[0];
        console.log('Camera response: ', uri);
      }
    });
  };

  return (
    <View>
      <Button label='Take picture' onPress={takePicture} />
    </View>
  );
}

export default Camera;
