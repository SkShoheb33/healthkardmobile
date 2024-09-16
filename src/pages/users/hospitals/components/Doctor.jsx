import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../../../../styles/style';
import ShimmerContainer from '@components/ShimmerContainer';

const Doctor = ({ doctor, image }) => {
    const [imageLoading, setImageLoading] = useState(false);

    return (
        <View className='py-2 px-4 border border-gray-200 shadow-xl mx-2 rounded-md'>
            { image &&
                <ShimmerContainer
                    isVisible={ imageLoading }
                    style={ { height: 300, width: 300 } }
                >
                    <Image
                        source={ { uri: image } }
                        style={ { height: 300, width: 300 } }
                        className='rounded-md'
                        onLoad={ () => setImageLoading(true) }
                    />
                </ShimmerContainer>
            }
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
