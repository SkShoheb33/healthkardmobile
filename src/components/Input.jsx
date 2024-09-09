import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { styles } from '../styles/style'

function Input({ placeholder, value, property = '', onChange = () => { }, width, onClick, onClickLable = 'verify', inputMode = 'text', error = { message: '', status: false } }) {
  return (
    <View className={ `${width} mx-auto` }>
      <View className={ `w-full justify-between items-center h-12 my-2 bg-white flex flex-row px-4 rounded border border-gray-200` }>
        <TextInput inputMode={ inputMode } placeholder={ placeholder } placeholderTextColor='#575757' value={ value } onChangeText={ (value) => onChange(property, value) } className={ `max-w-full ${onClick ? 'w-9/12' : 'w-full'} text-black` } />
        { onClick && <TouchableOpacity onPress={ onClick } className='bg-transparent'>
          <Text style={ styles.blueText }>{ onClickLable }</Text>
        </TouchableOpacity> }
      </View>
      { error.status && <Text className='text-xs text-[#BD3B3B]'>{ error.message }</Text> }
    </View>
  )
}

export default Input
