import React, { useState } from 'react'
import Navbar from '../../../../components/Navbar'
import { ScrollView, View } from 'react-native'
import Button from '../../../../components/ui/Button'
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import HospitalDetails from '../../HospitalRegistrationForms/HospitalDetails'
import DoctorsDetails from '../../HospitalRegistrationForms/DoctorsDetails'
import MediaDetails from '../../HospitalRegistrationForms/MediaDetails'

function HospitalRegistration() {
    const [currentForm, setCurrentForm] = useState('HospitalDetails'); 
    const next = ()=>{
        if(currentForm === 'HospitalDetails'){
            setCurrentForm('DoctorsDetails');
        }else if(currentForm === 'DoctorsDetails'){
            setCurrentForm('MediaDetails');
        }else if(currentForm === 'MediaDetails'){
            return;
        } 
    }
    const prev = ()=>{
        if(currentForm === 'HospitalDetails'){
            return;
        }else if(currentForm === 'DoctorsDetails'){
            setCurrentForm('HospitalDetails');
        }else if(currentForm === 'MediaDetails'){
            setCurrentForm('DoctorsDetails');
        } 
    }
  return (
    <View style={{flex:1}}>
        <Navbar/>
        <ScrollView style={{flex:1}}>
            {currentForm==='HospitalDetails' && <HospitalDetails/>}
            {currentForm ==='DoctorsDetails' && <DoctorsDetails/>}
            {currentForm ==='MediaDetails' && <MediaDetails/>}
            <View className='flex-row justify-between p-2'>
                <Button label='Prev' color='blue' icon={faArrowLeftLong} style='w-1/3 p-4' onPress={prev}/>
                <Button label='Next' color='blue' reverse={true} icon={faArrowRightLong} style='w-1/3 p-4' onPress={next}/>
            </View>
        </ScrollView>
    </View>
  )
}

export default HospitalRegistration
