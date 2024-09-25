import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { ImageLogin2, ImageLogin3, ImageLoginLogo } from './constants';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { useNavigation } from '@react-navigation/native';
import { validateEmail } from 'src/helpers/validations';
import httpService from 'src/httpService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AgentLogin() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const login = async () => {
        try {
            setLoggingIn(true);
            const response = await httpService.post('auth/agent-login', { email, password });
            if (response.message === 'Login successful') {
                await AsyncStorage.setItem('agentName', response.name);
                await AsyncStorage.setItem('agentId', response.agentId);
                await AsyncStorage.setItem('agentToken', response.id);

                navigation.navigate('agent');
            }
        } catch (error) {
            Alert.alert('Error', 'Please check your email and password or internet connection');
            console.log(error);
        } finally {
            setLoggingIn(false);
        }
    }

    return (
        <View style={ { flex: 1 } } className='relative'>
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
                <View className='w-full items-center'>
                    <Input
                        placeholder='Email'
                        width='w-10/12'
                        value={ email }
                        onChange={ (property, value) => setEmail(value) }
                    />
                    <Input
                        placeholder='Password'
                        width='w-10/12'
                        inputMode='password'
                        value={ password }
                        onChange={ (property, value) => setPassword(value) }
                    />
                    <Button
                        style='w-10/12 py-4 mx-auto'
                        color='blue'
                        label='Login'
                        disabled={ !validateEmail(email) || password.length < 6 }
                        onPress={ login }
                        loading={ loggingIn }
                    />

                </View>
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

export default AgentLogin;