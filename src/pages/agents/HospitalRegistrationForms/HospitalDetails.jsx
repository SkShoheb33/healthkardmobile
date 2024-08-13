import React, {useState} from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import Heading from '../../../components/ui/Heading'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { styles } from '../../../styles/style'

function HospitalDetails() {
    const [daysAvailabilty, setDaysAvailabilty] = useState([false, true, true, true, true, true, true])
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Saturday', 'Sunday']
  return (
    <View style={{flex:1}}>
        <Heading label='Hospital Details' size='text-2xl font-semibold'/>
        <ScrollView style={{flex:1}} className='w-full px-4'>
            <SafeAreaView  style={{flex:1}} className='w-full'>
                <Heading label='General details' size='text-lg'/>
                <View style={styles.lightGreen} className='p-2 rounded-md'>
                    <Input placeholder='Hospital legal name'/>
                    <Input placeholder='Hospital Trade name'/>
                    <Input placeholder='Hospital License ID'/>
                    <Button label='Upload License' color='blue'/>
                    <Input placeholder='Contact Number'/>
                </View>
                <Heading label='Contact Address' size='text-lg'/>
                <View style={styles.lightGreen} className='p-2 rounded-md'>
                    <View className='w-full flex-row items-center justify-between'>
                        <Input placeholder='Street' width='w-6/12'/>
                        <Input placeholder='Landmark' width='w-5/12'/>
                    </View>
                    <View className='w-full flex-row items-center justify-between'>
                        <Input placeholder='City' width='w-6/12'/>
                        <Input placeholder='Code' width='w-5/12'/>
                    </View>
                    <View className='w-full flex-row items-center justify-between'>
                        <Input placeholder='State' width='w-6/12'/>
                        <Input placeholder='Country' width='w-5/12'/>
                    </View>
                </View>
                <Heading label='Services'  size='text-lg'/>
                <View style={styles.lightGreen} className='p-2 rounded-md'>
                    <View className='w-full flex-row items-center justify-between'>
                        <Input placeholder='From' width='w-5/12'/>
                        <Input placeholder='To' width='w-5/12'/>
                    </View>
                    <Heading label='Availability'/>
                    <View className='flex-row flex-wrap '>
                        {
                            days.map((day,index)=>{
                                return(
                                    <View key={index} style={daysAvailabilty[index] && styles.green} className={`w-1/5 m-1 rounded-md flex items-center justify-center px-2 py-1 border border-[#00BFA8]`}>
                                        <Text className={`${daysAvailabilty[index]?'text-white':'text-black'}`}>{day.length>7? day.slice(0,5)+'...':day}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Heading label='Services offered'/>
                    <Input placeholder='Services offered'/>
                </View>
                <Heading label='Owner Details'  size='text-lg'/>
                <View style={styles.lightGreen} className='p-2 rounded-md'>
                    <Input placeholder='Full name' />
                    <Input placeholder='Contact number' onClick={()=>{}}/>
                    <Input placeholder='Email Id'/>
                </View>
            </SafeAreaView>
        </ScrollView>
    </View>
  )
}

export default HospitalDetails
