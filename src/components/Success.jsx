import React from 'react'
import { Image, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import succesImage from '@assets/success.png'
import Navbar from './Navbar'
import Button from './Button'

function Success() {
    const navigation = useNavigation();

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar />
            <View style={ { flex: 1 } } className=' items-center justify-center'>
                <Image source={ succesImage } style={ { width: 120, height: 120 } } />
                <Text className='text-2xl text-green-500 font-bold my-2'>Successfully Registered</Text>
                <Button label='Go to home' style='p-2 w-1/2 mx-auto' onPress={ () => navigation.navigate('Home') } />
            </View>
        </View>
    )
}

export default Success
