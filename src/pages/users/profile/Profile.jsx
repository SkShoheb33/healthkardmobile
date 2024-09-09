import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Heading from '@components/Heading';
import Navbar from '@components/Navbar';
import { faChevronRight, faCalendar, faScroll, faComments, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native'
import Header from './components/Header';
import httpService from 'src/httpService';
import DropDown from '@components/DropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
    const [healthId, setHealthId] = useState('');
    const [profile, setProfile] = useState({});
    const [healthIds, setHealthIds] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);
    const [usersData, setUsersData] = useState({
        users: [],
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0
    });
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            navigation.reset({
                index: 0,
                routes: [{ name: 'First' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        const fetchHealthIds = async () => {
            setLoadingStatus(true);
            try {
                const result = await httpService.get('users', `?number=917842722245`);
                setUsersData(result);
                const healthIds = result.users.map(item => ({ name: item.name, value: item.healthId }));
                setHealthId(healthIds[0]?.value || '');
                setHealthIds(healthIds);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingStatus(false);
            }
        };

        fetchHealthIds();
    }, []);

    useEffect(() => {
        if (healthId) {
            const fetchProfile = async () => {
                setLoadingStatus(true);
                try {
                    const result = await httpService.get('users', `?healthId=${healthId}`);
                    setProfile(result.users[0] || {});
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoadingStatus(false);
                }
            };

            fetchProfile();
        }
    }, [healthId]);

    return (
        <ScrollView style={ { flex: 1 } } className='bg-white'>
            <Navbar />
            <View>
                <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 } }>
                    <DropDown
                        list={ healthIds }
                        setValue={ setHealthId }
                        value={ healthId }
                    />
                </View>
                { !isLoading && profile && (
                    <Header
                        healthId={ healthId }
                        image={ profile.image }
                        name={ profile.name }
                        gender={ profile.gender }
                        age={ profile.age }
                    />
                ) }
                <Heading label="Others" />
                <Services />
                <View className="w-11/12 mx-auto mt-4">
                    <TouchableOpacity
                        onPress={ handleLogout }
                        className="flex-row items-center justify-between bg-red-500 py-3 px-4 rounded-lg"
                    >
                        <View className="flex-row items-center">
                            <FontAwesomeIcon icon={ faSignOutAlt } size={ 24 } color="white" />
                            <Text className="text-white text-lg font-bold ml-2">Logout</Text>
                        </View>
                        <FontAwesomeIcon icon={ faChevronRight } size={ 24 } color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

function Services() {
    return (
        <View style={ { width: '91%', marginHorizontal: 'auto' } }>
            <ServiceItem
                icon={ faCalendar }
                label="Renewal history"
                navigateTo='RenewalHistory'
            />
            <ServiceItem
                icon={ faComments }
                label="Help and Feedback"
                navigateTo='RenewalHistory'
            />
            <ServiceItem
                icon={ faScroll }
                label="Terms and conditions"
                navigateTo='TermsAndCondition'
            />
        </View>
    );
}

function ServiceItem({ icon, label, navigateTo }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={ () => navigation.navigate(navigateTo) } style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#ccc', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginVertical: 4 } }>
            <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                <FontAwesomeIcon icon={ icon } size={ 24 } />
                <Heading label={ label } size='text-xl' style={ { marginLeft: 8 } } />
            </View>
            <FontAwesomeIcon icon={ faChevronRight } size={ 24 } />
        </TouchableOpacity>
    );
}

export default Profile;
