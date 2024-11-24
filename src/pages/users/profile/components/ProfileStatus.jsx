import Button from '@components/Button'
import Camera from '@components/Camera'
import { useNavigation } from '@react-navigation/native'
import Input from '@components/Input'
import Select from '@components/Select'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { faCamera, faCheck, faDatabase, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, Modal } from 'react-native'
import httpService from 'src/httpService'
import { userValidation } from 'src/helpers/validations'

function ProfileStatus({ number }) {
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [takePictureModalVisible, setTakePictureModalVisible] = useState(false);
    const [step, setStep] = useState(0)
    const navigation = useNavigation();
    const [user, setUser] = useState({
        registered: false,
        expireDate: new Date(),
        dob: new Date(),
        gender: 'male',
        address: '',
        city: '',
        pincode: ''
    })
    useEffect(() => {
        const fetchUser = async () => {
            const user = await httpService.get(`users/unregistered/${number}`);
            setUser(user);
            if (!user.name) {
                await httpService.put('users/unregistered', number, { name: await AsyncStorage.getItem('userName') || '' })
            }
            if (user.registered) {
                setStep(2)
            } else if (user.image) {
                setStep(1)
            } else {
                setStep(0)
            }
        }
        fetchUser()
    }, [])

    const handleTakePicture = async (imageUrl) => {
        if (imageUrl) {
            const newUser = {
                ...user,
                email: await AsyncStorage.getItem('userEmail') || '',
                number: number,
                name: await AsyncStorage.getItem('userName') || '',
                image: imageUrl
            }
            setUser(newUser)
            try {
                await httpService.put('users/unregistered', number, newUser)
                setStep(1)
                setTakePictureModalVisible(false)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleEnterDetails = () => {
        setDetailsModalVisible(true)
    }

    const handlePay = async () => {

        try {
            const updatedUserData = {
                ...user,
                type: 'new',
            };
            setUser(updatedUserData);
            navigation.navigate('Pay', {
                plan: '1 month',
                healthId: user.healthId,
                userData: updatedUserData
            });
        } catch (error) {
            console.error('Error in handlePayAndSubmit:', error);
        }

    }

    const handleDataEntered = async (data) => {
        const newUser = {
            ...data,
            registered: true,
        }
        setUser(newUser)
        try {
            await httpService.put('users/unregistered', number, newUser);
            setDetailsModalVisible(false)
            setStep(2)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View className='flex-row border items-center p-2 justify-between border-gray-300'>
            <View className='h-20 w-20 rounded-full bg-red-500 items-center justify-center'>
                <Text className='text-white text-2xl font-bold'>
                    { step === 0 ? '0%' : step === 1 ? '50%' : '100%' }
                </Text>
            </View>
            <View className='flex-1 mx-2'>
                <Text className='text-black text-lg font-bold'>Complete your profile to get started</Text>
                <View className='flex-row items-start'>
                    <View className='flex-col items-center'>
                        <FontAwesomeIcon icon={ step === 0 ? faFaceSmile : !(step > 0) ? faCamera : faCheck } size={ 16 } color={ !(step > 0) ? '#000' : '#00F' } />
                        <Text className='text-xs'>Picture</Text>
                    </View>
                    <View className='flex-col items-center mx-4'>
                        <FontAwesomeIcon icon={ step === 0 ? faDatabase : !(step > 1) ? faDatabase : faCheck } size={ 16 } color={ !(step > 1) ? '#000' : '#00F' } />
                        <Text className='text-xs'>Data</Text>
                    </View>
                    <View className='flex-col items-center'>
                        <FontAwesomeIcon icon={ step === 0 ? faDatabase : !(step > 2) ? faMoneyBill1Wave : faCheck } size={ 16 } color={ !(step > 2) ? '#000' : '#00F' } />
                        <Text className='text-xs'>Pay</Text>
                    </View>
                </View>
                { step === 0 && <Button label='Take Picture' style='w-full px-2 h-10' color='blue' onPress={ () => setTakePictureModalVisible(true) } /> }
                { step === 1 && <Button label='Enter details' style='w-full px-2 h-10' color='blue' onPress={ handleEnterDetails } /> }
                { step === 2 && <Button label='Pay' style='w-full px-2 h-10' color='blue' onPress={ handlePay } /> }
            </View>
            <DetailsModal dataEntered={ handleDataEntered } user={ user } modalVisible={ detailsModalVisible } setModalVisible={ setDetailsModalVisible } />
            <TakePictureModal takePicture={ handleTakePicture } modalVisible={ takePictureModalVisible } setModalVisible={ setTakePictureModalVisible } />
        </View>
    )
}

export default ProfileStatus

const TakePictureModal = ({ takePicture, modalVisible, setModalVisible }) => {
    return <Modal
        animationType="slide"
        transparent={ true }
        visible={ modalVisible }
        onRequestClose={ () => setModalVisible(false) }
    >
        <View className="flex-1 justify-center items-center bg-black/50">
            <View className='bg-white p-4 rounded-lg w-11/12 flex-col items-center'>
                <Camera getImage={ takePicture } width='w-10/12' />
                <Button label='Cancel' style='w-24 h-10' color='red' onPress={ () => setModalVisible(false) } />
            </View>
        </View>
    </Modal>
}

const DetailsModal = ({ dataEntered, user, modalVisible, setModalVisible }) => {
    const [formData, setFormData] = useState(user || {
        dob: new Date(),
        gender: 'male',
        address: '',
        city: '',
        pincode: ''
    });
    useEffect(() => {
        setFormData(user)
    }, [user])

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <Modal
            animationType="slide"
            transparent={ true }
            visible={ modalVisible }
            onRequestClose={ () => setModalVisible(false) }
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-4 rounded-lg w-11/12">
                    <Text className="text-xl font-bold text-black mb-4">Enter Details</Text>

                    {/* <DatePicker
                        placeHolder="Date of Birth"
                        width="w-full"
                        value={ formatDate(formData.dob) }
                        onChange={ (date) => handleChange('dob', date) }
                    /> */}
                    <View className='flex-row items-center justify-between my-2'>
                        <Text className='text-black'>Gender</Text>
                        <Select
                            placeholder={ { label: 'Gender', value: null } }
                            value={ formData.gender }
                            property="gender"
                            onChange={ handleChange }
                            width="w-full"
                            options={ [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] }
                        />
                    </View>

                    <Input
                        placeholder="Address"
                        value={ formData.address }
                        property="address"
                        onChange={ handleChange }
                        width="w-full"
                    />

                    <Input
                        placeholder="City"
                        value={ formData.city }
                        property="city"
                        onChange={ handleChange }
                        width="w-full"
                    />

                    <Input
                        placeholder="Pincode"
                        value={ formData.pincode }
                        property="pincode"
                        onChange={ handleChange }
                        width="w-full"
                        inputMode="numeric"
                    />

                    <View className="flex-row justify-end mt-4">
                        <Button
                            label="Cancel"
                            style="w-24 h-10 mr-2"
                            color="red"
                            onPress={ () => setModalVisible(false) }
                        />
                        <Button
                            label="Submit"
                            style="w-24 h-10"
                            color="blue"
                            onPress={ () => dataEntered(formData) }
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );

}

