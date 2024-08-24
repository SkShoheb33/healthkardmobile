import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import HospitalCard from './components/HospitalCard';
import Heading from '../../../components/Heading';
import httpService from '../../../httpService';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar';

function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingStatus(true);
            try {
                const result = await httpService.get('hospitals');
                setHospitals(result);
            } catch (err) {
                console.log({ err });
            } finally {
                setLoadingStatus(false);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 8 }}>
                <Heading
                    label="Top pick’s in Narasaraopet"
                    size='text-xl'
                />
                {!isLoading ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 24 }}>
                        {hospitals.map((hospital, index) => (
                            <HospitalCard
                                key={index}
                                hospital={hospital}
                            />
                        ))}
                    </View>
                ) : (
                    <Loading isLoading={isLoading} />
                )}
            </ScrollView>
        </View>
    );
}

export default Hospitals;
