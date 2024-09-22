import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Navbar from '@components/Navbar'
import logo from 'src/assets/Logo.png'
import { styles } from 'src/styles/style'
import { getYears } from './constants'
import Select from '@components/Select'
import httpService from 'src/httpService'
import { countByYearAndMonth, formatCurrency, formatData } from 'src/helpers/formatData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '@components/Button'

function Profile() {
    const navigation = useNavigation();
    const [agentData, setAgentData] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false);

    const [totalAddons, setTotalAddons] = useState([
        { label: 'Total Hospitals Onboarded', value: 0 },
        { label: 'Total Users Onboarded', value: 0 },
    ]);

    useEffect(() => {
        const fetchAgentData = async () => {
            const agentToken = await AsyncStorage.getItem('agentToken');
            const result = await httpService.get(`agents/${agentToken}`);
            setAgentData(result);
            setTotalAddons([
                { label: 'Total Hospitals Onboarded', value: result.hospitalsAdded.length },
                { label: 'Total Revenue', value: result.usersAdded.reduce((total, user) => total + user.amount, 0) },
            ]);
        };
        fetchAgentData();
    }, []);

    const handleLogout = () => {
        AsyncStorage.removeItem('agentToken');
        AsyncStorage.removeItem('agentName');
        AsyncStorage.removeItem('agentId');
        setLoggingOut(true);
        setTimeout(() => {
            setLoggingOut(false);
            navigation.navigate('First');
        }, 2000);
    };

    return (
        <View style={ { flex: 1 } } className='bg-white' >
            <Navbar color='blue' />
            <ScrollView style={ { flex: 1 } } className='p-4'>
                <Header name={ agentData?.name } email={ agentData?.email } agentId={ agentData?.agentID } />
                <View className='my-4 flex-row justify-between'>
                    { totalAddons.map((addon, index) => (
                        <View key={ index } className='w-[45%] p-2 flex-col items-center justify-center border border-gray-300 shadow-md rounded-md'>
                            <Text className='text-center text-black font-semibold text-lg'>{ addon.label }</Text>
                            <Text style={ styles.greenText } className='text-2xl font-bold'>{ formatCurrency(addon.value, index === 1) }</Text>
                        </View>
                    )) }
                </View>
                { agentData?.usersAdded && agentData?.hospitalsAdded && <CalenderPanel usersAdded={ agentData?.usersAdded } hospitalsAdded={ agentData?.hospitalsAdded } /> }

                <Button
                    label='Logout'
                    onPress={ handleLogout }
                    color='red'
                    loading={ loggingOut }
                />
            </ScrollView>
        </View>
    )
}

export default Profile

function Header({ name = 'Agent name', email = 'Agent email', agentId = 'Agent id' }) {
    return (
        <View className='border border-gray-300 shadow-md p-2 rounded-md flex-row items-center bg-white'>
            <View className='w-1/3 p-2'>
                <Image source={ logo } />
            </View>
            <View className='w-2/3'>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md text-black'>Name : </Text>
                    <Text className='text-md text-black'>{ name }</Text>
                </View>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md text-black'>AgentId : </Text>
                    <Text className='text-md text-black'>{ agentId }</Text>
                </View>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md text-black'>Email : </Text>
                    <Text className='text-md text-black'>{ email }</Text>
                </View>
            </View>
        </View>
    )
}

function CalenderPanel({ usersAdded, hospitalsAdded }) {
    const [isUsersPane, setIsUsersPane] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);
    const [counts, setCounts] = useState({});
    useEffect(() => {
        if (isUsersPane) {
            const usersCount = countByYearAndMonth(formatData(usersAdded, 'amount') || {}, true);
            const range = getYears(usersCount);
            setYears(range);
            setCounts(usersCount);
        } else {
            const hospitalCounts = countByYearAndMonth(formatData(hospitalsAdded, 'hospitalId') || {}, false);
            const range = getYears(hospitalCounts);
            setYears(range);
            setCounts(hospitalCounts);
        }

    }, [usersAdded, isUsersPane]);

    if (!usersAdded || !hospitalsAdded) {
        return <Text>Loading...</Text>
    }

    return (
        <View>
            <View className='flex-row'>
                <TouchableOpacity onPress={ () => setIsUsersPane(true) } className={ `h-9 w-24 rounded-md mr-4 justify-center items-center ${isUsersPane ? 'bg-[#303486]' : 'border border-[#303486]'}` }>
                    <Text className={ `${isUsersPane ? 'text-white' : 'text-[#303486]'}` }>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => setIsUsersPane(false) } className={ `h-9 w-24 rounded-md mr-4 justify-center items-center ${!isUsersPane ? 'bg-[#303486]' : 'border border-[#303486]'}` }>
                    <Text className={ `${!isUsersPane ? 'text-white' : 'text-[#303486]'}` }>Hospitals</Text>
                </TouchableOpacity>
            </View>
            <View className='my-4 flex-row items-center w-full'>
                <Select placeholder={ { label: 'Choose year', value: year } } selectedValue={ year } setSelectedValue={ setYear } options={ years } />
            </View>
            <View className='flex-row flex-wrap'>
                { counts[year] && Object.keys(counts[year]).map(month => (
                    <View key={ month } className='w-1/5 justify-around m-2 items-center border border-gray-300 rounded-md'>
                        <Text style={ styles.blue } className='text-white w-full text-center'>{ month }</Text>
                        <Text style={ styles.greenText } className='my-2 text-xs shadow'>{ isUsersPane ? formatCurrency(counts[year][month]) : counts[year][month] }</Text>
                    </View>
                )) }
            </View>
        </View>
    );
}

