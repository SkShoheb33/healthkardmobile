import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import login2 from 'src/assets/mobile/login2.png';
import login3 from 'src/assets/mobile/login3.png';
import loginlogo from 'src/assets/mobile/loginlogo.png';
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

    const login = async () => {
        try {
            const response = await httpService.post('auth/agent-login', { email, password });
            if (response.message === 'Login successful') {
                await AsyncStorage.setItem('agentName', response.name);
                await AsyncStorage.setItem('agentId', response.agentId);
                await AsyncStorage.setItem('agentToken', response.id);

                navigation.navigate('agent');
            }
        } catch (error) {
            console.log(error);
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

export default AgentLogin;