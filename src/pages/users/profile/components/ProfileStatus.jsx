import Button from '@components/Button'
import React from 'react'
import { View, Text } from 'react-native'

function ProfileStatus() {
    const handleCompleteProfile = () => {
        console.log('Complete Profile')
    }
    return (
        <View className='flex-row h-48 border items-center p-2 justify-between border-gray-300'>
            <View className='h-20 w-20 rounded-full bg-red-500 items-center justify-center'>
                <Text className='text-white text-2xl font-bold'>30%</Text>
            </View>
            <View className='flex-1 mx-2'>
                <Text className='text-black text-lg font-bold'>Complete your profile to get started</Text>
                <Text className='text-gray-500 text-xs'>Fill in your details to get started</Text>
                <Button label='Complete Profile' color='blue' onPress={ handleCompleteProfile } />
            </View>
        </View>
    )
}

export default ProfileStatus
