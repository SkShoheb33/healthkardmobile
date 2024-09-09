import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Navbar from '../../../components/Navbar'
import httpService from '../../../httpService'
import logoSmall from '../../../assets/logo-small.png'
import { styles } from '../../../styles/style'
import { AGENT_ID } from '../constants'
import { formatData } from 'src/helpers/formatData'
import ShimmerContainer from '@components/ShimmerContainer'

function Healthkards() {

  const [usersAdded, setUsersAdded] = useState([]);

  useEffect(() => {
    const fetchUsersAdded = async () => {
      const result = await httpService.get(`agents/${AGENT_ID}/users-added`);
      let formattedUsers = formatData(result, 'healthID');
      setUsersAdded(formattedUsers);
    };
    fetchUsersAdded();
  }, [AGENT_ID]);

  return (
    <View style={ { flex: 1 } } className='bg-white'>
      <Navbar color='blue' />
      <ScrollView style={ { flex: 1 } }>
        <View style={ { flex: 1 } } className='p-2'>
          {
            usersAdded.map((day, index) => {
              return (
                <View key={ index } className='p-2'>
                  <View className='flex-row justify-between'>
                    <Text className='text-black font-semibold text-lg'>{ day.date }</Text>
                    <Text className='text-black'>Count : { day?.healthID?.length }</Text>
                  </View>
                  {
                    day?.healthID?.map((user, index) => <Usercard key={ index } userId={ user } />)
                  }
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Healthkards

const Usercard = ({ userId }) => {
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
    <View className='flex-row items-center my-2 p-2 border border-gray-300 rounded-md shadow-xl bg-white'>
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
      <View className='flex mx-2'>
        <View className='flex-row items-center'>
          <Image source={ logoSmall } className='mr-2' />
          <Text style={ styles.greenText } className='text-sm'>{ userId }</Text>
        </View>
        <Text className='text-black text-lg font-semibold'>
          { user?.name }
        </Text>
      </View>
    </View>
  )
}