import React from 'react'
import { Image, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'

function Success() {
    const navigation = useNavigation();
    const successImage = 'https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Fsuccess.png?alt=media&token=c7d38141-78aa-4455-9161-9c2fde295e9a';

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <View style={ { flex: 1 } } className=' items-center justify-center'>
                <Image source={ { uri: successImage } } style={ { width: 120, height: 120 } } />
                <Text className='text-2xl text-green-500 font-bold my-2'>Successfully Registered</Text>
                <Button label='Go to home' style='p-2 w-1/2 mx-auto' onPress={ () => navigation.navigate('Home') } />
            </View>
        </View>
    )
}

export default Success
