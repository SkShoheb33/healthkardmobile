import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { styles } from '../../styles/style'

function Input({placeholder, value, onChange, width, onClick}) {
  return (
    <View className={`${width} justify-center items-center h-12 my-2 bg-white flex flex-row px-4 rounded-md`}>
        <TextInput placeholder={placeholder} className={`max-w-full ${onClick?'w-10/12':'w-full'}`}/>
        <TouchableOpacity className='bg-transparent'>
          {onClick && <Text style={styles.blueText}>Verify</Text>}
        </TouchableOpacity>
    </View>
  )
}

export default Input
