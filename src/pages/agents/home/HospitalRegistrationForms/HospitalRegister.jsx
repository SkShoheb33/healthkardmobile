import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from '@components/Button'
import Heading from '@components/Heading'
import Input from '@components/Input'
import Navbar from '@components/Navbar'
import OTPFiled from '@components/OTPFiled'
import { Text, View } from 'react-native'

function HospitalRegister() {

    const navigation = useNavigation();
    const [isOtp, setIsOtp] = useState(false);

    const handleSendOTP = () => {
        setIsOtp(true);
    }

    const handleVerifyOTP = () => {
        //TODO 
        navigation.navigate('AgentHospitalRegistration')
    }
    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar color='blue' />
            { !isOtp && <View style={ { flex: 1 } } className='w-10/12 justify-center mx-auto'>
                <Heading label='Hospital Registration' size='text-xl' />
                <Input placeholder='Enter hospital name' />
                <Input placeholder='Enter email' />
                <Button label='SEND OTP' onPress={ handleSendOTP } />
            </View> }

            { isOtp && <View style={ { flex: 1 } } className='w-10/12 justify-center mx-auto'>
                <Heading label='Hospital Registration' size='text-xl' />
                <Text className='text-lg'>please Enter OTP</Text>
                <OTPFiled />
                <Button label='Start Registration' onPress={ handleVerifyOTP } />
            </View> }

        </View>
    )
}

export default HospitalRegister
