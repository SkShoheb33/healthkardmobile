import React from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../styles/style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function Button({color, label, onPress, style='w-full p-4', transparent=false, icon, iconColor='#000', reverse=false}) {
  return (
    <TouchableOpacity onPress={onPress} style={!transparent && (color==='blue'?styles.blue:styles.green)} className={`font-semibold text-xl ${style}  rounded-xl items-center my-2 ${reverse?'flex-row-reverse':'flex-row'} justify-center`}>
      {icon && <Text className='mx-2'> <FontAwesomeIcon icon={icon} color={transparent?iconColor:'#fff'} size={16}/></Text>}  
      <Text className={`w-fit text-white`}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button
