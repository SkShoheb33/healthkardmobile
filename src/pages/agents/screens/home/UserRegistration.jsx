import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Heading from '../../../../components/ui/Heading'
import Navbar from '../../../../components/Navbar'
import Input from '../../../../components/ui/Input'
import Button from '../../../../components/ui/Button'
import Select from '../../../../components/ui/Select'
import Camera from '../../../../components/ui/Camera'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { styles } from '../../../../styles/style'

function UserRegistration() {
    const [userData, setUserData] = useState({
        name: '',
        image: '',
        email: '',
        number: '',
        gender: '',
        age: '',
        address: '',
        city: '',
        pincode: '',
        agent: '',
        payments: [
            {
                plan: '1 Month',
                amount: 99,
                transactionId: '',
                issueDate: '',
                paymentStatus: ''
            }
        ]
    });
    const [priceList] = useState([
        {plan: '1 Month', price: 99},
        {plan: '3 Months', price: 299},
        {plan: '6 Months', price: 499},
        {plan: '1 Year', price: 899},
    ])
    const changeHandler = (property, value)=>{
        setUserData(prev=>({
            ...prev,
            [property]  : value
        }))
    }
    const getImage = (image)=>{
        setUserData(prev=>({
            ...prev,
            image: image
        }))
    }
    const priceHandler = (plan, price)=>{
        setUserData(prev =>({
            ...prev,
            payments: [
                {
                    plan: plan,
                    amount: price,
                    transactionId: '',
                    issueDate: '',
                    paymentStatus: ''
                }
            ]

            
        }))
    }
    const handlePayAndSubmit = ()=>{
    }
  return (
    <View style={{flex:1}}>
        <Navbar/>
        <ScrollView style={{flex:1}} className=''>
            <SafeAreaView style={{flex:1}} className='w-full my-12 items-center justify-center'>
                <Heading label='USER REGISTRATION FORM' size='text-xl'/>
                {userData.image && 
                    <View className='rounded-full overflow-hidden'>
                        <Image source={{uri: userData.image}} style={{height: 150, width: 150}}/>
                    </View>
                }
                <Input placeholder='Name' onChange={changeHandler} value={userData.name} property='name' width='w-10/12'/>
                <View className='flex-row justify-between items-center w-10/12'>
                    <Input placeholder='Age' onChange={changeHandler} value={userData.age} property='age' width='w-5/12'/>
                    <Select placeholder={{label: 'Gender', value: null}} selectedValue={userData.gender} setSelectedValue={(gender)=>changeHandler('gender', gender)} options={[{ label: 'Male', value: 'm'}, { label: 'Female', value: 'f'}, { label: 'Others', value: 'o'}]} styles={{width:'w-6/12'}}/>
                </View>
                <Input placeholder='Contact Number' onChange={changeHandler} value={userData.number} property='number' width='w-10/12' onClick={()=>{}}/>
                <Input placeholder='Email' onChange={changeHandler} value={userData.email} property='email' width='w-10/12'/>
                <Input placeholder='Street' onChange={changeHandler} value={userData.address} property='address' width='w-10/12'/>
                <View className='flex-row justify-between w-10/12'>
                    <Input placeholder='Town/City' onChange={changeHandler} value={userData.city} property='city' width='w-5/12'/>
                    <Input placeholder='Pin code' onChange={changeHandler} value={userData.pincode} property='pincode' width='w-6/12'/>
                </View>
                <Camera label='Take Picture' width='w-10/12' getImage={getImage}/>
                <Heading label='Select plan' size='text-lg'/>
                <View className='w-10/12 flex-row flex-wrap justify-between'>
                    {
                        priceList.map((price, index)=>{
                            return(
                                <Pressable onPress={()=>priceHandler(price.plan, price.price)} style={{...styles.lightGreen, }} key={index} className='w-2/5 border border-gray-400 rounded-md my-2 flex-row items-center p-2'>
                                    <FontAwesomeIcon icon={faCircleDot} color={price.plan === userData.payments[0].plan?'#303486':'#575757'} />
                                    <View className='p-1'>
                                        <Text className={`font-semibold text-lg ${price.plan === userData.payments[0].plan?'text-black':'text-gray-500'}`}>{price.plan}</Text>
                                        <Text className={`text-xs ${price.plan === userData.payments[0].plan?'text-black':'text-gray-500'}`}>₹ {price.price}</Text>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </View>
                <Button onPress={handlePayAndSubmit} label='Pay and Register' color='blue' style='w-10/12 py-4'/>
            </SafeAreaView>
        </ScrollView>
    </View>
  )
}

export default UserRegistration
