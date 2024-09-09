import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import HospitalCard from './components/HospitalCard';
import Heading from '@components/Heading';
import httpService from 'src/httpService';
import Loading from '@components/Loading';
import Navbar from '@components/Navbar';
import Header from './components/Header';

function Hospitals() {
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

    const filterHospitals = useCallback((hospitals, searchTerm, city) => {
        return hospitals.filter(hospital =>
            hospital.hospitalDetails.hospitalTradeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            hospital.hospitalDetails.address.city.toLowerCase().includes(city.toLowerCase())
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

    const onSearch = useCallback(async (hospitalName) => {
        setSearchTerm(hospitalName);
        const allHospitals = await fetchAllHospitals();
        const filtered = filterHospitals(allHospitals, hospitalName, location);
        setFilteredHospitals(filtered);
        setHasMore(false); // Disable infinite scrolling when filtering
    }, [location, filterHospitals, fetchAllHospitals]);

    const onLocationChange = useCallback(async (newLocation) => {
        setLocation(newLocation);
        const allHospitals = await fetchAllHospitals();
        const filtered = filterHospitals(allHospitals, searchTerm, newLocation);
        setFilteredHospitals(filtered);
        setHasMore(false); // Disable infinite scrolling when filtering
    }, [searchTerm, filterHospitals, fetchAllHospitals]);

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
            const filtered = filterHospitals(newHospitals, searchTerm, location);
            setFilteredHospitals(filtered);
            setHasMore(result.currentPage < result.totalPages);
        } catch (err) {
            console.log({ err });
        } finally {
            setLoadingStatus(false);
        }
    }, [hasMore, isLoading, hospitalData.currentPage, location, searchTerm, filterHospitals]);

    useEffect(() => {
        fetchHospitals();
    }, []);

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
            <Header location={ location } setLocation={ onLocationChange } onSearch={ onSearch } />
            <FlatList
                data={ filteredHospitals }
                renderItem={ renderHospitalCard }
                keyExtractor={ (item, index) => index.toString() }
                numColumns={ 2 }
                contentContainerStyle={ { padding: 8 } }
                ListHeaderComponent={
                    <Heading
                        label={ `Top pick's in ${location}` }
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
