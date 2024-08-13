import React from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import Heading from '../../../components/ui/Heading'
import Button from '../../../components/ui/Button'

function MediaDetails() {
    
  return (
    <View style={{flex:1}}>
        <Heading label='Media Details' size='text-2xl font-semibold'/>
        <ScrollView style={{flex:1}} className='w-full px-4'>
            <SafeAreaView  style={{flex:1}} className='w-full'>
              <Text>This is in progress</Text>
            </SafeAreaView>
        </ScrollView>
    </View>
  )
}

export default MediaDetails
