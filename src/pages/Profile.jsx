import React, { useEffect, useState } from 'react'
import {View,ScrollView, Text, Image} from 'react-native'
import Heading from '../components/ui/Heading'
import Navbar from '../components/Navbar'
import { faChevronRight, faCalendar,faScroll , faComments} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Header from '../components/profile/Header';
import httpService from '../httpService';
import DropDown from '../components/ui/DropDown';
function Profile() {
    const [healthId,setHealthId] = useState('');
    const [profile,setProfile] = useState({});
    const [healthIds, setHealthIds] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);
    useEffect(()=>{
        const fetchProfile = async()=>{
            setLoadingStatus(true);
            try{
                const result = await httpService.get('users',`?number=${'917842722245'}`);
                setHealthIds(result);
                setLoadingStatus(false);
            }catch(error){
                console.log(error);
            }
        }
        fetchProfile();
    },[])
    useEffect(()=>{
        const fetchProfile = async()=>{
            setLoadingStatus(true);
            try{
                const result = await httpService.get('users',`?healthId=${healthId}`);
                setProfile(result[0]);
                setLoadingStatus(false);
            }catch(error){
                console.log(error);
            }
        }
        fetchProfile();
    },[healthId])
  return (
    <ScrollView style={{flex:1}}>
        <Navbar/>
      <View >
        <View className='flex-row items-center justify-between p-2'>
            <DropDown healthIds={healthIds} setHealthId={setHealthId} healthId={healthId}/>
        </View>
        {!isLoading && profile && <Header image={profile.image} name={profile.name} gender={profile.gender} age={profile.age}/>}
        <Heading label={'Others'}/>
        <Services/>
      </View>
    </ScrollView>
  )
}

function Services (){
    return(
        <View className='w-11/12 mx-auto'>
            <View className='flex-row items-center justify-between border border-gray-300 py-1 px-2 rounded-md my-2'>
                <View className='flex-row items-center'>
                    <FontAwesomeIcon icon={faCalendar} />
                    <Heading label={'Renewal history'} size={'text-xl'}/>
                </View>
                <FontAwesomeIcon icon={faChevronRight} />
            </View>
            <View className='flex-row items-center justify-between border border-gray-300 py-1 px-2 rounded-md my-2'>
                <View className='flex-row items-center'>
                    <FontAwesomeIcon icon={faComments} />
                    <Heading label={'Help and Feedback'} size={'text-xl'}/>
                </View>
                <FontAwesomeIcon icon={faChevronRight} />
            </View>
            <View className='flex-row items-center justify-between border border-gray-300 py-1 px-2 rounded-md my-2'>
                <View className='flex-row items-center'>
                    <FontAwesomeIcon icon={faScroll} />
                    <Heading label={'Terms and conditions'} size={'text-xl'}/>
                </View>
                <FontAwesomeIcon icon={faChevronRight} />
            </View>
        </View>
    )
}
export default Profile
