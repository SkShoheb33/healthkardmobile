import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'

import Ad1 from '../assets/PNG/AD1.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { getKards } from '../apis/Home';
import HealthkardList from '../components/healthkards/HealthkardList';
import httpService from '../httpService';
import Navbar from '../components/Navbar';
function Healthkards() {
    const [kards,setKards] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();
    useEffect(()=>{
        let fetchData = async()=>{
            setLoading(true);
            try{
                const result = await httpService.get('users',`?number=${'917842722245'}`);
                setKards(result);
                setLoading(false)
            }catch(err){
                console.log({err})
            }
        }
        fetchData();
    },[])
  return (
    <View style={{flex:1}}>
        <Navbar/>
        <View style={{flex:1}} className='p-2 bg-white'>
            <Image source={Ad1} className='mx-auto'/>
            <View className='border my-4 rounded-md flex flex-row items-center'>
                <View className='p-2'>
                    <FontAwesomeIcon icon={faSearch}/>
                </View>
                <TextInput className='p-2 ' placeholder='Search your healthkard'/>
            </View>
            <View className='shadow-xl absolute bottom-10 right-10 bg-[#303486] py-2 px-4 rounded-md z-10 flex flex-row items-center'>
                <FontAwesomeIcon icon={faAdd} color='white'/>
                <Pressable onPress={()=>navigation.navigate("NewKard")}><Text className='text-white mx-2'>Add</Text></Pressable>
            </View>
            {!loading?<HealthkardList kards={kards}/>:<Text>Loading...</Text>}
        </View>
    </View>
  )
}


export default Healthkards
