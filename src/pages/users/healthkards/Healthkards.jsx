import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import Ad1 from '../../../assets/PNG/AD1.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import httpService from '../../../httpService';
import HealthkardList from './components/HealthkardList';
import Navbar from '@components/Navbar';

function Healthkards() {
    const [kards, setKards] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await httpService.get('users', `?number=${'917842722245'}`);
                setKards(result);
            } catch (err) {
                console.log({ err });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar />

            <View style={ { flex: 1 } } className='p-2 bg-white'>
                <Image
                    source={ Ad1 }
                    className='mx-auto'
                />

                <View className='border my-4 rounded-md flex flex-row items-center'>
                    <View className='p-2'>
                        <FontAwesomeIcon icon={ faSearch } />
                    </View>
                    <TextInput
                        className='p-2'
                        placeholder='Search your healthkard'
                    />
                </View>

                <View className='shadow-xl absolute bottom-10 right-10 bg-[#303486] py-2 px-4 rounded-md z-10 flex flex-row items-center'>
                    <FontAwesomeIcon icon={ faAdd } color='white' />
                    <Pressable onPress={ () => navigation.navigate("NewKard") }>
                        <Text className='text-white mx-2'>Add</Text>
                    </Pressable>
                </View>

                { loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <HealthkardList kards={ kards } />
                ) }
            </View>
        </View>
    );
}

export default Healthkards;
