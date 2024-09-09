import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View, BackHandler } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from 'src/styles/style'
import refer from 'src/assets/PNG/refer.png'
import Organs from './components/Organs'
import Advertisements from './components/Advertisements'
import HospitalCard from '../hospitals/components/HospitalCard'
import Heading from '@components/Heading'
import Button from '@components/Button'
import httpService from 'src/httpService'
import Navbar from '@components/Navbar'
import { images, ads } from './constants'

function Home() {
    const [hospitalData, setHospitalData] = useState({
        hospitals: [],
        currentPage: 0,
        totalPages: 0,
        totalHospitals: 0
    });
    const navigation = useNavigation();
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpService.get(`hospitals?page=${1}&limit=${ITEMS_PER_PAGE}`);
                setHospitalData(result);
            } catch (err) {
                console.log({ err });
            }
        };
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                // Exit the app when back is pressed
                BackHandler.exitApp();
                return true; // Prevent default behavior
            };

            // Add event listener for hardware back press
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                // Remove the event listener on unmount
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <ScrollView style={ { flex: 1 } }>
                <Heading label="Refer and Earn Health Coins" size='text-xl' />
                <Image
                    source={ refer }
                    className=' my-2 w-11/12 mx-auto'
                />
                <View className=''>
                    <Text className='font-semibold text-xl p-4 text-black'>
                        What are you Looking for?
                    </Text>
                    <Organs images={ images } onClick={ (image) => navigation.navigate('HospitalsNavigation', { image }) } />

                    <Heading label='Advertisement' size='text-md' />
                    <Advertisements ads={ ads } />
                    <Heading label="Top Picks for You" size='text-xl' />
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