import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { styles } from '../../StyleSheet'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
function Navbar() {
  return (
    <SafeAreaView style={styles.green} className="pt-12 pb-6 px-6 flex items-center flex-row justify-between">
        <View className="flex flex-row gap-2 items-center">
            <FontAwesomeIcon icon={faUser} color='white' size={24} />
            <Text className='font-bold flex text-white text-xl'>Shaik Shoheb</Text>
        </View>
        <View className='flex flex-row gap-4'>
            <FontAwesomeIcon icon={faBell} color='white' size={24}/>
        </View>
    </SafeAreaView>
  )
}

export default Navbar
