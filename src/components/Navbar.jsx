import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from 'src/styles/style'

function Navbar() {
  const [isUser, setIsUser] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          setName(userToken.split('-')[0])
        }
        setIsUser(!!userToken)
      } catch (error) {
        console.error('Error reading userToken:', error)
      }
    }

    const checkAgentToken = async () => {
      try {
        const agentToken = await AsyncStorage.getItem('agentToken');
        if (agentToken) {
          setName(agentToken.split('-')[0])
        }
      } catch (error) {
        console.error('Error reading agentToken:', error)
      }
    }
    checkUserToken();
    checkAgentToken();
  }, [])

  const navbarColor = isUser ? 'green' : 'blue'

  return (
    <SafeAreaView style={ styles[navbarColor] } className={ `p-4 flex items-center flex-row justify-between w-full` }>
      <View className="flex flex-row gap-2 items-center">
        <FontAwesomeIcon icon={ faUser } color='white' size={ 18 } />
        <Text className='font-bold flex text-white text-lg'>{ name || 'User name' }</Text>
      </View>
    </SafeAreaView>
  )
}

export default Navbar
