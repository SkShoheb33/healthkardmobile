import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function Button({ color, label, onPress, style = 'w-full p-4', transparent = false, icon, iconColor = '#000', disabled = false, iconSize = 12, iconPosition = 'left', textStyle = '' }) {
  return (
    <TouchableOpacity onPress={ !disabled ? onPress : null } style={ !transparent && (color === 'blue' ? styles.blue : color === 'red' ? styles.bgRed : styles.green) } className={ `font-semibold ${style} rounded items-center my-2 ${iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'} justify-center ${disabled && 'opacity-50'}` }>
      { icon &&
        <Text className=' items-center justify-center mx-1'>
          <FontAwesomeIcon icon={ icon } color={ transparent ? iconColor : '#fff' } size={ iconSize } />
        </Text> }
      <Text className={ `w-fit text-white ${textStyle}` }>{ label }</Text>
    </TouchableOpacity>
  )
}

export default Button
