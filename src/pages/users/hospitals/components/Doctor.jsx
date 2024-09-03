import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../../../../styles/style';

const Doctor = ({ doctor, image }) => {
    return (
        <View className='py-2 px-4 border border-gray-200 shadow-xl mx-2 rounded-md'>
            { image && <Image
                source={ { uri: image } }
                style={ { height: 300, width: 300 } }
                className='rounded-md'
            /> }
            <Text
                style={ styles.blueText }
                className='font-semibold my-2'
            >
                { doctor.name }
            </Text>
            <Text className='text-black'>
                { doctor.qualification }
            </Text>
        </View>
    );
};

export default Doctor;
