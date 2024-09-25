import Button from '@components/Button';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Tour = () => {
    const [index, setIndex] = useState(1);
    const navigation = useNavigation();
    const getGif = () => {
        return `https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Fgifs%2F${index}.gif?alt=media&token=f2b23d6e-156f-469d-95ef-d3f41fd4f8b4`;
    }
    const [gif, setGif] = useState(getGif());

    const saveTour = async () => {
        await AsyncStorage.setItem('TourCompleted', 'true');
        navigation.navigate('First');
    }

    return (
        <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } } className='bg-white'>
            <FastImage
                source={ { uri: gif } }
                style={ { width: '100%', height: '50%' } }
                resizeMode={ FastImage.resizeMode.contain }
            />
            { index < 4 ? <Button style={ 'w-10/12 p-4' } label='Next' onPress={ () => { setIndex(index => index + 1); setGif(getGif()); } } color='blue' />
                : <Button style={ 'w-10/12 p-4' } label='Get Started' onPress={ saveTour } color='blue' /> }
        </View>
    );
}

export default Tour;