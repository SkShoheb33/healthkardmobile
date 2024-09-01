import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import login2 from 'src/assets/mobile/login2.png';
import login3 from 'src/assets/mobile/login3.png';
import loginlogo from 'src/assets/mobile/loginlogo.png';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { useNavigation } from '@react-navigation/native';

function AgentLogin() {
    const navigation = useNavigation();

    const [isNumber, setIsNumber] = useState(true);



    const verifyNumber = () => {
        // TODO: verify email
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
                        placeholder='Email'
                        width='w-10/12'
                    />
                    <Input
                        placeholder='Password'
                        width='w-10/12'
                    />
                    <Button
                        style='w-10/12 py-4 mx-auto'
                        color='blue'
                        label='Login'
                        onPress={ () => navigation.navigate('agent') }
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

export default AgentLogin;