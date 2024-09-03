import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { styles } from 'src/styles/style'
import refer from 'src/assets/PNG/refer.png'
import Organs from './components/Organs'
import Advertisements from './components/Advertisements'
import HospitalCard from '../hospitals/components/HospitalCard'
import Heading from '@components/Heading'
import Button from '@components/Button'
import httpService from 'src/httpService'
import Navbar from './components/Navbar'
import { images, ads } from './constants'

function Home() {
    const [hospitals, setHospitals] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpService.get('hospitals');
                setHospitals(result);
            } catch (err) {
                console.log({ err });
            }
        };
        fetchData();
    }, []);

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
                    <Organs images={ images } />
                    <Heading label='Advertisement' size='text-md' />
                    <Advertisements ads={ ads } />
                    <Heading label="Top Picks for You" size='text-xl' />
                    <ScrollView horizontal className='w-full p-2'>
                        { hospitals.slice(0, 3).map((hospital, index) => (
                            <HospitalCard
                                key={ index }
                                hospital={ hospital }
                                horizontal={ true }
                            />
                        )) }
                    </ScrollView>
                    <Button label='Explore All' color={ styles.blue } style='w-11/12 p-4 mx-auto' onPress={ () => navigation.navigate('HospitalsNavigation') } />
                </View>
            </ScrollView>
        </View>
    );
}

export default Home;