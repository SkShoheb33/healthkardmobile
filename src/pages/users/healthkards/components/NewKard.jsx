import React, { useRef, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ad1 from '../../../../assets/PNG/AD1.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAnglesLeft, faArrowLeftLong, faArrowRightLong, faCamera, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../../../styles/style'
import { KeyboardAvoidingView } from 'react-native'
function NewKard() {
  const navigation = useNavigation();
  const [pageNumber,setPageNumber] = useState(1);
  const [details,setDetails] = useState({});
  const [address,setAddress] = useState({});
  const [plan,setPlan] = useState({});
  const getDetails =(details)=>{
    if(!details.name || !details.age || !details.gender){
      return;
    }
    setDetails(details);
    setPageNumber(2);
  }
  const getAddress =(address)=>{
    if(!address.address || !address.city ||!address.pincode){
      return;
    }
    setAddress(address);
    setPageNumber(3);
  }
  const getPlan =(plan)=>{
    setPlan(plan);
  }
  const goBack = (pageNumber)=>{
    setPageNumber(pageNumber);
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} className='flex flex-col items-center w-full pb-12'>
      <Pressable onPress={()=>navigation.goBack()} className=' flex flex-row p-2 my-4 w-full' ><FontAwesomeIcon icon={faAnglesLeft}/><Text className='mx-4'>Go Back</Text></Pressable>
      <Image source={Ad1}/>
      <ScrollView  className=' w-full'>
        {pageNumber===1 && <Form1 parentDetails ={details} sendDetails={getDetails}/>}
        {pageNumber===2 && <Form2 parentAddress={address} sendAddress={getAddress} goBack={goBack}/>}
        {pageNumber===3 && <Form3 parentPlan={plan} sendPlan={getPlan} goBack={goBack}/>}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const Form1 = ({sendDetails,parentDetails })=>{
  const [details,setDetails] = useState(parentDetails);
  return(
    <View className='w-10/12 mx-auto'>
      <Text className='my-8 text-xl text-center'>Get your healthkard</Text>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs'>Name</Text>
        <TextInput value={details.name} onChange={name=>setDetails({...details,name:name})}/>
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View className='w-5/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs'>Age</Text>
          <TextInput value={details.age} onChange={age=>setDetails({...details,age:age})}/>
        </View>
        <View className='w-6/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs'>Gender</Text>
          <TextInput value={details.gender} onChange={gender=>setDetails({...details,gender:gender})}/>
        </View>
      </View>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs'>Email</Text>
        <TextInput value={details.email} onChange={email=>setDetails({...details,email:email})}/>
      </View>
      <View className='flex-row justify-between my-4'>
        <View><Text>Page 1</Text></View>
        <View></View>
        <TouchableOpacity onPress={()=>sendDetails(details)} style={styles.green} className='py-2 px-4 rounded-md items-center flex-row'><Text className='text-white '>Next </Text><FontAwesomeIcon icon={faArrowRightLong} color='white'/></TouchableOpacity>
      </View>
    </View>
  )
}
const Form2 = ({goBack,sendAddress, parentAddress})=>{
  const [address,setAddress] = useState(parentAddress);
  return(
    <View className='w-10/12 mx-auto'>
      <Text className='my-8 text-xl text-center'>Get your healthkard</Text>
      <View className='w-full p-2 rounded-md my-4 bg-gray-300'>
        <Text className='text-xs'>Address</Text>
        <TextInput value={address.address} onChange={address=>setAddress({...address,address:address})}/>
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View className='w-5/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs'>Town/City</Text>
          <TextInput value={address.city}  onChange={city=>setAddress({...address,city:city})}/>
        </View>
        <View className='w-6/12 p-2 rounded-md bg-gray-300'>
          <Text className='text-xs'>Pincode</Text>
          <TextInput value={address.pincode}  onChange={pincode=>setAddress({...address,pincode:pincode})}/>
        </View>
      </View>
      <View className='w-full p-2 py-4 rounded-md my-4 justify-center flex-row items-center bg-gray-300'>
        <FontAwesomeIcon icon={faCamera} size={20}/>
        <Text className='text-xl mx-2'>Take your picture</Text>
      </View>
      <View className='flex-row justify-between my-4'>
        <TouchableOpacity onPress={()=>goBack(1)} style={styles.green} className='py-2 px-4 rounded-md items-center flex-row'><FontAwesomeIcon icon={faArrowLeftLong} color='white'/><Text className='text-white mx-2'>Prev </Text></TouchableOpacity>
        <View><Text>Page 2</Text></View>
        <TouchableOpacity onPress={()=>sendAddress(address)} style={styles.green} className='py-2 px-4 rounded-md items-center flex-row'><Text className='text-white mx-2'>Next </Text><FontAwesomeIcon icon={faArrowRightLong} color='white'/></TouchableOpacity>
      </View>
    </View>
  )
}
const Form3 = ({goBack,sendPlan}) => {
  const [plan, setPlan] = useState('one month');
  const payRef = useRef(null);

  const changePlan = (selectedPlan) => {
    setPlan({lastPlan: selectedPlan, paymentStatus:false});
  };

  const plans = [
    { id: 'one month', label: 'Monthly plan', price: 'Rs.99/month', duration: '28 days' },
    { id: 'three months', label: 'Three months plan', price: 'Rs.297', duration: '84 days' },
    { id: 'six months', label: 'Six months plan', price: 'Rs.499', duration: '170 days' },
    { id: 'one year', label: 'One year plan', price: 'Rs.899', duration: '1 year' }
  ];

  return (
    <View className='w-10/12 mx-auto'>
      <Text className='my-4 text-xl text-center'>Choose your plan</Text>
      {plans.map((p) => (
        <TouchableOpacity
          key={p.id}
          onPress={() => changePlan(p.id)}
          style={styles.greenBorder}
          className='flex-row items-center p-4 rounded-md w-full my-1'
        >
          <FontAwesomeIcon icon={faCircleDot} color={plan === p.id ? '#303486' : '#00BFA8'} />
          <View className='mx-4'>
            <Text className='text-xl'>{p.label} <Text className='text-gray-400'>{p.price}</Text></Text>
            <Text className='text-xs'>Visit all hospitals associated with healthkard for {p.duration}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <View ref={payRef} className='flex-row justify-between my-4 items-center'>
        <TouchableOpacity onPress={()=>goBack(2)} style={styles.green} className='py-2 px-4 rounded-md items-center flex-row'>
          <FontAwesomeIcon icon={faArrowLeftLong} color='white'/>
          <Text className='text-white mx-2'>Prev </Text>
        </TouchableOpacity>
        <View><Text>Page 3</Text></View>
        <TouchableOpacity onPress={()=>sendPlan(plan)} style={styles.green} className='py-2 px-4 rounded-md items-center flex-row'>
          <Text className='text-white mx-2'>Pay </Text>
          <FontAwesomeIcon icon={faArrowRightLong} color='white'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NewKard
