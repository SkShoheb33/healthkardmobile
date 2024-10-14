import React, { useEffect, useState, useCallback } from 'react'
import { Image, ScrollView, Text, View, BackHandler, Dimensions, RefreshControl } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from 'src/styles/style'
import Organs from './components/Organs'
import HospitalCard from '../hospitals/components/HospitalCard'
import Heading from '@components/Heading'
import Button from '@components/Button'
import httpService from 'src/httpService'
import Navbar from '@components/Navbar'
import { images, ads, banner } from './constants'
import ShimmerContainer from '@components/ShimmerContainer';
import Curosols from '@components/Curosols';

function Home() {
    const screenWidth = Dimensions.get('window').width;
    const [hospitalData, setHospitalData] = useState({
        hospitals: [],
        currentPage: 0,
        totalPages: 0,
        totalHospitals: 0
    });

    const [bannerLoading, setBannerLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();
    const ITEMS_PER_PAGE = 10;

    const fetchData = async () => {
        try {
            const result = await httpService.get(`hospitals?page=${1}&limit=${ITEMS_PER_PAGE}`);
            setHospitalData(result);
        } catch (err) {
            console.log({ err });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                BackHandler.exitApp();
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <ScrollView
                style={ { flex: 1 } }
                className='flex-1 p-1'
                refreshControl={
                    <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                }
            >
                <Heading label="Welcome to Healthkard !!" size='text-xl mx-2' />
                <ShimmerContainer
                    isVisible={ bannerLoading }
                    style={ { width: screenWidth, height: 140, alignSelf: 'center' } }
                >
                    <Image
                        source={ { uri: banner } }
                        style={ { width: '100%', height: '100%', alignSelf: 'center' } }
                        resizeMode='contain'
                        onLoad={ () => setBannerLoading(true) }
                    />
                </ShimmerContainer>
                <View className=''>
                    <Heading label="What are you Looking for?" size='text-xl mx-2' />
                    <Organs images={ images } />
                    <Heading label='Advertisement' size='text-md mx-2' />
                    <Curosols list={ ads } time={ 3000 } />
                    <Heading label="Top Picks for You" size='text-xl mx-2' />
                    <ScrollView horizontal className='w-full p-2'>
                        { hospitalData.hospitals.length > 0 ? (
                            hospitalData.hospitals.slice(0, 3).map((hospital, index) => (
                                <HospitalCard
                                    key={ index }
                                    hospital={ hospital }
                                    horizontal={ true }
                                />
                            ))
                        ) : (
                            <Text>No hospitals available</Text>
                        ) }
                    </ScrollView>
                    <Button label='Explore All' color={ styles.blue } style='w-11/12 p-4 mx-auto' onPress={ () => navigation.navigate('HospitalsNavigation') } />
                </View>
            </ScrollView>
        </View>
    );
}

export default Home;