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
        const userName = await AsyncStorage.getItem('userName');
        if (userName) {
          setName(userName)
        }
        setIsUser(!!userName)
      } catch (error) {
        console.error('Error reading userName:', error)
      }
    }

    const checkAgentToken = async () => {
      try {
        const agentName = await AsyncStorage.getItem('agentName');
        if (agentName) {
          setName(agentName)
          setIsUser(false)
        }
      } catch (error) {
        console.error('Error reading agentName:', error)
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
