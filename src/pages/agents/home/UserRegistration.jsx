import React, { useState } from 'react'
import { ImageBackground, Pressable, SafeAreaView, ScrollView, Text, View, Alert } from 'react-native'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userValidation } from 'src/helpers/validations'

function UserRegistration() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(initialUser);
    const [plan, setPlan] = useState('1 month');
    const [errors, setErrors] = useState({});

    const changeHandler = (property, value) => {
        setUserData(prev => ({
            ...prev,
            [property]: value
        }));
        // Clear error when user starts typing
        if (errors[property]) {
            setErrors(prev => ({ ...prev, [property]: { status: false, message: '' } }));
        }
    }

    const handlePayAndSubmit = async () => {
        if (userValidation(userData, setErrors)) {
            try {
                const agentId = await AsyncStorage.getItem('agentId');
                const updatedUserData = {
                    ...userData,
                    type: 'new',
                    agent: agentId
                };
                setUserData(updatedUserData);
                navigation.navigate('Pay', {
                    plan: plan,
                    healthId: updatedUserData.healthId,
                    userData: updatedUserData
                });
            } catch (error) {
                console.error('Error in handlePayAndSubmit:', error);
            }
        }
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
                    <Camera getImage={ image => changeHandler('image', image) } width='w-10/12' />

                    <Input placeholder='Name' onChange={ changeHandler } value={ userData.name } property='name' width='w-10/12' error={ errors.name || { status: false, message: '' } } />
                    <View className='flex-row justify-between items-center w-10/12'>
                        <DatePicker width={ 'w-5/12' } onChange={ (date) => changeHandler('dob', date) } placeHolder='Date of Birth' error={ errors.dob || { status: false, message: '' } } />
                        <Select placeholder={ { label: 'Gender', value: null } } selectedValue={ userData.gender } setSelectedValue={ (gender) => changeHandler('gender', gender) } options={ [{ label: 'Male', value: 'm' }, { label: 'Female', value: 'f' }, { label: 'Others', value: 'o' }] } styles={ { width: 'w-6/12' } } error={ errors.gender || { status: false, message: '' } } />
                    </View>
                    <Input placeholder='Contact Number' onChange={ changeHandler } value={ userData.number } property='number' width='w-10/12' inputMode='number' error={ errors.number || { status: false, message: '' } } />
                    <Input placeholder='Email' onChange={ changeHandler } value={ userData.email } property='email' width='w-10/12' error={ errors.email || { status: false, message: '' } } />
                    <Input placeholder='Street' onChange={ changeHandler } value={ userData.address } property='address' width='w-10/12' error={ errors.address || { status: false, message: '' } } />
                    <View className='flex-row justify-between w-10/12'>
                        <View className='w-5/12'>
                            <Input placeholder='Town/City' onChange={ changeHandler } value={ userData.city } property='city' width='w-full' error={ errors.city || { status: false, message: '' } } />
                        </View>
                        <View className='w-6/12'>
                            <Input placeholder='Pin code' onChange={ changeHandler } value={ userData.pincode } property='pincode' width='w-full' inputMode='number' error={ errors.pincode || { status: false, message: '' } } />
                        </View>
                    </View>
                    <Heading label='Select plan' size='text-lg' />
                    <View className='w-10/12 flex-row flex-wrap justify-between'>
                        {
                            plans.map((price, index) => {
                                return (
                                    <Pressable onPress={ () => setPlan(price.id) } style={ price.id === plan && styles.blueBorder } key={ index } className='w-[45%] border-2 bg-[#E5F7EF] border-gray-400 rounded my-2 flex-row items-center p-2'>
                                        <FontAwesomeIcon icon={ faCircleDot } color={ price.id === plan ? '#303486' : '#575757' } />
                                        <View className='p-1'>
                                            <Text className={ `font-semibold text-lg ${price.id === plan ? 'text-black' : 'text-gray-500'}` }>{ price.id }</Text>
                                            <Text className={ `text-xs ${price.id === plan ? 'text-black' : 'text-gray-500'}` }>₹ { price.price }</Text>
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
