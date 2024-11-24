import ShimmerContainer from '@components/ShimmerContainer';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useUserSharedData } from 'src/context/UserSharedDataContext';

function Organs({ images }) {
  const navigation = useNavigation();
  const { updateUserData } = useUserSharedData();

  const [imageLoading, setImagesLoading] = useState(false);


  const onPress = (service) => {
    updateUserData({ service: service });
    navigation.navigate('HospitalsNavigation', { service: service })
  };
  return (
    <View className="flex flex-row flex-wrap justify-center">
      { images.map((image, index) => {
        return (
          <TouchableOpacity
            key={ index }
            className="w-1/3 flex flex-col justify-center items-center my-2"
            onPress={ () => onPress(image.service) }
          >
            <ShimmerContainer
              style={ { width: 50, height: 50, borderRadius: 1000 } }
              isVisible={ imageLoading }
            >
              <Image source={ { uri: image?.image } } style={ { width: 50, height: 50 } } onLoad={ () => setImagesLoading(true) } className='my-1'></Image>
            </ShimmerContainer>
            <Text className='text-black'>{ image?.name }</Text>
          </TouchableOpacity>
        );
      }) }
    </View>
  );
}

export default Organs;
