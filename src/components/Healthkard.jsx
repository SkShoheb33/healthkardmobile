import React, { useEffect, useState } from 'react'
import { View, Text, Image, Pressable, Alert, Modal, TouchableOpacity, StyleSheet, BackHandler } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from 'src/styles/style';
import httpService from 'src/httpService';
import Navbar from '@components/Navbar';
import Loading from '@components/Loading';
import ShimmerContainer from '@components/ShimmerContainer';
import Input from '@components/Input';
import Button from '@components/Button';
import Heading from '@components/Heading';
import { formatDate } from 'src/helpers/formatData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from './DatePicker';

function Healthkard({ route }) {
    const navigation = useNavigation();
    const { healthId } = route.params;
    const [kard, setKard] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isAgent, setIsAgent] = useState(false);

    const askConfirmation = () => {
        Alert.alert(
            "Delete Health Card",
            "Are you sure you want to delete this health card?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {

                        console.log('Deleting health card');
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const handleEditHealthkard = () => {
        setModalVisible(true);
    };

    const handleSendOtp = () => {
        // TODO: Implement OTP sending logic
        console.log('Sending OTP to', newPhoneNumber);
        setShowOtpInput(true);
    };

    const handleChangeNumber = () => {
        // TODO: Implement phone number change logic
        console.log('Changing phone number to', newPhoneNumber, 'with OTP', otp);
        setModalVisible(false);
        setShowOtpInput(false);
        setNewPhoneNumber('');
        setOtp('');
    };

    useEffect(() => {
        const fetchData = async () => {
            const agentId = await AsyncStorage.getItem('agentId');
            setIsAgent(agentId);
            const result = await httpService.get('users', `?healthId=${healthId}`);
            setKard(result.users[0]);
            setLoading(true);
        }
        fetchData();
    }, [healthId])

    useFocusEffect(
        React.useCallback(() => {
            if (isAgent) {
                const onBackPress = () => {
                    navigation.navigate('Home');
                    return true;
                };

                BackHandler.addEventListener('hardwareBackPress', onBackPress);

                return () =>
                    BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }
        }, [navigation, isAgent])
    );

    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <View style={ { flex: 1 } } className='relative flex h-full justify-center items-center bg-white'>
                { loading ?
                    <View style={ styles.lightGreen } className='w-10/12 flex flex-col justify-center items-center p-4 rounded-md shadow-xl'>

                        <ShimmerContainer
                            isVisible={ imageLoading }
                            style={ { height: 200, width: 150, borderRadius: 10 } }
                        >
                            <Image
                                source={ { uri: kard.image } }
                                className='rounded-lg h-full w-full'
                                onLoad={ () => setImageLoading(true) }
                            />

                        </ShimmerContainer>

                        <Text className='text-xl font-bold text-black'>{ kard.healthId }</Text>
                        <View className='my-6'>
                            <Text className='my-1 text-black'>
                                <Text style={ styles.blueText } className='font-semibold'>Name : </Text>
                                { kard.name }
                            </Text>
                            <Text className='my-1 text-black'>
                                <Text style={ styles.blueText } className='font-semibold'>Gender & DOB : </Text>
                                <Text className='text-capitalize'>{ kard.gender === 'male' || kard.gender === 'm' ? 'Male' : kard.gender === 'female' || kard.gender === 'f' ? 'Female' : kard.gender }</Text>
                                <Text>, { formatDate(kard.dob) }</Text>
                            </Text>
                            { kard.email &&
                                <Text className='my-1 text-black'>
                                    <Text style={ styles.blueText } className='font-semibold'>Email : </Text>
                                    { kard.email }
                                </Text>
                            }
                            { kard.number &&
                                <Text className='my-1 text-black'>
                                    <Text style={ styles.blueText } className='font-semibold'>Phone : </Text>
                                    { kard.number.length === 10
                                        ? `+91 ${kard.number.slice(0, 5)} ${kard.number.slice(5)}`
                                        : `+${kard.number.slice(0, 2)} ${kard.number.slice(2)}`
                                    }
                                </Text>
                            }
                            <Text className='my-1 text-black'>
                                <Text style={ styles.blueText } className='font-semibold'>Address : </Text>
                                { kard.address }, { kard.city }, { kard.pincode }
                            </Text>
                            <View className='flex flex-row w-full items-center justify-between'>
                                <Text className='my-1 text-black'>
                                    <Text style={ styles.blueText } className='font-semibold'>Validity Till : </Text>
                                    <Text>{ formatDate(kard.expireDate) }</Text>
                                </Text>
                                { !isAgent && <Pressable onPress={ () => navigation.navigate('Renewal', { healthId: healthId }) } style={ styles.blue } className='p-2 rounded-md px-4'>
                                    <Text className='text-white'>Renew</Text>
                                </Pressable> }
                            </View>
                            { !isAgent && <View className='flex flex-row justify-between mt-4'>
                                <Pressable onPress={ handleEditHealthkard } style={ styles.blue } className='p-2 rounded-md px-4'>
                                    <Text className='text-white'>Edit HealthKard</Text>
                                </Pressable>
                                <Pressable onPress={ askConfirmation } style={ [styles.bgRed] } className='p-2 rounded-md px-4'>
                                    <Text className='text-white'>Delete</Text>
                                </Pressable>
                            </View> }
                        </View>
                    </View> : <Loading isLoading={ loading } text='Generating Health Card...' /> }
                { isAgent && <Button
                    label="Go to home"
                    onPress={ () => navigation.navigate('Home') }
                    color='green'
                    style='w-1/2 p-4 mx-auto'
                /> }
            </View>
            { !isAgent &&
                <Modal
                    animationType="slide"
                    transparent={ true }
                    visible={ modalVisible }
                    onRequestClose={ () => setModalVisible(false) }
                >
                    <View style={ modalStyles.overlay } className='flex flex-1 justify-end'>
                        <View className='justify-center items-center rounded-t-xl p-4 bg-white'>
                            <Heading label="Change Phone Number" size="text-xl" />

                            <Input
                                placeholder="Enter new phone number"
                                value={ newPhoneNumber }
                                onChangeText={ setNewPhoneNumber }
                                keyboardType="phone-pad"
                            />
                            { !showOtpInput ? (
                                <Button
                                    label="Send OTP"
                                    onPress={ handleSendOtp }
                                    color='blue'
                                />
                            ) : (
                                <>
                                    <Input
                                        placeholder="Enter OTP"
                                        value={ otp }
                                        onChangeText={ setOtp }
                                        keyboardType="numeric"
                                    />
                                    <Button
                                        label="Change Number"
                                        onPress={ handleChangeNumber }
                                        color='blue'
                                    />
                                </>
                            ) }
                            <Button
                                label="Cancel"
                                onPress={ () => setModalVisible(false) }
                                color='red'
                            />
                        </View>
                    </View>
                </Modal>
            }
            { !isAgent && <EditHealthCardModal
                visible={ modalVisible }
                onClose={ () => setModalVisible(false) }
                kard={ kard }
                onSave={ (updatedData) => {
                    setKard(updatedData);
                    setModalVisible(false);
                } }
            /> }
        </View>
    )
}

