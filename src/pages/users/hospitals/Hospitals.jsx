import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import HospitalCard from './components/HospitalCard';
import Heading from '@components/Heading';
import httpService from 'src/httpService';
import Loading from '@components/Loading';
import Navbar from '@components/Navbar';
import Header from './components/Header';
import { useUserSharedData } from 'src/context/UserSharedDataContext';

function Hospitals() {
    const { userData } = useUserSharedData();
    const userService = userData.service;

    const [hospitalData, setHospitalData] = useState({
        hospitals: [],
        currentPage: 0,
        totalPages: 0,
        totalHospitals: 0
    });
    const [isLoading, setLoadingStatus] = useState(false);
    const [location, setLocation] = useState('All cities');
    const [searchTerm, setSearchTerm] = useState('');
    const ITEMS_PER_PAGE = 10;

    const fetchHospitals = useCallback(async (page = 1, refresh = false) => {
        if (searchTerm !== '') {
            return;
        }
        setLoadingStatus(true);
        try {
            const url = `hospitals?page=${page}&limit=${ITEMS_PER_PAGE}${userService ? `&service=${userService}` : ''}${location !== 'All cities' ? `&city=${location}` : ''}${searchTerm ? `&search=${searchTerm}` : ''}`;
            const result = await httpService.get(url);
            setHospitalData(prevData => ({
                hospitals: refresh ? result.hospitals : [...prevData.hospitals, ...result.hospitals],
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalHospitals: result.totalHospitals
            }));
        } catch (err) {
            console.log({ err });
        } finally {
            setLoadingStatus(false);
        }
    }, [location, searchTerm, userService]);

    const onSearch = useCallback((hospitalName) => {
        setHospitalData(prevData => ({
            ...prevData,
            hospitals: prevData.hospitals.filter(hospital => hospital?.hospitalDetails?.hospitalLegalName.toLowerCase().includes(hospitalName.toLowerCase())),
        }));
        setSearchTerm(hospitalName);
    }, []);

    const onLocationChange = useCallback((newLocation) => {
        setLocation(newLocation);
    }, []);

    useEffect(() => {
        fetchHospitals(1, true);
    }, [fetchHospitals]);

    const renderHospitalCard = ({ item }) => (
        <HospitalCard hospital={ item } />
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return <Loading isLoading={ true } />;
    };

    const loadMore = () => {
        if (hospitalData.currentPage < hospitalData.totalPages && !isLoading) {
            fetchHospitals(hospitalData.currentPage + 1);
        }
    };

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar />
            <Header
                location={ location }
                setLocation={ onLocationChange }
                onSearch={ onSearch }
            />
            <FlatList
                data={ hospitalData.hospitals }
                renderItem={ renderHospitalCard }
                keyExtractor={ (item) => item._id.toString() }
                numColumns={ 2 }
                contentContainerStyle={ { padding: 8 } }
                ListHeaderComponent={
                    <Heading
                        label={ userService
                            ? `Top pick's in ${location} for ${userService}`
                            : `Top pick's in ${location}` }
                        size='text-xl'
                    />
                }
                onEndReached={ loadMore }
                onEndReachedThreshold={ 0.1 }
                ListFooterComponent={ renderFooter }
            />
        </View>
    );
}

export default Hospitals;
