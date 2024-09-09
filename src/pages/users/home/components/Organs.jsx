import ShimmerContainer from '@components/ShimmerContainer';
import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

function Organs({ images, onClick = () => { } }) {
  return (
    <View className="flex flex-row flex-wrap p-1 justify-center">
      { images.map((image, index) => {
        return (
          <TouchableOpacity
            key={ index }
            className="w-1/3 flex flex-col justify-center items-center "
            onPress={ () => onClick(image) }
          >
            <ShimmerContainer
              style={ { width: 50, height: 50 } }
              isVisible={ image.image }
            >
              <Image source={ { uri: image.image } } style={ { width: 50, height: 50 } }></Image>
            </ShimmerContainer>
            <Text className='text-black'>{ image.name }</Text>
          </TouchableOpacity>
        );
      }) }
    </View>
  );
}

export default Organs;
