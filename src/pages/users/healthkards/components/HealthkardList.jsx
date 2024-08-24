import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { styles } from '../../../../styles/style';

function HealthkardList({kards}) {
  return (
    <ScrollView>
        {
            kards.map((kard,index)=><Healthkard kard={kard} key={index}/>)
        }
    </ScrollView>
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
export default HealthkardList
