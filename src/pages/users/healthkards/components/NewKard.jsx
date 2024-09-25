import React, { useRef, useState } from 'react'
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeftLong, faArrowRightLong, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { styles } from 'src/styles/style'
import { KeyboardAvoidingView } from 'react-native'
import Plans from '@components/Plans'
import Navbar from '@components/Navbar'
import DatePicker from '@components/DatePicker'
import { banner, initialUser, plans } from './constants'
import ShimmerContainer from '@components/ShimmerContainer'

function NewKard() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(initialUser);
  const [pageNumber, setPageNumber] = useState(1);
  const [bannerLoading, setBannerLoading] = useState(false);

  const inputChangeHandler = (property, value) => {
    setUserData(prev => ({
      ...prev,
      [property]: value
    }))
  }

  const handlePayment = async (plan) => {
    try {
      navigation.navigate('Pay', { userData, plan: plan.plan });
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate payment');
      console.error(error);
    }
  }
  return (
    <View style={ { flex: 1 } } className=' bg-white'>
      <Navbar />
      <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } style={ { flex: 1 } } className='flex flex-col items-center w-full pb-12'>
        <ShimmerContainer isVisible={ bannerLoading } style={ { width: '80%', height: 140 } }>
          <Image
            source={ { uri: banner } }
            className='mx-auto w-full h-full'
            resizeMode='contain'
            onLoad={ () => setBannerLoading(true) }
          />
        </ShimmerContainer>
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
      <Text className='my-8 text-xl text-center text-black'>Get your healthkard</Text>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs text-black'>Name</Text>
        <CustomTextInput value={ userData.name } onChangeText={ value => inputChangeHandler('name', value) } placeholder="Enter your name" />
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View className='w-5/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black mb-1'>Date of Birth</Text>
          <DatePicker
            placeHolder="Select Date"
            width="w-full"
            onChange={ (date) => inputChangeHandler('dateOfBirth', date) }
            value={ userData.dateOfBirth ? new Date(userData.dateOfBirth) : null }
          />
        </View>
        <View className='w-6/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black'>Gender</Text>
          <CustomTextInput value={ userData.gender } onChangeText={ value => inputChangeHandler('gender', value) } placeholder="Enter your gender" />
        </View>
      </View>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs text-black'>Email</Text>
        <CustomTextInput value={ userData.email } onChangeText={ value => inputChangeHandler('email', value) } placeholder="Enter your email" />
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
        <CustomTextInput value={ userData.address } onChangeText={ value => inputChangeHandler('address', value) } placeholder="Enter your address" />
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View className='w-5/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black'>Town/City</Text>
          <CustomTextInput value={ userData.city } onChangeText={ value => inputChangeHandler('city', value) } placeholder="Enter your town/city" />
        </View>
        <View className='w-6/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs text-black'>Pincode</Text>
          <CustomTextInput value={ userData.pincode } onChangeText={ value => inputChangeHandler('pincode', value) } placeholder="Enter your pincode" />
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


const CustomTextInput = ({ value, onChangeText, placeholder }) => {
  return (
    <TextInput value={ value } onChangeText={ onChangeText } placeholder={ placeholder } className='text-black' />
  );
};