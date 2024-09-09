import React from 'react'
import { Image, Text, View } from 'react-native'
import failedImage from '@assets/failed.png'
import Navbar from './Navbar'

function Failed() {
    return (
        <View style={ { flex: 1 } } className=''>
            <View style={ { flex: 1 } } className=' items-center justify-center'>
                <Image source={ failedImage } style={ { width: 120, height: 120 } } />
                <Text className='text-2xl text-red-500 font-bold my-2'>Sorry Registration Failed</Text>
                <Text className='text-lg text-red-500 font-bold my-2'>Please try after some time</Text>
            </View>
        </View>
    )
}

export default Failed
