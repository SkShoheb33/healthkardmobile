import React from 'react'
import { Text } from 'react-native'

function Address({address, styles ,color}) {
  return (
    <Text style={color} className={`my-1 ${styles} text-black`}>
        <Text>{address.street}, {address.city}, {address.landmark}, {address.code}, {address.state}, {address.country}</Text>
    </Text>
  )
}

export default Address
