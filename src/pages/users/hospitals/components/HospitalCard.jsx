import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import Button from '@components/Button';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { openMap } from 'src/helpers/maps';
import { dialPhoneNumber } from 'src/helpers/call';

function HospitalCard({ hospital, horizontal = false, }) {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={ () => navigation.navigate('Hospital', { hospitalId: hospital.hospitalId }) }
            className={ `border-1 ${horizontal ? 'w-[220] mx-1' : 'my-1 w-[49%]'} items-start border border-gray-300 p-1 my-1 rounded-md shadow-xl bg-white` }
        >
            <Image
                source={ { uri: hospital.mediaDetails.hospitalImageURL } }
                style={ { height: 120 } }
                className='w-full'
            />
            <Text className='font-semibold text-lg my-1 text-black'>
                { hospital.hospitalDetails.hospitalTradeName.length > 18 ? hospital.hospitalDetails.hospitalTradeName.slice(0, 15) + '...' : hospital.hospitalDetails.hospitalTradeName }
            </Text>
            <View style={ { flex: 1 } } className='justify-between'>
                <Text className='my-1 text-black text-justify'>
                    { hospital.mediaDetails.desc.length > 120 ?
                        <Text>{ hospital.mediaDetails.desc.slice(0, 120) }<Text className='text-[#808080]'>...Read more</Text></Text>
                        : hospital.mediaDetails.desc
                    }
                </Text>
                <View className='w-full flex-row justify-between'>
                    <Button onPress={ openMap } label='Locate' style='px-1 py-2 w-[45%]' color='blue' icon={ faLocationDot } />
                    <Button onPress={ dialPhoneNumber } label='Call' style='px-1 py-2 w-[45%]' icon={ faPhone } />
                </View>
            </View>
        </Pressable>
    );
}

export default HospitalCard;
