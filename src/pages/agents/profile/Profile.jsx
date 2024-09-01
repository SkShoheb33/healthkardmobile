import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import Navbar from '@components/Navbar'
import logo from 'src/assets/Logo.png'
import { styles } from 'src/styles/style'
import { getYears, hospitalsAdded, usersAdded } from './constants'
import Select from '@components/Select'
function Profile() {
    return (
        <View style={ { flex: 1 } } className='bg-white' >
            <Navbar />
            <ScrollView style={ { flex: 1 } } className='p-4'>
                <Header />
                <View className='my-4 flex-row justify-between'>
                    <View className='w-[45%] p-2 flex-col items-center justify-center border border-gray-300 shadow-md rounded-md'>
                        <Text className='text-center text-black font-bold text-xl'>Total Hospitals Onboarded</Text>
                        <Text style={ styles.greenText } className='text-2xl font-bold'>5</Text>
                    </View>
                    <View className='w-[45%] p-2 flex-col items-center justify-center border border-gray-300 shadow-md rounded-md'>
                        <Text className='text-center text-black font-bold text-xl'>Total Users Onboarded</Text>
                        <Text style={ styles.greenText } className='text-2xl font-bold'>20</Text>
                    </View>
                </View>
                <JoiningPanel />
            </ScrollView>
        </View>
    )
}

export default Profile

function Header() {
    return (
        <View className='border border-gray-300 shadow-md p-2 rounded-md flex-row items-center bg-white'>
            <View className='w-1/3 p-2'>
                <Image source={ logo } />
                <TouchableOpacity className='w-full' style={ { width: 70, } }>
                    <Text style={ styles.blueText } className='text-xs w-full text-center'>Edit profile</Text>
                </TouchableOpacity>
            </View>
            <View className='w-2/3'>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md text-black'>Name : </Text>
                    <Text className='text-md text-black'>Agent name</Text>
                </View>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md text-black'>AgentId : </Text>
                    <Text className='text-md text-black'>Agent id</Text>
                </View>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md text-black'>Email : </Text>
                    <Text className='text-md text-black'>Agent email</Text>
                </View>
            </View>
        </View>
    )
}

function JoiningPanel() {
    const [isUsersPane, setIsUsersPane] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);
    const countByYearAndMonth = (data, isUsersPane) => {
        const userCountByYearAndMonth = {};

        data.forEach(entry => {
            const [day, month, year] = entry.date.split(' ');
            if (!userCountByYearAndMonth[year]) {
                userCountByYearAndMonth[year] = {};
            }
            if (!userCountByYearAndMonth[year][month]) {
                userCountByYearAndMonth[year][month] = 0;
            }
            if (isUsersPane) {
                userCountByYearAndMonth[year][month] += entry.users.length;
            } else {
                userCountByYearAndMonth[year][month] += entry.hospitals.length;
            }
        });
        return userCountByYearAndMonth;
    };

    const [counts, setCounts] = useState({});
    useEffect(() => {
        if (isUsersPane) {
            const usersCount = countByYearAndMonth(usersAdded, isUsersPane);
            const range = getYears(usersCount);
            setYears(range);
            setCounts(usersCount);
        } else {
            const hospitalCounts = countByYearAndMonth(hospitalsAdded, isUsersPane);
            const range = getYears(hospitalCounts);
            setYears(range);
            setCounts(hospitalCounts);
        }

    }, [usersAdded, isUsersPane]);

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
                        <Text style={ styles.blue } className='text-white w-full text-center'>{ month.length > 5 ? month.slice(0, 4) + '...' : month }</Text>
                        <Text style={ styles.greenText } className='my-2 text-xl shadow'>{ counts[year][month] }</Text>
                    </View>
                )) }
            </View>
        </View>
    );
}

