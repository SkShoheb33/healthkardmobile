import React, { useState, useEffect } from 'react';
import { View, Image, KeyboardAvoidingView, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageLogin2, ImageLogin3, ImageLoginLogo } from './constants';
import Input from '@components/Input';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import httpService from 'src/httpService';
import { styles } from 'src/styles/style';
import { validateEmail } from 'src/helpers/validations';

function UserLogin() {
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');

  const login = async () => {
    try {
      setLoggingIn(true);
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
    } finally {
      setLoggingIn(false);
    }

  }
  const sendPassword = async () => {
    try {
      setLoggingIn(true);
      const response = await httpService.post('auth/send-password', { email });
      if (response.message === 'Password sent to your email') {
        Alert.alert('Success', 'A temporary password has been sent to your email. Please check your inbox and spam folder.');
        setShowEmail(false); // Switch back to the login form
      } else {
        Alert.alert('Error', response.message || 'Failed to send password');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send password. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  }

  const handleChangeNumber = (property, value) => {
    if (property === 'number' && value.length <= 10) {
      setNumber(value)
    } else if (property === 'password') {
      setPassword(value);
    }
  }

  const handleChangeEmail = (property, value) => {
    if (property === 'email') {
      setEmail(value);
    }
  }

  return (
    <View style={ { flex: 1 } } className='relative bg-white'>
      <Image
        source={ { uri: ImageLogin2 } }
        style={ { height: 210, width: 140 } }
        className=' top-0 left-0'
        resizeMode='cover'
      />
      <View className='absolute top-40 left-0 w-full items-center justify-center'>
        <Image
          source={ { uri: ImageLoginLogo } }
          style={ { height: 120, width: '80%' } }
          resizeMode='contain'
        />
      </View>

      <KeyboardAvoidingView
        behavior='padding'
        className='absolute bottom-32 left-0 z-10 flex items-center justify-center flex-col w-screen'
      >
        { !showEmail ? <View className='w-full items-center'>
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
            width='w-10/12 '
            value={ password }
            inputMode='password'
            onChange={ handleChangeNumber }
          />
          <TouchableOpacity onPress={ () => setShowEmail(true) } className='w-10/12'>
            <Text style={ styles.blueText } className='text-sm text-gray-500 text-left '>Forgot Password?</Text>
          </TouchableOpacity>
          <Button
            style='w-10/12 py-4 mx-auto'
            color='blue'
            label='LOGIN'
            onPress={ login }
            disabled={ number.length !== 10 || password.length <= 6 }
            loading={ loggingIn }
          />

        </View> :
          <View className='w-full items-center'>
            <Input
              placeholder='Enter email'
              property='email'
              width='w-10/12'
              value={ email }
              inputMode='email'
              onChange={ handleChangeEmail }
            />
            <Button
              style='w-10/12 py-4 mx-auto'
              color='blue'
              label='Send Password'
              onPress={ sendPassword }
              disabled={ !validateEmail(email) }
              loading={ loggingIn }
            />
            <TouchableOpacity onPress={ () => setShowEmail(false) } className='w-10/12 mt-2'>
              <Text style={ styles.blueText } className='text-sm text-gray-500 text-center'>Back to Login</Text>
            </TouchableOpacity>
          </View>
        }
        <Policy navigation={ navigation } />
      </KeyboardAvoidingView>
      <Image
        source={ { uri: ImageLogin3 } }
        style={ { height: '60%', width: '100%' } }
        className='absolute bottom-0 left-0'
        resizeMode='cover'
      />
    </View>
  );
}

export default UserLogin;


export const Policy = ({ navigation }) => {
  return (
    <View className='flex flex-row flex-wrap justify-around items-center'>
      <TouchableOpacity onPress={ () => navigation.navigate('CookiePolicy') } className='border-r flex-grow px-2 items-center justify-center border-r-white'>
        <Text style={ { color: 'white', zIndex: 10 } } className='mt-2 font-medium'>Cookie Policy apply</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => navigation.navigate('RefundPolicy') } className='flex-grow px-2 items-center justify-center'>
        <Text style={ { color: 'white', zIndex: 10 } } className='mt-2 font-medium'>Refund Policy apply</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => navigation.navigate('UsersConditions') } className='flex-grow px-2 items-center justify-center'>
        <Text style={ { color: 'white', zIndex: 10 } } className='mt-2 font-medium'>Terms and Conditions apply</Text>
      </TouchableOpacity>
    </View>
  )
}
