import React, { useRef, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ad1 from '../../assets/PNG/AD 1.png'
import { styles } from '../../StyleSheet'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAnglesLeft, faArrowLeftLong, faArrowRightLong, faCamera, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
function NewKard() {
  const navigation = useNavigation();
  const [pageNumber,setPageNumber] = useState(1);
  const [details,setDetails] = useState({});
  const [address,setAddress] = useState({});
  const [plan,setPlan] = useState({});
  const getDetails =(details)=>{
    setDetails(details);
    setPageNumber(2);
  }
  const getAddress =(address)=>{
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
    <View className='flex flex-col items-center w-full'>
      <Pressable onPress={()=>navigation.goBack()} className=' flex flex-row p-2 my-4 w-full' ><FontAwesomeIcon icon={faAnglesLeft}/><Text className='mx-4'>Go Back</Text></Pressable>
      <Image source={Ad1}/>
      <ScrollView  className='h-[500] w-full'>
        {pageNumber===1 && <Form1 sendDetails={getDetails}/>}
        {pageNumber===2 && <Form2 sendAddress={getAddress} goBack={goBack}/>}
        {pageNumber===3 && <Form3 sendPlan={getPlan} goBack={goBack}/>}
      </ScrollView>
    </View>
  )
}
const Form1 = ({sendDetails})=>{
  const [details,setDetails] = useState({});
  return(
    <View className='w-10/12 mx-auto'>
      <Text className='my-8 text-xl text-center'>Get your healthkard</Text>
      <View style={styles.lightGreen} className='w-full p-2 rounded-md my-4'>
        <Text className='text-xs'>Name</Text>
        <TextInput onChange={name=>setDetails({...details,name:name})}/>
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View style={styles.lightGreen} className='w-5/12 p-2 rounded-md'>
          <Text className='text-xs'>Age</Text>
          <TextInput onChange={age=>setDetails({...details,age:age})}/>
        </View>
        <View style={styles.lightGreen} className='w-6/12 p-2 rounded-md'>
          <Text className='text-xs'>Gender</Text>
          <TextInput onChange={gender=>setDetails({...details,gender:gender})}/>
        </View>
      </View>
      <View style={styles.lightGreen} className='w-full p-2 rounded-md my-4'>
        <Text className='text-xs'>Email</Text>
        <TextInput onChange={email=>setDetails({...details,email:email})}/>
      </View>
      <View className='flex-row justify-between my-4'>
        <View><Text>Page 1</Text></View>
        <View></View>
        <TouchableOpacity onPress={()=>sendDetails(details)} style={styles.green} className='py-2 px-4 rounded-md items-center flex-row'><Text className='text-white '>Next </Text><FontAwesomeIcon icon={faArrowRightLong} color='white'/></TouchableOpacity>
      </View>
    </View>
  )
}
const Form2 = ({goBack,sendAddress})=>{
  const [address,setAddress] = useState({});
  return(
    <View className='w-10/12 mx-auto'>
      <Text className='my-8 text-xl text-center'>Get your healthkard</Text>
      <View style={styles.lightGreen} className='w-full p-2 rounded-md my-4'>
        <Text className='text-xs'>Address</Text>
        <TextInput onChange={address=>setAddress({...details,address:address})}/>
      </View>
      <View className='flex flex-row justify-between my-4'>
        <View style={styles.lightGreen} className='w-5/12 p-2 rounded-md'>
          <Text className='text-xs'>Town/City</Text>
          <TextInput onChange={city=>setAddress({...details,city:city})}/>
        </View>
        <View style={styles.lightGreen} className='w-6/12 p-2 rounded-md'>
          <Text className='text-xs'>Pincode</Text>
          <TextInput onChange={pincode=>setAddress({...details,pincode:pincode})}/>
        </View>
      </View>
      <View style={styles.lightGreen} className='w-full p-2 py-4 rounded-md my-4 justify-center flex-row items-center'>
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
    setPlan(selectedPlan);
    // if (payRef.current) {
    //   // payRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //   console.log(payRef.current)
    // }
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
