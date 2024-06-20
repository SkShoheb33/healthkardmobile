import React from 'react'
import { Button, Pressable, Text, View } from 'react-native'
import { styles } from '../StyleSheet'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFolder, faHome, faHospital, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'

function BaseNavigation({}) {
  const navigation = useNavigation();
  console.log(navigation)
  return (
    <View style={styles.green} className='p-2 pt-3 flex flex-row'>
      <Pressable onPress={()=>navigation.navigate("Home")} className='flex items-center w-1/5'>
        <FontAwesomeIcon icon={faHome} size={24} color='white'/>
        <Text className='text-white text-xs'>Home</Text>
      </Pressable>
      <Pressable onPress={()=>navigation.navigate("Hospitals")} className='flex items-center w-1/5'>
        <FontAwesomeIcon icon={faHospital} size={24} color='white'/>
        <Text className='text-white text-xs'>Hospitals</Text>
      </Pressable>
      <View className='flex items-center w-1/5'>
        <FontAwesomeIcon icon={faIdCard} size={24} color='white'/>
        <Text className='text-white text-xs'>Health Kard</Text>
      </View>
      <View className='flex items-center w-1/5'>
        <FontAwesomeIcon icon={faFolder} size={24} color='white'/>
        <Text className='text-white text-xs'>Records</Text>
      </View>
      <View className='flex items-center w-1/5'>
        <FontAwesomeIcon icon={faUser} size={24} color='white'/>
        <Text className='text-white text-xs'>Profile</Text>
      </View>
    </View>
  )
}

export default BaseNavigation
