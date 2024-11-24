import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Heading from '@components/Heading';
import Navbar from '@components/Navbar';
import { faChevronRight, faCalendar, faScroll, faComments, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native'
import Header from './components/Header';
import httpService from 'src/httpService';
import DropDown from '@components/DropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShimmerContainer from '@components/ShimmerContainer';
import Button from '@components/Button';

function Profile() {
    const [healthId, setHealthId] = useState('');
    const [profile, setProfile] = useState({});
    const [healthIds, setHealthIds] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const navigation = useNavigation();
    const [userNumber, setUserNumber] = useState('');

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: 'First' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoggingOut(false);
        }
    };

    useEffect(() => {
        const fetchHealthIds = async () => {
            setLoadingStatus(true);
            try {
                const userNumber = await AsyncStorage.getItem('userNumber');
                setUserNumber(userNumber)
                if (!userNumber) {
                    console.error('User number not found in AsyncStorage');
                    return;
                }
                const result = await httpService.get('users', `?number=91${userNumber}`);
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
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar />
            <ScrollView className='flex-1 p-2'>
                <View className='w-full'>
                    <DropDown
                        style={ { width: '100%' } }
                        list={ healthIds }
                        setValue={ setHealthId }
                        value={ healthId }
                    />
                </View>
                { !isLoading && profile ? (
                    <Header
                        healthId={ healthId }
                        image={ profile.image }
                        name={ profile.name }
                        validity={ profile.expireDate }
                        number={ userNumber }
                    />
                ) : <ShimmerContainer isVisible={ !isLoading && profile } style={ { width: '90%', height: 120, alignSelf: 'center' } } >
                </ShimmerContainer> }
                <Heading label="Others" />
                <Services profile={ profile } />
                <View className="w-full mx-auto mt-4">
                    <Button onPress={ handleLogout } label='Logout' color='red' icon={ faSignOutAlt } loading={ loggingOut } />
                </View>
            </ScrollView>
        </View>
    );
}

function Services({ profile }) {
    return (
        <View style={ { width: '100%', marginHorizontal: 'auto' } }>
            <ServiceItem
                icon={ faCalendar }
                label="Renewal history"
                navigateTo='RenewalHistory'
                payments={ profile.payments }
            />
            <ServiceItem
                icon={ faComments }
                label="Help and Feedback"
                navigateTo='Feedback'
            />
            <ServiceItem
                icon={ faScroll }
                label="Terms and conditions"
                navigateTo='TermsAndCondition'
            />
        </View>
    );
}

function ServiceItem({ icon, label, navigateTo, payments }) {
    const navigation = useNavigation()
    const navigate = () => {
        if (navigateTo === 'RenewalHistory') {
            navigation.navigate(navigateTo, { payments: payments })
        } else {
            navigation.navigate(navigateTo)
        }
    }
    return (
        <TouchableOpacity onPress={ navigate } style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#ccc', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginVertical: 4 } }>
            <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                <View className=' p-2 rounded-full'>
                    <FontAwesomeIcon icon={ icon } size={ 24 } />
                </View>
                <Heading label={ label } size='text-xl' style={ { marginLeft: 8 } } />
            </View>
            <FontAwesomeIcon icon={ faChevronRight } size={ 16 } />
        </TouchableOpacity>
    );
}

export default Profile;
