import React, { useRef, useState } from 'react'
import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ad1 from '../../../../assets/PNG/AD1.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAnglesLeft, faArrowLeftLong, faArrowRightLong, faCamera, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../../../styles/style'
import { KeyboardAvoidingView } from 'react-native'
import Plans from '@components/Plans'
import Navbar from '@components/Navbar'
import { initialUser, plans } from './constants'
import httpService from 'src/httpService'
import { pay } from 'src/helpers/payment'

function NewKard() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(initialUser);
  const [pageNumber, setPageNumber] = useState(1);

  const inputChangeHandler = (property, value) => {
    console.log({ property, value })
    setUserData(prev => ({
      ...prev,
      [property]: value
    }))
  }

  const handlePayment = async (plan) => {
    console.log(userData);
    try {
      pay();
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate payment');
      console.error(error);
    }
  }
  return (
    <View style={ { flex: 1 } } className=''>
      <Navbar />
      <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } style={ { flex: 1 } } className='flex flex-col items-center w-full pb-12'>
        <Image source={ Ad1 } />
        <ScrollView style={ { flex: 1 } } className=' w-full'>
          { pageNumber === 1 && <Form1 userData={ userData } inputChangeHandler={ inputChangeHandler } setPageNumber={ setPageNumber } /> }
          { pageNumber === 2 && <Form2 userData={ userData } inputChangeHandler={ inputChangeHandler } setPageNumber={ setPageNumber } /> }
          { pageNumber === 3 && <Form3 userData={ userData } handlePayment={ handlePayment } setPageNumber={ setPageNumber } setUserData={ setUserData } /> }
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}



const Form1 = ({ userData, inputChangeHandler, setPageNumber }) => {

  return (
    <View className='w-10/12 mx-auto'>
      <Text className='my-8 text-xl text-center'>Get your healthkard</Text>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs text-black'>Name</Text>
        <TextInput value={ userData.name } onChangeText={ value => inputChangeHandler('name', value) } />
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View className='w-5/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black'>Age</Text>
          <TextInput value={ userData.age } onChangeText={ value => inputChangeHandler('age', value) } />
        </View>
        <View className='w-6/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black'>Gender</Text>
          <TextInput value={ userData.gender } onChangeText={ value => inputChangeHandler('gender', value) } />
        </View>
      </View>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs text-black'>Email</Text>
        <TextInput value={ userData.email } onChangeText={ value => inputChangeHandler('email', value) } />
      </View>
      <View className='flex-row justify-between my-4'>
        <View><Text className='text-black'>Page 1</Text></View>
        <TouchableOpacity onPress={ () => setPageNumber(2) } style={ styles.green } className='py-2 px-4 rounded-md items-center flex-row'>
          <Text className='text-white '>Next </Text>
          <FontAwesomeIcon icon={ faArrowRightLong } color='white' />
        </TouchableOpacity>
      </View>
    </View>
  )
}



const Form2 = ({ userData, inputChangeHandler, setPageNumber }) => {

  return (
    <View className='w-10/12 mx-auto'>
      <Text className='my-8 text-xl text-center'>Get your healthkard</Text>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs text-black'>Address</Text>
        <TextInput value={ userData.address } onChangeText={ value => inputChangeHandler('address', value) } />
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View className='w-5/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black'>Town/City</Text>
          <TextInput value={ userData.city } onChangeText={ value => inputChangeHandler('city', value) } />
        </View>
        <View className='w-6/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black'>Pincode</Text>
          <TextInput value={ userData.pincode } onChangeText={ value => inputChangeHandler('pincode', value) } />
        </View>
      </View>
      <View className='w-full p-2 py-4 rounded-md my-4 justify-center flex-row items-center bg-gray-300'>
        <FontAwesomeIcon icon={ faCamera } size={ 20 } />
        <Text className='text-xl mx-2 text-black'>Take your picture</Text>
      </View>
      <View className='flex-row justify-between my-4'>
        <TouchableOpacity onPress={ () => setPageNumber(1) } style={ styles.green } className='py-2 px-4 rounded-md items-center flex-row'><FontAwesomeIcon icon={ faArrowLeftLong } color='white' /><Text className='text-white mx-2'>Prev </Text></TouchableOpacity>
        <View><Text>Page 2</Text></View>
        <TouchableOpacity onPress={ () => setPageNumber(3) } style={ styles.green } className='py-2 px-4 rounded-md items-center flex-row'><Text className='text-white mx-2'>Next </Text><FontAwesomeIcon icon={ faArrowRightLong } color='white' /></TouchableOpacity>
      </View>
    </View>
  )
}



const Form3 = ({ userData, handlePayment, setPageNumber, setUserData }) => {

  const [plan, setPlan] = useState(userData.payments[userData.payments.length - 1].plan);
  const payRef = useRef(null);
  const changePlan = (selectedPlan) => {
    setPlan(selectedPlan);
    const payment = {
      plan: selectedPlan,
      amount: plans.filter(item => item.id === selectedPlan)[0].amount,
      transactionId: null,
      issueDate: (new Date()).getTime(),
      paymentStatus: false
    }
    setUserData(prev => ({
      ...prev,
      payments: [
        payment
      ]
    }))
  };

  return (
    <View className='w-10/12 mx-auto'>

      <Plans plan={ plan } changePlan={ changePlan } />
      <View ref={ payRef } className='flex-row justify-between my-4 items-center'>
        <TouchableOpacity onPress={ () => setPageNumber(2) } style={ styles.green } className='py-2 px-4 rounded-md items-center flex-row'>
          <FontAwesomeIcon icon={ faArrowLeftLong } color='white' />
          <Text className='text-white mx-2'>Prev </Text>
        </TouchableOpacity>
        <View><Text>Page 3</Text></View>
        <TouchableOpacity onPress={ () => handlePayment(plan) } style={ styles.green } className='py-2 px-4 rounded-md items-center flex-row'>
          <Text className='text-white mx-2'>Pay </Text>
          <FontAwesomeIcon icon={ faArrowRightLong } color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NewKard
