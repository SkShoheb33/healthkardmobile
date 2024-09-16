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
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);
    const [location, setLocation] = useState('Narasaraopet');
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const ITEMS_PER_PAGE = 10;

    const filterHospitals = useCallback((hospitals, searchTerm, city, service) => {
        return hospitals.filter(hospital =>
            hospital.hospitalDetails.hospitalTradeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            hospital.hospitalDetails.address.city.toLowerCase().includes(city.toLowerCase()) &&
            (service ? hospital.hospitalDetails.servicesOffered.includes(service) || service === "All Services" : true)
        );
    }, []);

    const fetchAllHospitals = useCallback(async () => {
        setLoadingStatus(true);
        try {
            const result = await httpService.get(`hospitals?page=1&limit=${Number.MAX_SAFE_INTEGER}`);
            setHospitalData({
                hospitals: result.hospitals,
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalHospitals: result.totalHospitals
            });
            return result.hospitals;
        } catch (err) {
            console.log({ err });
            return [];
        } finally {
            setLoadingStatus(false);
        }
    }, []);

    const updateFilteredHospitals = useCallback(async () => {
        const allHospitals = await fetchAllHospitals();
        const filtered = filterHospitals(allHospitals, searchTerm, location, userService);
        setFilteredHospitals(filtered);
        setHasMore(false);
    }, [fetchAllHospitals, filterHospitals, searchTerm, location, userService]);

    const onSearch = useCallback((hospitalName) => {
        setSearchTerm(hospitalName);
        updateFilteredHospitals();
    }, [updateFilteredHospitals]);

    const onLocationChange = useCallback((newLocation) => {
        setLocation(newLocation);
        updateFilteredHospitals();
    }, [updateFilteredHospitals]);

    const fetchHospitals = useCallback(async () => {
        if (!hasMore || isLoading) return;

        setLoadingStatus(true);
        try {
            const result = await httpService.get(`hospitals?page=${hospitalData.currentPage + 1}&limit=${ITEMS_PER_PAGE}`);
            const newHospitals = [...hospitalData.hospitals, ...result.hospitals];
            setHospitalData(prevData => ({
                ...prevData,
                hospitals: newHospitals,
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalHospitals: result.totalHospitals
            }));
            const filtered = filterHospitals(newHospitals, searchTerm, location, userService);
            setFilteredHospitals(filtered);
            setHasMore(result.currentPage < result.totalPages);
        } catch (err) {
            console.log({ err });
        } finally {
            setLoadingStatus(false);
        }
    }, [hasMore, isLoading, hospitalData.currentPage, location, searchTerm, filterHospitals, userService]);

    useEffect(() => {
        fetchHospitals();
    }, []);

    useEffect(() => {
        updateFilteredHospitals();
    }, [userService, updateFilteredHospitals]);

    const renderHospitalCard = ({ item }) => (
        <HospitalCard hospital={ item } />
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return <Loading isLoading={ true } />;
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
                data={ filteredHospitals }
                renderItem={ renderHospitalCard }
                keyExtractor={ (item, index) => index.toString() }
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
                onEndReached={ fetchHospitals }
                onEndReachedThreshold={ 0.1 }
                ListFooterComponent={ renderFooter }
            />
        </View>
    );
}

export default Hospitals;
