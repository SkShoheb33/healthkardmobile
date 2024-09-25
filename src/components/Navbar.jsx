import React, { useState, useEffect } from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from 'src/styles/style'
import ShimmerContainer from './ShimmerContainer'

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
  const logoImage = 'https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Flogo%2FLogo.png?alt=media&token=6636cc55-c1e8-429c-852f-758d32238177';

  return (
    <SafeAreaView style={ styles[navbarColor] } className={ `p-4 flex items-center flex-row justify-between w-full` }>
      <View className="flex flex-row gap-2 items-center">
        <ShimmerContainer
          isVisible={ true }
          style={ { width: 30, height: 22.5 } }
        >
          <Image
            source={ { uri: logoImage } }
            resizeMode='contain'
            style={ { width: '100%', height: '100%' } }
          />
        </ShimmerContainer>
        <Text className='font-bold flex text-white text-lg'>{ name || 'Healthkard' }</Text>
      </View>
      { name && <Text>
        <FontAwesomeIcon icon={ faBell } color='white' size={ 18 } />
      </Text> }
    </SafeAreaView>
  )
}

export default Navbar
