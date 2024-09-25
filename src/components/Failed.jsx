import React from 'react'
import { Image, Text, View } from 'react-native'

function Failed() {
    const failedImage = 'https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Ffailed.png?alt=media&token=93e360f0-aec0-48fb-9f47-c8c2e2bb83b9';
    return (
        <View style={ { flex: 1 } } className=''>
            <View style={ { flex: 1 } } className=' items-center justify-center'>
                <Image source={ { uri: failedImage } } style={ { width: 120, height: 120 } } />
                <Text className='text-2xl text-red-500 font-bold my-2'>Sorry Registration Failed</Text>
                <Text className='text-lg text-red-500 font-bold my-2'>Please try after some time</Text>
            </View>
        </View>
    )
}

export default Failed
