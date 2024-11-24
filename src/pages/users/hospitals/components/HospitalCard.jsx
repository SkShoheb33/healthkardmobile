import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import Button from '@components/Button';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { openMap } from 'src/helpers/maps';
import { dialPhoneNumber } from 'src/helpers/call';
import ShimmerContainer from '@components/ShimmerContainer';

function HospitalCard({ hospital, horizontal = false, }) {
    const navigation = useNavigation();
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Pressable
            onPress={ () => navigation.navigate('Hospital', { hospitalId: hospital.hospitalId }) }
            className={ `border-1 ${horizontal ? 'w-[220] mx-1' : 'my-1 w-[49%]'} items-start border border-gray-300 p-1 my-1 rounded-md shadow-xl bg-white` }
        >

            <ShimmerContainer
                style={ { height: 120, width: horizontal ? 210 : '100%' } }
                isVisible={ imageLoaded }>

                <Image
                    source={ { uri: hospital?.mediaDetails?.hospitalImageURL || "https://via.placeholder.com/150" } }
                    className='w-full h-full'
                    onLoad={ () => setImageLoaded(true) }
                />
            </ShimmerContainer>

            <Text className='font-semibold text-lg my-1 text-black'>
                { hospital?.hospitalDetails?.hospitalTradeName?.length > 18 ? hospital?.hospitalDetails?.hospitalTradeName?.slice(0, 15) + '...' : hospital?.hospitalDetails?.hospitalTradeName }
            </Text>
            <View style={ { flex: 1 } } className='justify-between'>
                <Text className='my-1 text-black text-justify'>
                    { hospital?.mediaDetails?.desc?.length > 120
                        ? hospital?.mediaDetails?.desc?.slice(0, 120).replace(/\n/g, ' ') + '...'
                        : hospital?.mediaDetails?.desc?.replace(/\n/g, ' ') }
                    { hospital?.mediaDetails?.desc?.length > 120 &&
                        <Text className='text-[#808080]'>Read more</Text> }
                </Text>
                <View className='w-full flex-row justify-between'>
                    <Button onPress={ () => openMap(hospital?.hospitalDetails?.address?.lat, hospital?.hospitalDetails?.address?.lng) } label='Locate' style='px-1 py-2 w-[45%]' textStyle='text-xs' color='blue' icon={ faLocationDot } />
                    <Button onPress={ () => dialPhoneNumber(hospital?.hospitalDetails?.hospitalNumber) } label='Call' style='px-1 py-2 w-[45%]' textStyle='text-xs' icon={ faPhone } />
                </View>
            </View>
        </Pressable>
    );
}

export default HospitalCard;
