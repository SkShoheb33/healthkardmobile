import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { getKards } from '../../services/HealthkardService'
import { styles } from '../../StyleSheet';
import Ad1 from '../../assets/PNG/AD 1.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
function Healthkards() {
    const [kards,setKards] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();
    useEffect(()=>{
        const fetchData = async()=>{
            const k = await getKards();
            setKards(k);
            setLoading(true);
        }
        fetchData();
    },[]);
  return (
    <View style={{flex:1}} className='p-2 bg-white'>
        <Image source={Ad1}/>
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
        {loading?<ScrollView>
            {
                kards.map((kard,index)=><Healthkard kard={kard} key={index}/>)
            }
        </ScrollView>:<Text>Loading...</Text>}
    </View>
  )
}


const Healthkard = ({kard})=>{
    const navigation = useNavigation();
    return(
        <Pressable onPress={()=>navigation.navigate('Healthkard',{healthId:kard.healthId})} className='my-2 w-11/12 mx-auto p-4 rounded-md border border-gray-300 shadow-xl flex flex-row items-center bg-white'>
            <Image source={{uri:kard.image}} className='w-10 h-10 border rounded-full ' style={{width: 80, height: 80}}/>
            <View className='mx-2 '>
                <Text style={styles.greenText} className='font-semibold my-1'>{kard.healthId}</Text>
                <Text className='my-1'>{kard.name}</Text>
                <Text style={styles.blueText} className='my-1'>Validity till : {(new Date(kard.expireDate)).toLocaleDateString()}</Text>
            </View>
        </Pressable>
    )
}

export default Healthkards
