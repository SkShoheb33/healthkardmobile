import React, { useEffect, useState, useCallback } from 'react'
import { Image, ScrollView, Text, View, RefreshControl } from 'react-native'
import Navbar from '@components/Navbar'
import httpService from 'src/httpService'
import logoSmall from 'src/assets/logo-small.png'
import { styles } from 'src/styles/style'
import { formatCurrency, formatData } from 'src/helpers/formatData'
import ShimmerContainer from '@components/ShimmerContainer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '@components/Loading'

function Healthkards() {

  const [users, setUsers] = useState([]);
  const [usersAdded, setUsersAdded] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);


  const fetchUsersAdded = async () => {
    try {
      setLoading(true);
      const agentToken = await AsyncStorage.getItem('agentToken');
      const result = await httpService.get(`agents/${agentToken}/users-added`);
      setUsersAdded(result);
      let formattedUsers = formatData(result, 'healthID');
      setUsers(formattedUsers);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAdded();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsersAdded().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={ { flex: 1 } } className='bg-white'>
      <Navbar color='blue' />
      { loading ? <Loading isLoading={ loading } /> :
        <ScrollView
          style={ { flex: 1 } }
          refreshControl={
            <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
          }
        >
          <View style={ { flex: 1 } } className='p-2 w-full'>
            {
              users?.map((day, index) => {
                const totalAmount = day.healthID.reduce((sum, userId) => {
                  const user = usersAdded.find(item => item.healthID === userId);
                  return sum + (user?.amount || 0);
                }, 0);
                return (
                  <View key={ index } className='p-2 w-full'>
                    <View className='flex-row justify-between'>
                      <Text className='text-black font-semibold text-lg'>{ day.date }</Text>
                      <View className='flex-row items-center'>
                        <Text className='text-black mr-2'>Count: { day?.healthID?.length }</Text>
                        <Text className='text-black mr-2'>Total: { formatCurrency(totalAmount) }</Text>
                        <Text className='text-black mr-2'>Avg:  { formatCurrency((totalAmount / day?.healthID?.length).toFixed(2)) }</Text>
                      </View>
                    </View>
                    <View className=' mb-1 w-full'>
                      {
                        day?.healthID?.map((user, index) => <Usercard key={ index } userId={ user } userPlan={ usersAdded.find(item => item.healthID === user) } />)
                      }
                    </View>
                  </View>
                )
              })
            }
            {
              users?.length === 0 && <Text className='text-black text-center text-lg'>No users added</Text>
            }
          </View>
        </ScrollView>
      }
    </View>
  )
}

export default Healthkards

const Usercard = ({ userId, userPlan }) => {
  const [user, setUser] = useState({});
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const fetchuser = async () => {
      const result = await httpService.get(`users/?healthId=${userId}`);
      setUser(result.users[0]);
    }
    fetchuser();
  }, [userId])

  if (!user) return null;

  return (
    <View className='flex-row w-full items-center my-2 p-2 border border-gray-300 rounded-md shadow-xl bg-white'>
      <ShimmerContainer
        style={ { width: 50, height: 50 } }
        isVisible={ imageLoading }
      >
        { user?.image && <Image
          style={ { width: 50, height: 50 } }
          className='rounded-full'
          source={ { uri: user?.image } }
          onLoad={ () => setImageLoading(true) }
        /> }
      </ShimmerContainer>
      <View style={ { flex: 1 } } className='flex ml-2'>
        <View className='flex-row items-center'>
          <Image source={ logoSmall } className='mr-2' />
          <Text style={ styles.greenText } className='text-sm'>{ userId }</Text>
        </View>
        <Text className='text-black text-lg font-semibold'>
          { user?.name }
        </Text>
        <View className='flex-row flex-wrap mb-1 justify-between w-full'>
          <View className='flex-row items-center justify-between '>
            <Text className='text-gray-600 text-xs mr-1'>Plan:</Text>
            <Text className='text-black text-sm font-medium'>{ userPlan?.plan || 'N/A' }</Text>
          </View>
          <View className='flex-row items-center justify-between '>
            <Text className='text-gray-600 text-xs mr-1'>Type:</Text>
            <View className='flex-row items-center'>
              <View className={ `w-2 h-2 rounded-full mr-1 ${userPlan?.type === 'new' ? 'bg-green-500' : 'bg-blue-500'}` } />
              <Text className='text-black text-sm font-medium'>{ userPlan?.type === 'new' ? 'New' : 'Renewed' }</Text>
            </View>
          </View>
          <View className='flex-row items-center justify-between '>
            <Text className='text-gray-600 text-xs mr-1'>Amount:</Text>
            <Text className='text-black text-sm font-medium'>{ formatCurrency(userPlan?.amount) || '0' }</Text>
          </View>
        </View>
      </View>
    </View>
  )
}