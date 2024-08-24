import React from 'react'
import { View, Text } from 'react-native'

function Loading({isLoading}) {
    if(!isLoading)return null;
  return (
    <View>
        <Text>Loading...</Text>
    </View>
  )
}

export default Loading
