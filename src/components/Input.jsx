import React, { useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { styles } from '../styles/style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import ErrorBoundary from './ErrorBoundary'

function Input({ placeholder, value, property = '', onChange = () => { }, width, onClick, onClickLable = 'verify', inputMode = 'text', error = { message: '', status: false } }) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ErrorBoundary>
      <View className={ `${width} mx-auto` }>
        <View className={ `w-full justify-between items-center h-12 my-2 bg-white flex flex-row px-4 rounded border border-gray-200` }>
          <TextInput
            inputMode={ inputMode }
            placeholder={ placeholder }
            placeholderTextColor='#575757'
            value={ value }
            onChangeText={ (value) => onChange(property, value) }
            secureTextEntry={ inputMode === 'password' && !showPassword }
            className={ `max-w-full ${(onClick || inputMode === 'password') ? 'w-9/12' : 'w-full'} text-black` }
          />
          { inputMode === 'password' && (
            <TouchableOpacity onPress={ togglePasswordVisibility } className='bg-transparent'>
              <FontAwesomeIcon icon={ showPassword ? faEye : faEyeSlash } size={ 16 } color="#575757" />
            </TouchableOpacity>
          ) }
          { onClick && <TouchableOpacity onPress={ onClick } className='bg-transparent'>
            <Text style={ styles.blueText }>{ onClickLable }</Text>
          </TouchableOpacity> }
        </View>
        { error.status && <Text className='text-xs text-[#BD3B3B]'>{ error.message }</Text> }
      </View>
    </ErrorBoundary>
  )
}

export default Input
