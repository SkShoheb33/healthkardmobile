import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import Heading from '../../../../components/ui/Heading'
import Navbar from '../../../../components/Navbar'
import Input from '../../../../components/ui/Input'
import Button from '../../../../components/ui/Button'
import Select from '../../../../components/ui/Select'
import Camera from '../../../../components/ui/Camera'

function UserRegistration() {
  return (
    <View style={{flex:1}}>
        <Navbar/>
        <ScrollView style={{flex:1}} className=''>
            <SafeAreaView style={{flex:1}} className='w-full my-12 items-center justify-center'>
                <Heading label='USER REGISTRATION FORM' size='text-xl'/>
                <Input placeholder='Name' width='w-10/12'/>
                <View className='flex-row justify-between items-center w-10/12'>
                    <Input placeholder='Age' width='w-5/12'/>
                    <Select placeholder={{label: 'Gender', value: null}} options={[{ label: 'Male', value: 'm'}, { label: 'Female', value: 'f'}, { label: 'Others', value: 'o'}]} styles={{width:'w-6/12'}}/>
                </View>
                <Input placeholder='Contact Number' width='w-10/12' onClick={()=>{}}/>
                <Input placeholder='Email' width='w-10/12'/>
                <Input placeholder='Street' width='w-10/12'/>
                <View className='flex-row justify-between w-10/12'>
                    <Input placeholder='Town/City' width='w-5/12'/>
                    <Input placeholder='Pin code' width='w-6/12'/>
                </View>
                <Camera/>
                <Button label='Take Picture' color='blue' style='w-10/12 py-4'/>
                <Button label='Pay and Register' color='green' style='w-10/12 py-4'/>
            </SafeAreaView>
        </ScrollView>
    </View>
  )
}

export default UserRegistration
