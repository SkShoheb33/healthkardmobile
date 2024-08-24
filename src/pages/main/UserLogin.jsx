import React from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import login2 from '../../assets/mobile/login2.png';
import login3 from '../../assets/mobile/login3.png';
import loginlogo from '../../assets/mobile/loginlogo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import OTPFiled from '../../components/OTPFiled';
import { useNavigation } from '@react-navigation/native';

function UserLogin() {
  const navigation = useNavigation();

  const verifyEmail = () => {
    // TODO: verify email
  };

  return (
    <View style={{ flex: 1 }} className='relative'>
      <Image
        source={login2}
        className='absolute top-0 left-0'
      />

      <View className='absolute top-40 items-center justify-center w-full'>
        <Image
          source={loginlogo}
          className=''
        />
      </View>

      <KeyboardAvoidingView
        behavior='padding' // Added behavior for proper handling of keyboard
        className='absolute bottom-32 left-0 z-10 flex items-center justify-center flex-col w-screen'
      >
        <Input
          placeholder='Contact Number'
          width='w-10/12'
        />
        <OTPFiled />
        <Button
          transparent={true}
          label='Forgotten password?'
          style='w-10/12'
        />
        <Button
          style='w-10/12 py-4 mx-auto'
          color='blue'
          label='Login'
          onPress={() => navigation.navigate('user')}
        />
      </KeyboardAvoidingView>

      <Image
        source={login3}
        className='absolute bottom-0 left-0 w-full'
      />
    </View>
  );
}

export default UserLogin;