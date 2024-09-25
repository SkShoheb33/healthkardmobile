import React, { useState } from 'react';
import { View } from 'react-native';
import Heading from '@components/Heading';
import Input from '@components/Input';
import Button from '@components/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { pickFile } from 'src/helpers/fileupload';
import { styles } from 'src/styles/style';
import UploadedFile from '@components/UploadedFile';

function DoctorForm({ doctor, index, deleteDoctor, onChangeHandler }) {

    const [loading, setLoading] = useState(false);
    const upload = async () => {
        setLoading(true);
        try {
            const url = await pickFile();
            onChangeHandler(doctor.id, 'doctorLicenseURL', url);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <View className='flex-row items-center justify-between'>
                <Heading label={ `Doctor ${index + 1}` } size='text-lg' />
                { index !== 0 && (
                    <Button
                        icon={ faTrashCan }
                        transparent={ true }
                        iconColor='#f00'
                        style='w-fit'
                        onPress={ () => deleteDoctor(doctor.id) }
                    />
                ) }
            </View>
            <View style={ styles.lightGreen } className='p-2 rounded-md'>
                <Input
                    placeholder='Full name'
                    property='name'
                    value={ doctor.name }
                    onChange={ (property, value) => onChangeHandler(doctor.id, property, value) }
                />
                <Input
                    placeholder='Qualification'
                    property='qualification'
                    value={ doctor.qualification }
                    onChange={ (property, value) => onChangeHandler(doctor.id, property, value) }
                />
                <Input
                    placeholder='Phone number'
                    property='number'
                    value={ doctor.number }
                    onChange={ (property, value) => onChangeHandler(doctor.id, property, value) }
                />
                <Input
                    placeholder='Email address'
                    property='email'
                    value={ doctor.email }
                    onChange={ (property, value) => onChangeHandler(doctor.id, property, value) }
                />
                <Input
                    placeholder='License number'
                    property='lisenceNumber'
                    value={ doctor.lisenceNumber }
                    onChange={ (property, value) => onChangeHandler(doctor.id, property, value) }
                />
                {
                    doctor.doctorLicenseURL ?
                        <UploadedFile url={ doctor.doctorLicenseURL } onDelete={ () => onChangeHandler(doctor.id, 'doctorLicenseURL', null) } />
                        : <Button label='Upload license' color='blue' onPress={ upload } loading={ loading } />
                }
            </View>
        </View>
    );
}

export default DoctorForm;
