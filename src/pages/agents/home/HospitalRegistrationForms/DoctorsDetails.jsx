import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';
import { doctorDetails } from '../constants';
import DoctorForm from './DoctorForm';
import uuid from 'react-native-uuid';

function DoctorsDetails({ hospital, setHospital }) {
    const [doctorList, setDoctorList] = useState(hospital.doctorList);

    useEffect(() => {
        setHospital(prev => ({
            ...prev,
            doctorList: doctorList
        }));
    }, [doctorList]);

    const addOneMoreDoctor = () => {
        setDoctorList(prev => [...prev, {...doctorDetails, id: uuid.v4()}]);
    };

    const deleteDoctor = (id) => {
        setDoctorList(prev => prev.filter(doctor => doctor.id !== id));
    };

    const onChangeHandler = (id, key, value) => {
        setDoctorList(prev => 
            prev.map(doctor => 
                doctor.id === id ? { ...doctor, [key]: value } : doctor
            )
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Heading label='Doctors Details' size='text-2xl font-semibold' />
            <ScrollView style={{ flex: 1 }} className='w-full px-4'>
                <SafeAreaView style={{ flex: 1 }} className='w-full'>
                    {doctorList.map((doctor, index) => (
                        <DoctorForm
                            key={doctor.id} 
                            doctor={doctor} 
                            index={index} 
                            deleteDoctor={deleteDoctor} 
                            onChangeHandler={onChangeHandler} 
                        />
                    ))}
                </SafeAreaView>
                <View className='flex-row items-center justify-between'>
                    <Button label='Add one more doctor' onPress={addOneMoreDoctor} />
                </View>
            </ScrollView>
        </View>
    );
}

export default DoctorsDetails;
