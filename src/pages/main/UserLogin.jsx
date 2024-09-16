import React, { useState, useEffect } from 'react';
import { View, Image, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import login2 from '@assets/mobile/login2.png';
import login3 from '@assets/mobile/login3.png';
import loginlogo from '@assets/mobile/loginlogo.png';
import Input from '@components/Input';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import httpService from 'src/httpService';

function UserLogin() {
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await httpService.post('auth/user-login', { number, password });
      if (response.message === 'Verified') {
        await AsyncStorage.setItem('userName', response.name);
        await AsyncStorage.setItem('userId', response.id.toString());
        await AsyncStorage.setItem('userNumber', number);
        navigation.replace('user');
      } else if (response.message === 'Password incorrect') {
        Alert.alert('Error', 'Please enter the correct password');
      } else {
        Alert.alert('Error', 'Data not found with this number');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Data not found with this number');
    }
  }

  const handleChangeNumber = (property, value) => {
    if (property === 'number' && value.length <= 10) {
      setNumber(value)
    } else if (property === 'password') {
      setPassword(value);
    }
  }

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
        <View className='w-full items-center'>
          <Input
            placeholder='Contact Number'
            property='number'
            width='w-10/12'
            value={ number }
            inputMode='numeric'
            onChange={ handleChangeNumber }
          />
          <Input
            placeholder='Password'
            property='password'
            width='w-10/12'
            value={ password }
            inputMode='password'
            onChange={ handleChangeNumber }
          />
          <Button
            style='w-10/12 py-4 mx-auto'
            color='blue'
            label='LOGIN'
            onPress={ login }
            disabled={ number.length !== 10 || password.length <= 6 }
          />

        </View>
      </KeyboardAvoidingView>

      <Image
        source={ login3 }
        className='absolute bottom-0 left-0 w-full'
      />
    </View>
  );
}

export default UserLogin;