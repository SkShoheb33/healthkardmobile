import Button from '@components/Button'
import Heading from '@components/Heading'
import Input from '@components/Input'
import Navbar from '@components/Navbar'
import React from 'react'
import { View, ScrollView } from 'react-native'

function UserRenewal() {
    return (
        <View className='flex-1 bg-white'>
            <Navbar color='blue' />
            <ScrollView className='flex-1 p-4' >
                <Heading label='Search User' size='text-xl' />
                <Input label='Search User' width='w-11/12' placeholder='Search User by phone number or healthId' />
                <Button label='Search' style='w-11/12 p-2' color='blue' />
            </ScrollView>
        </View>
    )
}

export default UserRenewal
