import React, { useEffect, useState } from 'react'
import { View, ScrollView,Image, Pressable } from 'react-native'
import HospitalCard from '../components/home/HospitalCard';
import Heading from '../components/ui/Heading';
import httpService from '../httpService';
import Loading from '../components/ui/Loading';
import Navbar from '../components/Navbar';
function Hospitals() {
    const [hospitals,setHospitals] = useState([]);
    const [isLoading,setLoadingStatus] = useState(false);
    useEffect(()=>{
        let fetchData = async()=>{
            setLoadingStatus(true);
            try{
                const result = await httpService.get('hospitals');
                setHospitals(result);
                setLoadingStatus(false);
            }catch(err){
                console.log({err})
            }            
        }
        fetchData();
    },[])
  return (
    <View style={{flex:1}}>
        <Navbar/>
        <ScrollView style={{flex:1}} className="p-1">
            <Heading label="Top pick’s in Narasaraopet" size='text-xl'/>
            {!isLoading?<View className='flex-row flex-wrap pb-6'>
                {hospitals.map((hospital,index)=><HospitalCard key={index} hospital={hospital}/>)}
            </View>:<Loading isLoading={isLoading}/>}
        </ScrollView>
    </View>
  )
}


export default Hospitals