function EditHealthCardModal({ visible, onClose, kard, onSave }) {
    const [formData, setFormData] = useState({
        dob: kard.dob ? new Date(kard.dob) : null,
        number: kard.number || '',
        email: kard.email || '',
        address: kard.address || '',
    });

    useEffect(() => {
        setFormData({
            dob: kard.dob ? new Date(kard.dob) : null,
            number: kard.number || '',
            email: kard.email || '',
            address: kard.address || '',
        });
    }, [kard]);

    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        if (formData.dob && formData.number && formData.email && formData.address) {
            try {
                const result = await httpService.put('users', kard.healthId, formData);
                onSave(result);
            } catch (error) {
                console.log(error);
            }
        } else {
            Alert.alert("Error", "Please fill all fields before saving.");
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={ true }
            visible={ visible }
            onRequestClose={ onClose }
        >
            <View style={ modalStyles.overlay } className='flex flex-1 justify-end'>
                <View className='justify-center items-center rounded-t-xl p-4 bg-white'>
                    <Heading label="Edit HealthKard" size="text-xl" />
                    <DatePicker
                        placeHolder="Date of Birth"
                        value={ formData.dob }
                        onChange={ (date) => handleChange('dob', date) }
                        width='w-full'
                    />

                    <Input
                        placeholder="Phone Number"
                        value={ formData.number }
                        property='number'
                        inputMode='numeric'
                        onChange={ handleChange }
                        keyboardType="phone-pad"
                    />
                    <Input
                        placeholder="Email ID"
                        value={ formData.email }
                        property='email'
                        onChange={ handleChange }
                        keyboardType="email-address"
                    />
                    <Input
                        placeholder="Address"
                        value={ formData.address }
                        property='address'
                        onChange={ handleChange }
                        multiline
                    />
                    <Button
                        label="Save Changes"
                        onPress={ handleSave }
                        color='blue'
                    />
                    <Button
                        label="Cancel"
                        onPress={ onClose }
                        color='red'
                    />
                </View>
            </View>
        </Modal>
    );
}

const modalStyles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
});

export default Healthkard;
