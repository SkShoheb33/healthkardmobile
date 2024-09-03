import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Alert, Text } from 'react-native';
import login2 from '../../assets/mobile/login2.png';
import login3 from '../../assets/mobile/login3.png';
import loginlogo from '../../assets/mobile/loginlogo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import OTPFiled from '../../components/OTPFiled';
import { useNavigation } from '@react-navigation/native';
import httpService from 'src/httpService';

function UserLogin() {
  const navigation = useNavigation();

  const [isNumber, setIsNumber] = useState(true);
  const [number, setNumber] = useState(true);


  const getOTP = async () => {
    try {
      const response = await httpService.post('auth/user-login', { number: '91' + number });
      setIsNumber(false);
    } catch (error) {
      Alert.alert('Error', 'Data not found with this number');
    }
  }

  const handleChangeNumber = (property, value) => {
    if (value.length <= 10) {
      setNumber(value)
    }
  }

  const verifyOTP = () => {
    // TODO: verify number
    navigation.navigate('user');
  };

  return (
    <View style={ { flex: 1 } } className='relative'>
      <Image
        source={ login2 }
        className='absolute top-0 left-0'
      />

      <View className='absolute top-40 items-center justify-center w-full'>
        <Image
          source={ loginlogo }
          className=''
        />
      </View>

      <KeyboardAvoidingView
        behavior='padding'
        className='absolute bottom-32 left-0 z-10 flex items-center justify-center flex-col w-screen'
      >
        { isNumber && <View className='w-full items-center'>
          <Input
            placeholder='Contact Number'
            width='w-10/12'
            value={ number }
            onChange={ handleChangeNumber }
          />
          <Button
            style='w-10/12 py-4 mx-auto'
            color='blue'
            label='GET OTP'
            onPress={ getOTP }
            disabled={ number.length !== 10 }
          />

        </View> }
        { !isNumber && <View className='w-full items-center'>
          <View className='w-10/12'>
            <Text>Enter OTP</Text>
            <OTPFiled />

          </View>
          <Button
            style='w-10/12 py-4 mx-auto'
            color='blue'
            label='Login'
            onPress={ verifyOTP }
            disabled={ number.length !== 10 }
          />

        </View> }
      </KeyboardAvoidingView>

      <Image
        source={ login3 }
        className='absolute bottom-0 left-0 w-full'
      />
    </View>
  );
}

export default UserLogin;