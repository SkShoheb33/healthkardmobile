import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from '@components/Button'
import Heading from '@components/Heading'
import Input from '@components/Input'
import Navbar from '@components/Navbar'
import { Text, View } from 'react-native'
import httpService from 'src/httpService'
import { validateEmail } from 'src/helpers/validations'

function HospitalRegister() {

    const navigation = useNavigation();
    const [isOtp, setIsOtp] = useState(false);
    const [email, setEmail] = useState('');
    const [hospitalLegalName, setHospitalLegalName] = useState('');
    const [actualOtp, setActualOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');

    const handleSendOTP = async () => {
        if (!email || !hospitalLegalName) {
            alert('Please enter both email and hospital legal name');
            return;
        } else {
            if (!validateEmail(email)) {
                alert('Please enter a valid email');
                return;
            }
        }
        try {
            const response = await httpService.post('auth/send-otp', { email, userName: hospitalLegalName });
            setIsOtp(true);
            setActualOtp(response.otpCode);
        } catch (error) {
            console.log(error);
        }
    }

    const handleVerifyOTP = () => {
        if (enteredOtp == actualOtp) {
            navigation.navigate('AgentHospitalRegistration');
        } else {
            alert('OTP is incorrect');
        }
    }

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar color='blue' />
            { !isOtp && <View style={ { flex: 1 } } className='w-10/12 justify-center mx-auto'>
                <Heading label='Hospital Registration' size='text-xl' />
                <Input placeholder='Enter hospital name' onChange={ (property, value) => setHospitalLegalName(value) } />
                <Input placeholder='Enter email' onChange={ (property, value) => setEmail(value) } />
                <Button label='SEND OTP' color='blue' onPress={ handleSendOTP } />
            </View> }

            { isOtp && <View style={ { flex: 1 } } className='w-10/12 justify-center mx-auto'>
                <Heading label='Hospital Registration' size='text-xl' />
                <Text className='text-lg text-black'>please Enter OTP</Text>
                <Input placeholder='Enter Otp' onChange={ (property, value) => setEnteredOtp(value) } />
                <Button label='Start Registration' color='blue' onPress={ handleVerifyOTP } />
            </View> }

        </View>
    )
}

export default HospitalRegister

