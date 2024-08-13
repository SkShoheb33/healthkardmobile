import React, {useState} from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import Heading from '../../../components/ui/Heading'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { styles } from '../../../styles/style'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function DoctorsDetails() {
    const [doctorList, setDoctorList] = useState([{}]);
    const addOneMoreDoctor = ()=>{
        setDoctorList(prev=>[...prev,{}])
    }
    const deleteDoctor = (indexOfDoctor)=>{
        let temp = doctorList.filter((doctor,index)=>index!==indexOfDoctor);
        setDoctorList(temp);
    }
  return (
    <View style={{flex:1}}>
        <Heading label='Doctors Details' size='text-2xl font-semibold'/>
        <ScrollView style={{flex:1}} className='w-full px-4'>
            <SafeAreaView  style={{flex:1}} className='w-full'>
                {
                    doctorList.map((doctor, index)=><DoctorForm key={index} doctor={doctor} index={index} deleteDoctor={deleteDoctor}/>)
                }
            </SafeAreaView>
            <View className='flex-row items-center justify-between'>
                <Button label='Add one more doctor' onPress={addOneMoreDoctor}/>
            </View>
        </ScrollView>
    </View>
  )
}

export default DoctorsDetails

function DoctorForm({doctor, index, deleteDoctor}) {
    return(
        <View>
            <View className='flex-row items-center justify-between'>
                <Heading label={`Doctor ${index+1}`} size='text-lg'/> 
                {index!==0 && <Button icon={faTrashCan} transparent={true} iconColor='#f00' style='w-fit' onPress={()=>deleteDoctor(index)}/>  }
            </View>
            <View style={styles.lightGreen} className='p-2 rounded-md'>
                <Input placeholder='Full name'/>
                <Input placeholder='Qualification'/>
                <Input placeholder='Phone number'/>
                <Input placeholder='Email address'/>
                <Input placeholder='License number'/>
                <Button label='Upload license' color='blue'/>
            </View>
        </View>
    )
}