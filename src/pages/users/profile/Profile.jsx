import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import Heading from '../../../components/Heading';
import Navbar from '../../../components/Navbar';
import { faChevronRight, faCalendar, faScroll, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Header from './components/Header';
import httpService from '../../../httpService';
import DropDown from '../../../components/DropDown';

function Profile() {
    const [healthId, setHealthId] = useState('');
    const [profile, setProfile] = useState({});
    const [healthIds, setHealthIds] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);

    useEffect(() => {
        const fetchHealthIds = async () => {
            setLoadingStatus(true);
            try {
                const result = await httpService.get('users', `?number=917842722245`);
                setHealthIds(result);
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
                    setProfile(result[0]);
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
        <ScrollView style={{ flex: 1 }}>
            <Navbar />
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                    <DropDown
                        healthIds={healthIds}
                        setHealthId={setHealthId}
                        healthId={healthId}
                    />
                </View>
                {!isLoading && profile && (
                    <Header
                        image={profile.image}
                        name={profile.name}
                        gender={profile.gender}
                        age={profile.age}
                    />
                )}
                <Heading label="Others" />
                <Services />
            </View>
        </ScrollView>
    );
}

function Services() {
    return (
        <View style={{ width: '91%', marginHorizontal: 'auto' }}>
            <ServiceItem
                icon={faCalendar}
                label="Renewal history"
            />
            <ServiceItem
                icon={faComments}
                label="Help and Feedback"
            />
            <ServiceItem
                icon={faScroll}
                label="Terms and conditions"
            />
        </View>
    );
}

function ServiceItem({ icon, label }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#ccc', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginVertical: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesomeIcon icon={icon} size={24} />
                <Heading label={label} size='text-xl' style={{ marginLeft: 8 }} />
            </View>
            <FontAwesomeIcon icon={faChevronRight} size={24} />
        </View>
    );
}

export default Profile;
