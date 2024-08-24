import React from 'react'
import { SafeAreaView, ScrollView, View, TextInput } from 'react-native'
import Heading from '../../../../components/Heading'
import Button from '../../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

function MediaDetails() {

  return (
    <View style={{ flex: 1 }}>
      <Heading label='Media Details' size='text-2xl font-semibold' />
      <ScrollView style={{ flex: 1 }} className='w-full px-4'>
        <SafeAreaView style={{ flex: 1 }} className='w-full'>
          <View className='border border-[#E0E0E0] rounded-md'>
            <TextInput multiline={true} numberOfLines={6} placeholder='Hospital description' className=' text-black' />
          </View>
          <Button label='Upload logo' color='blue' />
          <Button label='Upload hospital image' color='blue' />
          <Heading label='Add some more images (Optional)' size='text-xl font-semibold' />
          <View className='flex-row gap-2'>
            <View className='items-center'>
              <TouchableOpacity className=''>
                <FontAwesomeIcon icon={faImage} size={100} />
              </TouchableOpacity>
              <Heading label='Image 1' size='text-lg font-semibold' />
            </View>
            <View className='items-center'>
              <TouchableOpacity className=''>
                <FontAwesomeIcon icon={faImage} size={100} />
              </TouchableOpacity>
              <Heading label='Image 2' size='text-lg font-semibold' />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default MediaDetails
