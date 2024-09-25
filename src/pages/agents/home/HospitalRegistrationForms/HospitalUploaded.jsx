import React from 'react'
import { Text, View } from 'react-native'
import Button from '@components/Button'
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbar from '@components/Navbar';

function HospitalUploaded() {
    const navigation = useNavigation();
    const { response } = useRoute();

    return (
        <View>
            <Navbar />
            <View className='flex flex-col items-center justify-center h-full'>
                <Text className='text-2xl font-bold text-center mb-4 text-black'>Hosptial Registration Submitted</Text>
                <Text className='text-sm text-center mb-4 text-black'>We will review your registration and get back to you soon</Text>
                <Button label='Back to home' color='blue' onPress={ () => navigation.navigate('Home') } style='w-1/2 p-4' />
            </View>
        </View>
    )
}

export default HospitalUploaded
