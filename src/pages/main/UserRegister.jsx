import React, { useEffect, useState } from 'react';
import { View, Image, KeyboardAvoidingView, Alert } from 'react-native';
import login2 from '../../assets/mobile/login2.png';
import login3 from '../../assets/mobile/login3.png';
import loginlogo from '../../assets/mobile/loginlogo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { errorsMessages, intialUserRegisterForm } from './constants';
import httpService from 'src/httpService';
import { validateEmail } from 'src/helpers/validations';
import { sendMobileOTP, verifyMobileOTP } from 'src/helpers/mobileVerification';
import ErrorBoundary from '@components/ErrorBoundary';

function UserRegister() {
  const navigation = useNavigation();
  const [userRegisterForm, setUserRegisterForm] = useState(intialUserRegisterForm);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordSection, setIsPasswordSection] = useState(false);
  const [actualOtp, setActualOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState(null);
  const [errors, setErrors] = useState(errorsMessages)
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    setUserRegisterForm(intialUserRegisterForm);
    setIsPasswordSection(false);
  }, [])

  const sendOTPHandler = async () => {
    if (!userRegisterForm.email) {
      setErrors(prev => ({
        ...prev,
        email: { message: 'Please enter email', status: true }
      }))
      return;
    } else {
      if (!validateEmail(userRegisterForm.email)) {
        setErrors(prev => ({
          ...prev,
          email: { message: 'Please enter valid gmail', status: true }
        }))
        return;
      }
    }
    if (!userRegisterForm.name) {
      setErrors(prev => ({
        ...prev,
        name: { ...prev.name, status: true }
      }))
      return;
    }
    try {
      const emailCheckResponse = await httpService.post('auth/check-email', { email: userRegisterForm.email });
      if (emailCheckResponse.exists) {
        setErrors(prev => ({
          ...prev,
          email: { ...prev.email, status: true }
        }))
        Alert.alert('Error', emailCheckResponse.message);
        return;
      }
      const response = await httpService.post('auth/send-otp', { "userName": userRegisterForm.name, email: userRegisterForm.email });
      setActualOtp(response.otpCode);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTPHandler = async () => {
    if (actualOtp == enteredOtp) {
      setEmailVerified(true);
    } else {
      setErrors(prev => ({
        ...prev,
        otp: { ...prev.otp, status: true }
      }))
      setEnteredOtp(null);
    }
  }

  const onChangeHandler = (property, value) => {
    const temp = errors;
    if (temp[property] && temp[property].status) {
      temp[property].status = false;
    }
    setErrors(temp);
    setUserRegisterForm(prev => ({
      ...prev,
      [property]: value
    }))
  }

  const validateNumber = async () => {
    const response = await httpService.post('auth/check-number', { number: userRegisterForm.number });
    if (response.exists) {
      setErrors(prev => ({
        ...prev,
        number: { ...prev.number, status: true }
      }))

      Alert.alert('Error', response.message);
      return;
    }
    setIsPasswordSection(true);
  }

  const register = async () => {
    try {
      const response = await httpService.post('auth/new-user', userRegisterForm);
      console.log(response);
      Alert.alert('Success', 'Your data is successfully updated, Please login');
      navigation.navigate('UserLogin');
    } catch (error) {
      Alert.alert('Error', 'Something wents wrong, please try again later');
    }
  }

  return (
    <ErrorBoundary>
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

        { !isPasswordSection ?
          <KeyboardAvoidingView
            behavior='padding'
            className='absolute bottom-20 left-0 z-10 flex items-center justify-center flex-col w-screen'
          >
            <Input
              property='name'
              value={ userRegisterForm.name }
              placeholder='Enter your name'
              width='w-10/12'
              onChange={ onChangeHandler }
              error={ errors['name'] }
            />
            { !actualOtp || emailVerified ?
              <Input
                property='email'
                value={ userRegisterForm.email }
                placeholder='Email'
                width='w-10/12'
                onClick={ sendOTPHandler }
                onClickLable={ emailVerified ? 'Verified' : 'Send OTP' }
                onChange={ onChangeHandler }
                error={ errors['email'] }
              /> :
              <Input
                property='otpCode'
                value={ enteredOtp }
                placeholder='Enter otp'
                width='w-10/12'
                inputMode='numeric'
                onClick={ verifyOTPHandler }
                onClickLable='Verify OTP'
                error={ errors['otp'] }
                onChange={ (property, value) => setEnteredOtp(value) }
              />
            }
            <Input
              property='number'
              value={ userRegisterForm.number }
              placeholder='Contact Number'
              width='w-10/12'
              inputMode='numeric'
              disabled={ true }
              onChange={ onChangeHandler }
              error={ errors['number'] }
            />
            <Button
              style='w-10/12 py-4 mx-auto'
              color='blue'
              label='Set Password'
              onPress={ validateNumber }
              disabled={ !userRegisterForm.name || !emailVerified }
            />
          </KeyboardAvoidingView> :
          <KeyboardAvoidingView
            behavior='padding'
            className='absolute bottom-20 left-0 z-10 flex items-center justify-center flex-col w-screen'
          >
            <Input
              property='password'
              value={ userRegisterForm.password }
              placeholder='Enter Password'
              onChange={ onChangeHandler }
              inputMode='password'
              width='w-10/12'
            />
            <Input
              property='confrim_password'
              value={ confirmPassword }
              placeholder='Confrim password'
              width='w-10/12'
              inputMode='password'
              onChange={ (property, value) => setConfirmPassword(value) }
            />
            <Button
              style='w-10/12 py-4 mx-auto'
              color='blue'
              label='Register'
              disabled={ userRegisterForm.password !== confirmPassword || userRegisterForm.password <= 6 }
              onPress={ register }
            />
          </KeyboardAvoidingView>
        }

        <Image
          source={ login3 }
          className='absolute bottom-0 left-0 w-full'
        />
      </View>
    </ErrorBoundary>
  );
}

export default UserRegister;