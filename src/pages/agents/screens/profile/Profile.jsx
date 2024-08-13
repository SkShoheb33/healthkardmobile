import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import Navbar from '../../../../components/Navbar'
import logo from '../../../../assets/Logo.png'
import { styles } from '../../../../styles/style'
function Profile() {
    return (
        <View style={{ flex: 1 }} >
            <Navbar />
            <ScrollView style={{ flex: 1 }} className='p-4'>
                <Header />
                <View className='my-4 flex-row justify-between'>
                    <View className='w-[45%] p-2 flex-col items-center justify-center border border-gray-300 shadow-md rounded-md'>
                        <Text className='text-center text-black font-bold text-xl'>Total Hospitals Onboarded</Text>
                        <Text style={styles.greenText} className='text-2xl font-bold'>5</Text>
                    </View>
                    <View className='w-[45%] p-2 flex-col items-center justify-center border border-gray-300 shadow-md rounded-md'>
                        <Text className='text-center text-black font-bold text-xl'>Total Users Onboarded</Text>
                        <Text style={styles.greenText} className='text-2xl font-bold'>20</Text>
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
        <View className='border border-gray-300 shadow-md p-2 rounded-md flex-row items-center'>
            <View className='w-1/3'>
                <Image source={logo} />
            </View>
            <View className='w-2/3'>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md'>Name : </Text>
                    <Text className='text-md'>Agent name</Text>
                </View>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md'>AgentId : </Text>
                    <Text className='text-md'>Agent id</Text>
                </View>
                <View className='flex-row items-center p-1'>
                    <Text className='font-semibold text-md'>Email : </Text>
                    <Text className='text-md'>Agent email</Text>
                </View>
            </View>
        </View>
    )
}

function JoiningPanel() {
    const [isUsersPane, setIsUsersPane] = useState(true);
    const [usersAdded] = useState([
        { date: '10 may 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '10 june 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '10 june 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '9 june 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '10 july 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '9 july 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '8 july 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '9 august 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '8 august 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
        { date: '15 july 2024', users: ['HK243702334', 'HK243702335'] },
        { date: '1 july 2024', users: ['HK243702336'] },
        { date: '5 june 2024', users: ['HK243702337', 'HK243702338', 'HK243702339'] },
        { date: '20 august 2024', users: ['HK243702340'] },
        { date: '18 august 2024', users: ['HK243702341', 'HK243702342'] },
        { date: '12 september 2024', users: ['HK243702343', 'HK243702344'] },
        { date: '25 september 2024', users: ['HK243702345'] },
        { date: '10 october 2024', users: ['HK243702346', 'HK243702347', 'HK243702348'] },
        { date: '1 november 2024', users: ['HK243702349'] },
        { date: '22 november 2024', users: ['HK243702350', 'HK243702351'] },
        { date: '15 december 2024', users: ['HK243702352'] },
        { date: '30 december 2024', users: ['HK243702353', 'HK243702354', 'HK243702355'] },
    ]);
    const [hospitalsAdded] = useState([
        { date: '10 july 2024', hospitals: ['HH242242134', 'HH242242134', 'HH242242134'] },
        { date: '9 july 2024', hospitals: ['HH242242134', 'HH242242134', 'HH242242134'] },
        { date: '8 july 2024', hospitals: ['HH242242134', 'HH242242134', 'HH242242134'] },
        { date: '5 june 2024', hospitals: ['HH242242135', 'HH242242136'] },
        { date: '1 june 2024', hospitals: ['HH242242137'] },
        { date: '15 july 2024', hospitals: ['HH242242138', 'HH242242139'] },
        { date: '20 august 2024', hospitals: ['HH242242140'] },
        { date: '18 august 2024', hospitals: ['HH242242141', 'HH242242142'] },
        { date: '12 september 2024', hospitals: ['HH242242143', 'HH242242144'] },
        { date: '25 september 2024', hospitals: ['HH242242145'] },
        { date: '10 october 2024', hospitals: ['HH242242146', 'HH242242147', 'HH242242148'] },
        { date: '1 november 2024', hospitals: ['HH242242149'] },
        { date: '22 november 2024', hospitals: ['HH242242150', 'HH242242151'] },
        { date: '15 december 2024', hospitals: ['HH242242152'] },
        { date: '30 december 2024', hospitals: ['HH242242153', 'HH242242154', 'HH242242155'] },
    ]);

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
            if(isUsersPane){
                userCountByYearAndMonth[year][month] += entry.users.length;
            }else{
                userCountByYearAndMonth[year][month] += entry.hospitals.length;
            }
        });

        return userCountByYearAndMonth;
    };

    const [counts, setCounts] = useState({});
    useEffect(() => {
        if(isUsersPane){
            const usersCount = countByYearAndMonth(usersAdded, isUsersPane);
            setCounts(usersCount);
        }else{
            const hospitalCounts = countByYearAndMonth(hospitalsAdded, isUsersPane);
            setCounts(hospitalCounts);
        }
    }, [usersAdded, isUsersPane]);

    return (
        <View>
            <View className='flex-row'>
                <TouchableOpacity onPress={() => setIsUsersPane(true)} className={`h-9 w-24 rounded-md mr-4 justify-center items-center ${isUsersPane ? 'bg-[#303486]' : 'border border-[#303486]'}`}>
                    <Text className={`${isUsersPane ? 'text-white' : 'text-[#303486]'}`}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsUsersPane(false)} className={`h-9 w-24 rounded-md mr-4 justify-center items-center ${!isUsersPane ? 'bg-[#303486]' : 'border border-[#303486]'}`}>
                    <Text className={`${!isUsersPane ? 'text-white' : 'text-[#303486]'}`}>Hospitals</Text>
                </TouchableOpacity>
            </View>
            <View className='my-4 flex-row items-center'>
                <Text className='text-xl'>Year</Text>
                <Text className='text-xl mx-5'>2024</Text>
            </View>
            <View className='flex-row flex-wrap'>
                {counts[2024] && Object.keys(counts[2024]).map(month => (
                    <View key={month} className='w-1/5 justify-around m-2 items-center border border-gray-300 rounded-md'>
                        <Text style={styles.blue} className='text-white w-full text-center'>{month.length>5?month.slice(0,4)+'...':month}</Text>
                        <Text style={styles.greenText} className='my-2 text-xl shadow'>{counts[2024][month]}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

