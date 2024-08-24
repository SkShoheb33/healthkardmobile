import React, { useEffect, useState } from 'react'
import { View,Text, Image, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../styles/style';
import httpService from '../../../../httpService';

function Healthkard({route}) {
    const navigation = useNavigation();
    const {healthId} = route.params;
    const [kard,setKard] = useState({});
    const [loading,setLoading] = useState(false);
    useEffect (()=>{
        const fetchData = async()=>{
            const result = await httpService.get('users',`?healthId=${healthId}`);
            setKard(result[0]);
            setLoading(true);
        }
        fetchData();
    },[healthId])

  return (
    <View className='relative flex h-full justify-center items-center bg-white'>
        <Pressable onPress={()=>navigation.goBack()} className='absolute top-4 left-4 flex flex-row items-center' ><FontAwesomeIcon icon={faAnglesLeft}/><Text className='mx-4'>Go Back</Text></Pressable>
        {loading?<View style={styles.lightGreen} className='w-10/12 flex flex-col justify-center items-center p-4 rounded-md shadow-xl'>
            <Image source={{uri:kard.image}} className='rounded-lg' style={{width: 150, height: 200}}/>
            <Text className='text-2xl font-bold'>{kard.healthId}</Text>
            <View className='my-6'>
                <Text className='my-1 '>{kard.name}</Text>
                <Text className='my-1 '>{kard.gender}, {kard.age}</Text>
                {kard.email && <Text className='my-1 '>{kard.email}</Text>}
                {kard.number && <Text className='my-1 '>{`+${kard.number.slice(0,2)} ${kard.number.slice(2)}`}</Text>}
                <Text className='my-1 '>{kard.address}, {kard.city}, {kard.pincode}</Text>
                <Text className='my-1 '><Text style={styles.blueText}>Last Plan : </Text>{kard.lastPlan}</Text>
                <View className='flex flex-row items-center justify-between'>
                    <Text className='my-1 '><Text style={styles.blueText}>Validity Till :</Text> {kard.paymentStatus? <Text>{(new Date(kard.expireDate)).toLocaleDateString()}</Text>:<Text className='text-red-500'>Invalid</Text>}</Text>
                    <Pressable style={styles.blue} className='p-2 rounded-md px-4 text-lg mx-4'><Text className='text-white'>Renew</Text></Pressable>
                </View>
            </View>
        </View>:<Text>Loading...</Text>}
    </View>
  )
}

export default Healthkard
