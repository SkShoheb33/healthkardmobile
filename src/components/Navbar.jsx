import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { styles } from '../styles/style'
function Navbar({ color = 'green' }) {
  return (
    <SafeAreaView style={ styles[color] } className="bg-black p-4 flex items-center flex-row justify-between w-full">
      <View className="flex flex-row gap-2 items-center">
        <FontAwesomeIcon icon={ faUser } color='white' size={ 18 } />
        <Text className='font-bold flex text-white text-lg'>Shaik Shoheb</Text>
      </View>
    </SafeAreaView>
  )
}

export default Navbar
