import React, { useEffect, useState } from 'react'
import { Image, Pressable } from 'react-native'
import { ScrollView, Text } from 'react-native'
import { View } from 'react-native'
import { getHospital, getHospitals } from '../../services/HealthkardService';
import { styles } from '../../StyleSheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

function Hospital({route}) {
  const {hospitalId} = route.params;
  const [hospital,setHospital] = useState({});
  const [similarHospitals,setSimilarHospitals] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true);
      const result = await getHospital(hospitalId);
      const hospitals = await getHospitals();
      setSimilarHospitals(hospitals);
      setHospital(result);
      setLoading(false);
    }
    fetchData();
  },[hospitalId])
  return (
    <ScrollView>
      {
        !loading?<View>
          <Image source={{uri:hospital.mediaDetails.hospitalImageURL}} style={{height: 200}} className='w-full'/>
          <View className='p-4'>
            <Text style={styles.blueText} className='text-xl font-bold '>{hospital.hospitalDetails.hospitalLegalName}</Text>
            <Text className=''>{hospital.mediaDetails.desc}</Text>
            <Text className='mt-10 text-xl mb-4'>Specialized In</Text>
            <View className='flex flex-row flex-wrap mb-4'>
              {hospital.hospitalDetails.servicesOffered.map((service,index)=><Service key={index} service={service}/>)}
            </View>
            <Text className='text-xl'>Meet our cheif doctor</Text>
            <ScrollView horizontal>
            {
              hospital.doctorList.map((doctor,index)=><Doctor key={index} doctor={doctor} image={hospital.mediaDetails.doctorImageURL}/>)
            }
            </ScrollView>
            <Text className='text-xl my-2'>Contact Information</Text>
            <Address address={hospital.hospitalDetails.address} number={hospital.hospitalDetails.hospitalNumber} email={hospital.email}/>
            <Text style={styles.blueText} className='text-center my-2'>24x7 available Terms and conditions apply</Text>
            <Text className='my-4 text-xl'>Similar results</Text>
            <ScrollView horizontal>
              {similarHospitals.map((hospital,index)=><HospitalCard key={index} hospital={hospital}/>)}
            </ScrollView>
          </View>
        </View>:<Text>Loading...</Text>
      }
      
    </ScrollView>
  )
}

const Service = ({service})=>{
  return(
    <View style={styles.greenBorder} className='py-2 px-4 border m-1 rounded-full'>
      <Text className='self-start'>{service}</Text>
    </View>
  )
}
const Doctor = ({doctor,image})=>{
  return(
    <View className='py-2 px-4 border border-gray-200 shadow-xl mx-2 rounded-md'>
      <Image source={{uri:image}} style={{height: 300, width: 300}} className='rounded-md'/>
      <Text style={styles.blueText} className='font-semibold my-2'>{doctor.name}</Text>
      <Text>{doctor.qualification}</Text>
    </View>
  )
}
const Address = ({address, number, email})=>{
  return(
    <View className='border border-gray-200 w-11/12 p-2 rounded-md shadow-xl'>
      <View className='w-full my-2 flex flex-row items-center'>
        <FontAwesomeIcon icon={faLocationDot} color='#303486'/>
        <Text style={styles.blueText}  className='mx-2 '>{address.street}, {address.landmark}, {address.city}, {address.code}, {address.state}, {address.country}</Text>
      </View>
      <Pressable style={styles.blue} className='p-2 rounded-md w-fit self-start'><Text className='text-white '>View in maps</Text></Pressable>
      <View className='w-full my-2 flex flex-row items-center'>
        <FontAwesomeIcon icon={faPhone} color='#303486'/>
        <Text style={styles.blueText}  className='w-10/12 mx-2'>{number}</Text>
      </View>
      <View className='w-full my-2 flex flex-row items-center '>
        <FontAwesomeIcon icon={faEnvelope} color='#303486'/>
        <Text style={styles.blueText}  className=' mx-2'>{email}</Text>
      </View>

    </View>
  )
}
function HospitalCard({hospital}){
  const navigation = useNavigation();
  return(
      <Pressable style={{width:250}} onPress={()=>navigation.navigate('Hospital',{hospitalId:hospital.hospitalId})} className=' border-1   items-start border border-gray-300 p-1 rounded-md shadow-xl bg-white '>
          <Image source={{uri:hospital.mediaDetails.hospitalImageURL}} style={{ height: 120 }}  className='w-full'   />
          <Text className='font-semibold text-lg my-1'>{hospital.hospitalDetails.hospitalTradeName}</Text>
          <Text className='my-1'>
              <Text>{hospital.hospitalDetails.address.street}, {hospital.hospitalDetails.address.city}, {hospital.hospitalDetails.address.landmark}, {hospital.hospitalDetails.address.code}, {hospital.hospitalDetails.address.state}, {hospital.hospitalDetails.address.country}</Text>
          </Text>
          <Text className='font-semibold text-md'>Specialized in</Text>
          <View className='flex-row flex-wrap '>
              {hospital.hospitalDetails.servicesOffered.length>1?<View>{hospital.hospitalDetails.servicesOffered.slice(0,1).map((service,index)=><Service key={index} service={service}/>)}<Service service={`${hospital.hospitalDetails.servicesOffered.length-1}+ more`}/></View>:hospital.hospitalDetails.servicesOffered.map((service,index)=><Service key={index} service={service}/>)}
          </View>
      </Pressable>
  )
}
export default Hospital
