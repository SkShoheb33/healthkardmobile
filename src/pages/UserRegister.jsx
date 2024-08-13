import React from 'react'
import { View, Text, Image, KeyboardAvoidingView } from 'react-native'
import login2 from '../assets/mobile/login2.png'
import login3 from '../assets/mobile/login3.png'
import loginlogo from '../assets/mobile/loginlogo.png'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useNavigation } from '@react-navigation/native'

function UserRegister() {

  const navigation = useNavigation();

  const verifyEmail = ()=>{
    // TODO : verify email 
  }
  const verifyNumber = ()=>{
    // TODO : verify number 
  }

  return (
    <View style={{flex:1}} className='relative'>
      <Image source={login2} className='absolute top-0 left-0'/>
      <View className='absolute top-40 items-center justify-center w-full'>
        <Image source={loginlogo} className=''/>
      </View>
      <KeyboardAvoidingView className='absolute bottom-20 left-0 z-10 flex items-center justify-center flex-col w-screen'>
        <Input placeholder='Enter your name' width='w-10/12'/>
        <Input placeholder='Email'  width='w-10/12' onClick={verifyEmail}/>
        <Input placeholder='Contact Number'  width='w-10/12' onClick={verifyNumber}/>
        <Button style='w-10/12 py-4 mx-auto' color='blue' label='Register' onPress={()=>navigation.navigate('UserLogin')}/>
      </KeyboardAvoidingView>
      <Image source={login3} className='absolute bottom-0 left-0 w-full'/>
    </View>
  )
}

export default UserRegister
