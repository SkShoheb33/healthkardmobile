import React, { useEffect, useState } from 'react'
import { BackHandler, Image, ScrollView, Text, View } from 'react-native'
import Navbar from 'src/components/Navbar'
import img1 from 'src/assets/agentHome.png'
import { styles } from 'src/styles/style'
import Button from 'src/components/Button'
import { faHospital, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { PROGRESS, TARGET, WELCOME } from './constants'
import { HEALTHKARDS, HOSPITALS } from '../../strings'
import httpService from 'src/httpService'
import { AGENT_ID } from '../constants'

function Home() {
    const navigation = useNavigation();
    const [agentInfo, setAgentInfo] = useState({})

    useEffect(() => {
        const fetchAgentData = async () => {
            const result = await httpService.get(`agents/${AGENT_ID}`);
            setAgentInfo(result);
        };
        fetchAgentData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                // Exit the app when back is pressed
                BackHandler.exitApp();
                return true; // Prevent default behavior
            };

            // Add event listener for hardware back press
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                // Remove the event listener on unmount
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );



    return (
        <View style={ { flex: 1 } } className=''>
            <Navbar color='blue' />
            <ScrollView style={ { flex: 1 } } className='h-full bg-white'>
                <View style={ { flex: 1 } } className='w-full items-center justify-center h-full my-4'>
                    <View className='flex-row items-center justify-center gap-2 my-4 w-full p-2'>
                        <View className='w-1/2'>
                            <Text className='text-3xl font-bold text-black'>{ WELCOME },</Text>
                            <Text className='text-xl font-bold  text-black'>{ agentInfo?.name }</Text>
                        </View>
                        <View >
                            <Image source={ img1 } />
                        </View>
                    </View>
                    <View className='w-full justify-center items-center my-4'>
                        <Text style={ styles.blueText } className='text-2xl '>{ PROGRESS }</Text>
                        <Text style={ styles.blueText } className='text-2xl '>August, 2024</Text>
                    </View>
                    <View className='flex-row justify-around gap-4 my-4'>
                        <View style={ styles.blue } className=' w-2/5 p-4 rounded-md'>
                            <Text className='text-xl text-white text-center'>{ HEALTHKARDS }</Text>
                            <Text className='text-white text-center text-xl font-bold'>80</Text>
                            <Text className='text-white text-center'>{ TARGET } : 90</Text>
                        </View>
                        <View style={ styles.blue } className=' w-2/5 p-4 rounded-md'>
                            <Text className='text-xl text-white text-center'>{ HOSPITALS }</Text>
                            <Text className='text-white text-center text-xl font-bold'>5</Text>
                            <Text className='text-white text-center'>{ TARGET } : 10</Text>
                        </View>
                    </View>
                    <View className='w-full items-center  my-4'>
                        <Button color='blue' style='w-11/12 p-4' label='Register user' icon={ faUserPlus } iconSize={ 18 } onPress={ () => navigation.navigate('UserRegistration') } />
                        <Button color='blue' style='w-11/12 p-4' label='User renewal' icon={ faUserPlus } iconSize={ 18 } onPress={ () => navigation.navigate('UserRenewal') } />
                        <Button color='blue' style='w-11/12 p-4' label='Onboard hospital' icon={ faHospital } iconSize={ 18 } onPress={ () => navigation.navigate('HospitalRegister') } />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Home
