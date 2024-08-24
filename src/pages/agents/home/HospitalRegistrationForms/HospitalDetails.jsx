import React from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import Heading from '../../../../components/Heading'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { styles } from '../../../../styles/style'
import { pickFile } from '../../../../helpers/fileupload'

function HospitalDetails({ hospital, setHospital }) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Thrusday', 'Saturday']
    const changeDaysAvailabilityHandler = (index) => {
        const tempDays = hospital.hospitalDetails.daysAvailabilty;
        tempDays[index] = !tempDays[index];
        setHospital(prev => ({
            ...prev,
            hospitalDetails: {
                ...prev.hospitalDetails,
                daysAvailabilty: tempDays
            }
        }))
    }
    const changeHandler = (property, value) => {
        setHospital(prev => ({
            ...prev,
            hospitalDetails: {
                ...prev.hospitalDetails,
                [property]: value
            }
        }))
    }
    const changeAddressHandler = (property, value) => {
        setHospital(prev => ({
            ...prev,
            hospitalDetails: {
                ...prev.hospitalDetails,
                address: {
                    ...prev.hospitalDetails.address,
                    [property]: value
                }
            }
        }))
    }
    return (
        <View style={{ flex: 1 }}>
            <Heading label='Hospital Details' size='text-2xl font-semibold' />
            <ScrollView style={{ flexs: 1 }} className='w-full px-4'>
                <SafeAreaView style={{ flex: 1 }} className='w-full'>
                    <Heading label='General details' size='text-lg' />
                    <View style={styles.lightGreen} className='p-2 rounded-md'>
                        <Input placeholder='Hospital legal name' onChange={changeHandler} value={hospital.hospitalDetails.hospitalLegalName} property='hospitalLegalName' />
                        <Input placeholder='Hospital Trade name' onChange={changeHandler} value={hospital.hospitalDetails.hospitalTradeName} property='hospitalTradeName' />
                        <Input placeholder='Hospital License ID' onChange={changeHandler} value={hospital.hospitalDetails.licenseNumber} property='licenseNumber' />
                        <Button onPress={pickFile} label='Upload License' color='blue' />
                        <Input placeholder='Contact Number' onChange={changeHandler} value={hospital.hospitalDetails.hospitalNumber} property='hospitalNumber' />
                    </View>
                    <Heading label='Contact Address' size='text-lg' />
                    <View style={styles.lightGreen} className='p-2 rounded-md'>
                        <View className='w-full flex-row items-center justify-between'>
                            <Input placeholder='Street' width='w-6/12' onChange={changeAddressHandler} value={hospital.hospitalDetails.address.street} property='street' />
                            <Input placeholder='Landmark' width='w-5/12' onChange={changeAddressHandler} value={hospital.hospitalDetails.address.landmark} property='landmark' />
                        </View>
                        <View className='w-full flex-row items-center justify-between'>
                            <Input placeholder='City' width='w-6/12' onChange={changeAddressHandler} value={hospital.hospitalDetails.address.city} property='city' />
                            <Input placeholder='Code' width='w-5/12' onChange={changeAddressHandler} value={hospital.hospitalDetails.address.code} property='code' />
                        </View>
                        <View className='w-full flex-row items-center justify-between'>
                            <Input placeholder='State' width='w-6/12' onChange={changeAddressHandler} value={hospital.hospitalDetails.address.state} property='state' />
                            <Input placeholder='Country' width='w-5/12' onChange={changeAddressHandler} value={hospital.hospitalDetails.address.country} property='country' />
                        </View>
                    </View>
                    <Heading label='Services' size='text-lg' />
                    <View style={styles.lightGreen} className='p-2 rounded-md'>
                        <View className='w-full flex-row items-center justify-between'>
                            <Input placeholder='From' width='w-5/12' onChange={changeHandler} value={hospital.hospitalDetails.from} property='from' />
                            <Input placeholder='To' width='w-5/12' onChange={changeHandler} value={hospital.hospitalDetails.to} property='to' />
                        </View>
                        <Heading label='Availability' />
                        <View className='flex-row flex-wrap justify-between'>
                            {
                                days.map((day, index) => {
                                    return (
                                        <Pressable onPress={() => changeDaysAvailabilityHandler(index)} key={index} style={hospital.hospitalDetails.daysAvailabilty[index] && styles.green} className={`w-1/4 m-1 rounded-md flex items-center justify-center px-2 py-1 border border-[#00BFA8]`}>
                                            <Text className={`${hospital.hospitalDetails.daysAvailabilty[index] ? 'text-white' : 'text-black text-nowrap'}`}>{day.length > 6 ? day.slice(0, 6) + '...' : day}</Text>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                        <Heading label='Services offered' />
                        <Input placeholder='Services offered' onChange={changeHandler} value={hospital.hospitalDetails.servicesOffered} property='servicesOffered' />
                    </View>
                    <Heading label='Owner Details' size='text-lg' />
                    <View style={styles.lightGreen} className='p-2 rounded-md'>
                        <Input placeholder='Full name' onChange={changeHandler} value={hospital.hospitalDetails.hospitalOwnerFullName} property='hospitalOwnerFullName' />
                        <Input placeholder='Contact number' onChange={changeHandler} value={hospital.hospitalDetails.hospitalOwnerContactNumber} property='hospitalOwnerContactNumber' onClick={() => { }} />
                        <Input placeholder='Email Id' onChange={changeHandler} value={hospital.hospitalDetails.hospitalOwnerEmail} property='hospitalOwnerEmail' />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default HospitalDetails
