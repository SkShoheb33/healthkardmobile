import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ImageLogin } from './constants';
import { styles } from 'src/styles/style';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function First() {
  const navigation = useNavigation();

  useEffect(() => {
    checkStoredNumber();
  }, []);

  const checkStoredNumber = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        navigation.replace('user');
      }
      const agentToken = await AsyncStorage.getItem('agentToken');
      if (agentToken) {
        navigation.replace('agent');
      }
    } catch (error) {
      console.log('Error checking stored number:', error);
    }
  };

  return (
    <View style={ { flex: 1 } } className='relative'>
      <Image source={ { uri: ImageLogin } } className='w-full h-1/2' />

      <Text style={ styles.greenText } className='text-3xl p-6 text-center'>
        Start your journey now with{ ' ' }
        <Text className='font-bold text-4xl'>HEALTHKARD</Text>
      </Text>

      <View className='my-10'>
        <Button
          label='Login'
          color='green'
          style='w-10/12 p-4 mx-auto'
          onPress={ () => navigation.navigate('UserLogin') }
        />
        <Button
          label='Register'
          color='blue'
          style='w-10/12 p-4 mx-auto'
          onPress={ () => navigation.navigate('UserRegister') }
        />
      </View>

      <TouchableOpacity
        onPress={ () => navigation.navigate('AgentLogin') }
        style={ styles.green }
        className='absolute bottom-4 right-4 p-2 w-20 h-20 justify-center items-center rounded-full text-white font-semibold'
      >
        <Text className='text-xs'>Login Agent</Text>
      </TouchableOpacity>
    </View>
  );
}

export default First;
