import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import HospitalCard from './components/HospitalCard';
import Heading from '@components/Heading';
import httpService from 'src/httpService';
import Loading from '@components/Loading';
import Navbar from '@components/Navbar';
import Header from './components/Header';

function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);
    const [location, setLocation] = useState('Narasaraopet');

    const onSearch = (hospitalName) => {
        const filteredHospitals = hospitals.filter(hospital => hospital.hospitalDetails.hospitalTradeName.toLowerCase().includes(hospitalName.toLowerCase()))
        setFilteredHospitals(filteredHospitals)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoadingStatus(true);
            try {
                const result = await httpService.get('hospitals');
                setHospitals(result);
                setFilteredHospitals(result);
            } catch (err) {
                console.log({ err });
            } finally {
                setLoadingStatus(false);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <Header location={ location } setLocation={ setLocation } onSearch={ onSearch } />
            <ScrollView style={ { flex: 1 } } contentContainerStyle={ { padding: 8 } }>
                <Heading
                    label={ `Top pick’s in ${location}` }
                    size='text-xl'
                />
                { !isLoading ? (
                    <View style={ { flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 24 } } className="justify-between">
                        { filteredHospitals.map((hospital, index) => (
                            <HospitalCard
                                key={ index }
                                hospital={ hospital }
                            />
                        )) }
                    </View>
                ) : (
                    <Loading isLoading={ isLoading } />
                ) }
            </ScrollView>
        </View>
    );
}

export default Hospitals;
