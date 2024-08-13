import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Navbar from '../../../../components/Navbar'
import httpService from '../../../../httpService'
import logoSmall from '../../../../assets/logo-small.png'
import { styles } from '../../../../styles/style'

function Healthkards() {
  const usersAdded = [
    {
      date: '10 july 2024',
      users: ['HK243702333', 'HK243702333', 'HK243702333']
    },
    {
      date: '9 july 2024',
      users: ['HK243702333', 'HK243702333', 'HK243702333']
    },
    {
      date: '8 july 2024',
      users: ['HK243702333', 'HK243702333', 'HK243702333']
    },
  ]
  return (
      <View style={{flex:1}}>
        <Navbar/>
        <ScrollView style={{flex:1}}>
          <View style={{flex:1}} className='p-2'>
            {
              usersAdded.map((day, index)=>{
                return(
                  <View key={index} className='p-2'>
                    <View className='flex-row justify-between'>
                      <Text className='text-black font-semibold text-lg'>{day.date}</Text>
                      <Text className='text-black'>Count : {day.users.length}</Text>
                    </View>
                    {
                      day.users.map((user, index)=><Usercard key={index} userId={user}/>)
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

const Usercard = ({userId})=>{
  const [user, setUser] = useState({});
  useEffect(()=>{
    const fetchuser = async()=>{
      const result = await httpService.get(`users/?healthId=${userId}`);
      setUser(result[0]);
    }
    fetchuser();
  },[userId])

  return(
    <View className='flex-row items-center my-2 p-2 border border-gray-300 rounded-md shadow-xl'>
      {user.image && <Image style={{width: 50, height: 50}} className='rounded-full' source={{uri: user.image}}/>}
      <View className='flex mx-2'>
        <View className='flex-row items-center'>
          <Image source={logoSmall} className='mr-2'/>
          <Text style={styles.greenText} className='font-semibold text-lg'>{userId}</Text>
        </View>
        <Text className='text-black text-sm'>
          {user && user.name}
        </Text>
      </View>
    </View>
  )
}