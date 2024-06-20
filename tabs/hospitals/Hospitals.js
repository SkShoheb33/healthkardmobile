import React, { useEffect, useState } from 'react'
import { View,Text, ScrollView,Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getHospitals } from '../../services/HealthkardService';
function Hospitals() {
    const [hospitals,setHospitals] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        let fetchData = async()=>{
            setLoading(true);
            let result = await getHospitals();
            setHospitals(result)
            setLoading(false);
        }
        fetchData();
    },[])
  return (
    <ScrollView style={{flex:1}} className="p-1">
        <Text className='font-semibold text-xl p-4'>Top pick’s in Narasaraopet</Text>
        {!loading?<View className='flex-row flex-wrap'>
            {hospitals.map((hospital,index)=><HospitalCard key={index} hospital={hospital}/>)}
        </View>:<Text>Loading...</Text>}
    </ScrollView>
  )
}

function HospitalCard({hospital}){
    const navigation = useNavigation();
    return(
        <Pressable onPress={()=>navigation.navigate('Hospital',{hospitalId:hospital.hospitalId})} className=' border-1   items-start border border-gray-300 p-1 rounded-md shadow-xl bg-white w-1/2'>
            <Image source={{uri:hospital.mediaDetails.hospitalImageURL}} style={{ height: 120 }}  className='w-full'   />
            <Text className='font-semibold text-lg my-1'>{hospital.hospitalDetails.hospitalTradeName}</Text>
            <Text className='my-1'>
                <Text>{hospital.hospitalDetails.address.street}, {hospital.hospitalDetails.address.city}, {hospital.hospitalDetails.address.landmark}, {hospital.hospitalDetails.address.code}, {hospital.hospitalDetails.address.state}, {hospital.hospitalDetails.address.country}</Text>
            </Text>
            <Text className='font-semibold text-md'>Specialized in</Text>
            <View className='flex-row flex-wrap '>
                {hospital.hospitalDetails.servicesOffered.length>2?<View>{hospital.hospitalDetails.servicesOffered.slice(0,2).map((service,index)=><Service key={index} service={service}/>)}<Service service={`${hospital.hospitalDetails.servicesOffered.length-2}+ more`}/></View>:hospital.hospitalDetails.servicesOffered.map((service,index)=><Service key={index} service={service}/>)}
            </View>
        </Pressable>
    )
}

const Service = ({service})=>{
    return(
        <View  className=''>
            <Text className='p-2 px-4 border border-blue-400 rounded-2xl m-1 '>
                {service}
            </Text>
        </View>
    )
}
export default Hospitals
