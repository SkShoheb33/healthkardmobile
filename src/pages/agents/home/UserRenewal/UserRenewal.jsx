import Button from '@components/Button'
import Heading from '@components/Heading'
import Input from '@components/Input'
import Navbar from '@components/Navbar'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, ScrollView, Text, Keyboard, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { formatDate } from 'src/helpers/formatData'
import httpService from 'src/httpService'
import Plans from '@components/Plans'

function UserRenewal() {

    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPlans, setShowPlans] = useState(false);
    const [plan, setPlan] = useState('1 month');

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const ITEMS_PER_PAGE = 10;

    const fetchUsers = async (page = 1) => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            let paramType = 'number'
            if (search.startsWith('HK')) {
                paramType = 'healthId'
            }
            const response = await httpService.get('users', `?${paramType}=${search}&page=${page}&limit=${ITEMS_PER_PAGE}`);
            setUsers(response.users);
            setCurrentPage(page);
            setHasMore(response.users.length === ITEMS_PER_PAGE);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchUsers(currentPage + 1);
        }
    }

    const onScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom) {
            handleLoadMore();
        }
    }

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setShowPlans(true);
    }

    const handlePayment = () => {
        navigation.navigate('Pay', { plan, healthId: selectedUser?.healthId })
    }

    return (
        <View className='flex-1 bg-white'>
            <Navbar />
            <View className='flex-1 p-4'>
                { showPlans ?
                    <View className='flex-1 p-4'>
                        <View className='w-full flex-col items-center justify-center'>
                            <View className='flex-row items-center justify-center'>
                                <Text className='text-black font-bold mr-2'>Selected user :</Text>
                                <Text className='text-center text-black'>{ selectedUser?.name }</Text>
                            </View>
                            <Pressable onPress={ () => setShowPlans(false) } className='flex-row items-center justify-center my-2'><Text className='text-black font-bold ml-2 text-xs'>(Change)</Text></Pressable>
                        </View>
                        <Plans plan={ plan } changePlan={ setPlan } />
                        <Button label='Pay' style='w-full p-4' color='blue' onPress={ () => handlePayment() } />
                    </View>
                    : <View style={ { flex: 1 } } className='w-full mx-auto items-center justify-center'>
                        <Heading label='Search User' size='text-xl' />
                        <Input label='Search User' width='w-11/12' placeholder='Search User by phone number or healthId' onChange={ (property, value) => setSearch(value) } />
                        <Button label='Search' style='w-11/12 p-2' color='blue' onPress={ () => fetchUsers() } disabled={ isLoading } />
                        { users.length > 0 ? (
                            <View style={ { flex: 1 } } className="mt-4 w-full">
                                <Heading label='Search Results' size='text-lg' />
                                <ScrollView style={ { flex: 1 } } className='flex-1 p-4 w-full'
                                    onTouchEnd={ Keyboard.dismiss }
                                    keyboardShouldPersistTaps='always'
                                    onScroll={ onScroll }
                                    scrollEventThrottle={ 16 }
                                    pagingEnabled
                                >
                                    {
                                        users.map((user, index) => (
                                            <TouchableOpacity onPress={ () => handleUserPress(user) } key={ index } className="bg-gray-100 p-4 rounded-md my-2 w-full">
                                                <Text className="font-bold text-black">{ user.name }</Text>
                                                <Text className="text-sm text-black">Health ID: { user.healthId }</Text>
                                                <Text className="text-sm text-black">Valid till: { formatDate(user.expireDate) }</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>

                        ) : <Text className='text-center text-black'>No users found</Text> }
                    </View> }
            </View>
        </View>
    )
}

export default UserRenewal;
