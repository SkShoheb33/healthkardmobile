import React, { useEffect, useState, useCallback } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import Ad1 from 'src/assets/PNG/AD1.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import httpService from 'src/httpService';
import HealthkardList from './components/HealthkardList';
import Navbar from '@components/Navbar';
const ITEMS_PER_PAGE = 10;

function Healthkards() {
    const [userData, setUserData] = useState({
        users: [],
        currentPage: 0,
        totalPages: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation();

    const fetchKards = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);
        try {
            const result = await httpService.get('users', `?number=${'917842722245'}&page=${userData.currentPage + 1}&limit=${ITEMS_PER_PAGE}`);
            setUserData(prevData => ({
                users: [...prevData.users, ...result.users],
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalUsers: result.totalUsers
            }));
            setHasMore(result.currentPage < result.totalPages);
        } catch (err) {
            console.log({ err });
        } finally {
            setLoading(false);
        }
    }, [userData.currentPage, hasMore, loading]);

    useEffect(() => {
        fetchKards();
    }, []);

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar />

            <View style={ { flex: 1 } } className='p-2 bg-white'>
                <View>
                    <Image
                        source={ Ad1 }
                        className='mx-auto'
                    />
                </View>

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

                <HealthkardList
                    kards={ userData.users }
                    loading={ loading }
                    fetchMoreKards={ fetchKards }
                    hasMore={ hasMore }
                />
            </View>
        </View>
    );
}

export default Healthkards;
