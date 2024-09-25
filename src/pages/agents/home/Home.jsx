import React, { useEffect, useState, useCallback } from 'react'
import { BackHandler, Image, ScrollView, Text, View, RefreshControl } from 'react-native'
import Navbar from 'src/components/Navbar'
import { styles } from 'src/styles/style'
import Button from 'src/components/Button'
import { faHospital, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { agentHomeImage1, fullYear, PROGRESS, TARGET, WELCOME } from './constants'
import { HEALTHKARDS, HOSPITALS } from '../../strings'
import httpService from 'src/httpService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { countByYearAndMonth, formatCurrency, formatData, getCurrentMonthAndYear } from 'src/helpers/formatData'
import ShimmerContainer from '@components/ShimmerContainer'

function Home() {
    const navigation = useNavigation();
    const [agentInfo, setAgentInfo] = useState({});
    const [currentMonthAmount, setCurrentMonthAmount] = useState(0);
    const [healthkardsTarget, setHealthkardsTarget] = useState(15000);
    const [currentMonthHospitalCount, setCurrentMonthHospitalCount] = useState(0);
    const [hospitalCountTarget, setHospitalCountTarget] = useState(10);
    const [refreshing, setRefreshing] = useState(false);
    const [currentMonthYear, setCurrentMonthYear] = useState(0);

    const fetchAgentData = async () => {
        const id = await AsyncStorage.getItem('agentToken');

        try {
            const result = await httpService.get(`agents/${id}`);
            setAgentInfo(result);
            const usersAmount = countByYearAndMonth(formatData(result?.usersAdded, 'amount') || {}, true);
            const hospitalsAdded = countByYearAndMonth(formatData(result?.hospitalsAdded, 'hospitalId') || {}, false);
            const currentMonth = getCurrentMonthAndYear();
            setCurrentMonthYear(currentMonth);
            setCurrentMonthAmount(usersAmount[currentMonth.year][currentMonth.month] || 0);
            setCurrentMonthHospitalCount(hospitalsAdded[currentMonth.year][currentMonth.month] || 0);
            setHealthkardsTarget(result?.healthkardsTarget);
            setHospitalCountTarget(result?.hospitalsTarget);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAgentData();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchAgentData().then(() => setRefreshing(false));
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
            <ScrollView
                style={ { flex: 1 } }
                className='h-full bg-white'
                refreshControl={
                    <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                }
            >
                <View style={ { flex: 1 } } className='w-full items-center justify-center h-full my-4'>
                    <View className='flex-row items-center justify-center my-4 w-full p-2'>
                        <View className='w-1/2'>
                            <Text className='text-3xl font-bold text-black'>{ WELCOME },</Text>
                            <Text className='text-xl font-bold  text-black'>{ agentInfo?.name }</Text>
                        </View>
                        <ShimmerContainer isVisible={ true } style={ { width: '45%', height: 200 } }>
                            <Image source={ { uri: agentHomeImage1 } } className='w-full h-full' />
                        </ShimmerContainer>
                    </View>
                    <View className='w-full justify-center items-center my-4'>
                        <Text style={ styles.blueText } className='text-2xl '>{ PROGRESS }</Text>
                        <Text style={ styles.blueText } className='text-2xl '>{ fullYear[currentMonthYear.month] }, { currentMonthYear.year }</Text>
                    </View>
                    <View className='flex-row justify-around gap-4 my-4'>
                        <View style={ styles.blue } className=' w-2/5 p-4 rounded-md'>
                            <Text className='text-xl text-white text-center'>{ HEALTHKARDS }</Text>
                            <Text className='text-white text-center text-xl font-bold'>{ formatCurrency(currentMonthAmount) }</Text>
                            <Text className='text-white text-center'>{ TARGET } : { formatCurrency(healthkardsTarget) }</Text>
                        </View>
                        <View style={ styles.blue } className=' w-2/5 p-4 rounded-md'>
                            <Text className='text-xl text-white text-center'>{ HOSPITALS }</Text>
                            <Text className='text-white text-center text-xl font-bold'>{ currentMonthHospitalCount }</Text>
                            <Text className='text-white text-center'>{ TARGET } : { hospitalCountTarget }</Text>
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
