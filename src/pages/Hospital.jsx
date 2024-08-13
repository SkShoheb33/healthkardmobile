import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { ScrollView, Text } from 'react-native'
import { View } from 'react-native'
import { styles } from '../styles/style';
import Service from '../components/home/Service';
import Doctor from '../components/hospitals/Doctor';
import Heading from '../components/ui/Heading';
import ContactBox from '../components/hospitals/ContactBox';
import HospitalCard from '../components/hospitals/HospitalCard';
import httpService from '../httpService';
import Loading from '../components/ui/Loading';
import Navbar from '../components/Navbar';
function Hospital({route}) {
  const {hospitalId} = route.params;
  const [hospital,setHospital] = useState({});
  const [similarHospitals,setSimilarHospitals] = useState([]);
  const [isLoading,setLoadingStatus] = useState(true);
  useEffect(()=>{
    const fetchData = async()=>{
      setLoadingStatus(true);
      const result = await httpService.get('hospitals',`?hospitalId=${hospitalId}`);
      setHospital(result[0]);
      const hospitals = await httpService.get('hospitals');
      setSimilarHospitals(hospitals);
      setLoadingStatus(false);
    }
    fetchData();
  },[hospitalId])
  return (
    <View>
      <Navbar/>
      <ScrollView>
        {
          !isLoading && hospital.mediaDetails ?<View>
            <Image source={{uri:hospital.mediaDetails.hospitalImageURL}} style={{height: 200}} className='w-full'/>
            <View className='p-4'>
              <Heading color='blue' label={hospital.hospitalDetails.hospitalLegalName} size={'text-xl'}/>
              <Heading label={hospital.mediaDetails.desc}/>
              <Heading label={'Specialized In'} size={'text-xl'} style={'mt-5 mb-4'}/>
              <View className='flex flex-row flex-wrap mb-4'>
                {hospital.hospitalDetails.servicesOffered.map((service,index)=><Service key={index} service={service}/>)}
              </View>
              <Text className='text-xl'>Meet our cheif doctor</Text>
              <ScrollView horizontal>
                {
                  hospital.doctorList.map((doctor,index)=><Doctor key={index} doctor={doctor} image={hospital.mediaDetails.doctorImageURL}/>)
                }
              </ScrollView>
              <Heading label={'Contact Information'} size={'text-xl'}/>
              <ContactBox address={hospital.hospitalDetails.address} number={hospital.hospitalDetails.hospitalNumber} email={hospital.email}/>
              <Heading label={'24x7 available Terms and conditions apply'} color='blue' style={'text-center my-2'}/>
              <Heading label={'Similar results'} size={'text-xl'} style={'my-4'}/>
              <ScrollView horizontal>
                {similarHospitals.map((hospital,index)=><HospitalCard key={index} hospital={hospital}/>)}
              </ScrollView>
            </View>
          </View>:<Loading isLoading={isLoading}/>
        }
        
      </ScrollView>
    </View>
  )
}



export default Hospital
