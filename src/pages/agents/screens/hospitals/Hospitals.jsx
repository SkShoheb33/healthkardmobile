import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Navbar from '../../../../components/Navbar'
import httpService from '../../../../httpService'
import logoSmall from '../../../../assets/logo-small.png'
import { styles } from '../../../../styles/style'

function Hospitals() {
  const hospitalsAdded = [
    {
      date: '10 july 2024',
      hospitals: ['HH242242134', 'HH242242134', 'HH242242134']
    },
    {
      date: '9 july 2024',
      hospitals: ['HH242242134', 'HH242242134', 'HH242242134']
    },
    {
      date: '8 july 2024',
      hospitals: ['HH242242134', 'HH242242134', 'HH242242134']
    },
  ]
  return (
      <View style={{flex:1}}>
        <Navbar/>
        <ScrollView style={{flex:1}}>
          <View style={{flex:1}} className='p-2'>
            {
              hospitalsAdded.map((day, index)=>{
                return(
                  <View key={index} className='p-2'>
                    <View className='flex-row justify-between'>
                      <Text className='text-black font-semibold text-lg'>{day.date}</Text>
                      <Text className='text-black'>Count : {day.hospitals.length}</Text>
                    </View>
                    {
                      day.hospitals.map((hospital, index)=><HospitalCard key={index} hospitalId={hospital}/>)
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

export default Hospitals

const HospitalCard = ({hospitalId})=>{
  const [hospital, setHospital] = useState({});
  useEffect(()=>{
    const fetchHospital = async()=>{
      const result = await httpService.get(`hospitals/?hospitalId=${hospitalId}`);
      setHospital(result[0]);
    }
    fetchHospital();
  },[hospitalId])

  return(
    <View className='flex-row items-center my-2 p-2 border border-gray-300 rounded-md shadow-xl'>
      {hospital.mediaDetails && <Image style={{width: 50, height: 50}} className='rounded-full' source={{uri: hospital.mediaDetails.logoURL}}/>}
      <View className='flex mx-2'>
        <View className='flex-row items-center'>
          <Image source={logoSmall} className='mr-2'/>
          <Text style={styles.greenText} className='font-semibold text-lg'>{hospitalId}</Text>
        </View>
        <Text className='text-black text-sm'>
          {hospital.hospitalDetails && hospital.hospitalDetails.hospitalLegalName}
        </Text>
      </View>
    </View>
  )
}