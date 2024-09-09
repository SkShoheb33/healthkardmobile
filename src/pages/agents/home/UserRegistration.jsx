import React, { useState } from 'react'
import { ImageBackground, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Heading from 'src/components/Heading'
import Navbar from 'src/components/Navbar'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import Select from 'src/components/Select'
import { styles } from 'src/styles/style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import DatePicker from '@components/DatePicker'
import { initialUser } from './constants'
import { plans } from 'src/pages/users/healthkards/components/constants'
import userImagePlaceholder from '@assets/user-placeholder.png'
import Camera from '@components/Camera'

function UserRegistration() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(initialUser);
    const changeHandler = (property, value) => {
        setUserData(prev => ({
            ...prev,
            [property]: value
        }))
    }
    const getImage = (image) => {
        setUserData(prev => ({
            ...prev,
            image: image
        }))
    }
    const priceHandler = (plan, price) => {
        setUserData(prev => ({
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

    const handlePayAndSubmit = () => {
        navigation.navigate('Pay', {
            plan: userData.payments[0].plan,
            healthId: userData.healthId
        });
    }

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar color='blue' />
            <ScrollView style={ { flex: 1 } } className=''>
                <SafeAreaView style={ { flex: 1 } } className='w-full my-12 items-center justify-center'>
                    <Heading label='USER REGISTRATION FORM' size='text-xl' />
                    <ImageBackground source={ !userData.image ? userImagePlaceholder : { uri: userData.image } } style={ { height: 150, width: 150 } } className='rounded-full overflow-hidden border border-gray-200'>
                        <Text className='h-full w-full'>
                            <FontAwesomeIcon icon={ faCamera } size={ 24 } />
                        </Text>
                    </ImageBackground>
                    <Camera getImage={ getImage } width='w-10/12' />

                    <Input placeholder='Name' onChange={ changeHandler } value={ userData.name } property='name' width='w-10/12' />
                    <View className='flex-row justify-between items-center w-10/12'>
                        <DatePicker width={ 'w-5/12' } onChange={ (date) => changeHandler('dob', date) } />
                        <Select placeholder={ { label: 'Gender', value: null } } selectedValue={ userData.gender } setSelectedValue={ (gender) => changeHandler('gender', gender) } options={ [{ label: 'Male', value: 'm' }, { label: 'Female', value: 'f' }, { label: 'Others', value: 'o' }] } styles={ { width: 'w-6/12' } } />
                    </View>
                    <Input placeholder='Contact Number' onChange={ changeHandler } value={ userData.number } property='number' width='w-10/12' onClick={ () => { } } />
                    <Input placeholder='Email' onChange={ changeHandler } value={ userData.email } property='email' width='w-10/12' />
                    <Input placeholder='Street' onChange={ changeHandler } value={ userData.address } property='address' width='w-10/12' />
                    <View className='flex-row justify-between w-10/12'>
                        <Input placeholder='Town/City' onChange={ changeHandler } value={ userData.city } property='city' width='w-5/12' />
                        <Input placeholder='Pin code' onChange={ changeHandler } value={ userData.pincode } property='pincode' width='w-6/12' />
                    </View>
                    <Heading label='Select plan' size='text-lg' />
                    <View className='w-10/12 flex-row flex-wrap justify-between'>
                        {
                            plans.map((price, index) => {
                                return (
                                    <Pressable onPress={ () => priceHandler(price.id, price.price) } style={ price.id === userData.payments[0].plan && styles.blueBorder } key={ index } className='w-2/5 border-2 bg-[#E5F7EF] border-gray-400 rounded my-2 flex-row items-center p-2'>
                                        <FontAwesomeIcon icon={ faCircleDot } color={ price.id === userData.payments[0].plan ? '#303486' : '#575757' } />
                                        <View className='p-1'>
                                            <Text className={ `font-semibold text-lg ${price.id === userData.payments[0].plan ? 'text-black' : 'text-gray-500'}` }>{ price.id }</Text>
                                            <Text className={ `text-xs ${price.id === userData.payments[0].plan ? 'text-black' : 'text-gray-500'}` }>₹ { price.price }</Text>
                                        </View>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                    <Button onPress={ handlePayAndSubmit } label='Pay and Register' color='blue' style='w-10/12 py-4' />
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default UserRegistration
