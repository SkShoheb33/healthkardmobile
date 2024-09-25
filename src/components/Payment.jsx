import React, { useState, useCallback, useEffect } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import { CURRENCY } from 'src/pages/strings'
import Dropdown from './DropDown';
import Heading from './Heading';
import Button from './Button';
import Navbar from './Navbar';
import Success from './Success';
import Failed from './Failed';
import { useNavigation } from '@react-navigation/native';
import httpService from 'src/httpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';

function Payment({ route }) {
    const { plan, healthId, userData } = route.params || {};
    const navigation = useNavigation();
    const [isAgentLoggedIn, setIsAgentLoggedIn] = useState(false);

    useEffect(() => {
        const checkAgent = async () => {
            const isAgentLoggedIn = await AsyncStorage.getItem('agentId')
            setIsAgentLoggedIn(!!isAgentLoggedIn);
        }
        checkAgent();
    }, []);
    const [currentPlan, setCurrentPlan] = useState(plan || '3 months');
    const [changePlan, setChangePlan] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const plans_list = [
        { name: '1 month', value: '1 month' },
        { name: '3 months', value: '3 months' },
        { name: '6 months', value: '6 months' },
        { name: '1 year', value: '1 year' }
    ]

    const plans = {
        '1 month': {
            price: 129,
            discount: 30,
            validity: 28
        },
        '3 months': {
            price: 390,
            discount: 93,
            validity: 84
        },
        '6 months': {
            price: 599,
            discount: 100,
            validity: 168
        },
        '1 year': {
            price: 1199,
            discount: 300,
            validity: 336
        },
    }

    const onPlanChange = (plan) => {
        setCurrentPlan(plan);
        setChangePlan(false);
    }

    const pay = async (mode) => {
        setIsProcessing(true);
        if (mode === 'offline') {
            const payment = {
                plan: currentPlan,
                amount: plans[currentPlan]?.price - plans[currentPlan]?.discount,
                transactionId: null,
                issueDate: new Date().toISOString(),
                paymentStatus: true,
                agent: await AsyncStorage.getItem('agentId')
            }

            try {
                if (!healthId) {
                    userData.payments.push(payment);
                    const newUser = await httpService.post('users', userData);
                    navigation.navigate('Healthkard', { healthId: newUser.healthId });
                } else {
                    const updatedUser = await httpService.put('users', healthId, data = { payment });
                    navigation.navigate('Healthkard', { healthId: updatedUser.healthId });
                }
            } catch (error) {
                console.log({ error });
            } finally {
                setIsProcessing(false);
            }
        } else {
            Alert.alert('Warning', 'Please select offline payment mode');
            setIsProcessing(false);
        }

    }

    return (
        <View className='h-screen bg-white'>
            <Navbar />
            { paymentStatus === 'success' && <Success /> }
            { paymentStatus === 'failed' && <Failed /> }
            { !isProcessing && paymentStatus === null
                ? <View style={ { flex: 1 } } className='p-2 flex items-center justify-center'>
                    <Heading style='text-xl text-black' label={ 'Payment Details' } />
                    <View className='border border-gray-400 rounded-md p-2'>
                        <Text className='font-semibold text-black text-lg'>Item details</Text>
                        <View className='flex-row w-full justify-between my-1'>
                            <View className='text-black flex-row items-center'>
                                <Text className='text-black'>Purchased plan</Text>
                                { !changePlan && <Pressable onPress={ () => setChangePlan(true) }>
                                    <Text className='text-blue-700'> (change)</Text>
                                </Pressable> }
                            </View>
                            <Text className='text-black'>{ currentPlan }</Text>
                        </View>
                        <View className='flex-row w-full justify-between my-1'>
                            <Text className='text-black'>Plan price</Text>
                            <Text className='text-black'>{ CURRENCY + ' ' + plans[currentPlan]?.price }</Text>
                        </View>
                        <View className='flex-row w-full justify-between my-1'>
                            <Text className='text-black'>Discount</Text>
                            <Text className='text-black'> - { CURRENCY + ' ' + plans[currentPlan]?.discount }</Text>
                        </View>
                        <View className='flex-row w-full justify-between border-t border-gray-400 pt-2'>
                            <Text className='text-black'>Total</Text>
                            <Text className='text-black'> { CURRENCY + ' ' + (plans[currentPlan]?.price - plans[currentPlan]?.discount) }</Text>
                        </View>
                    </View>
                    <Text className='text-black text-sm'>{ '**Inclusive of all taxes' }</Text>
                    { changePlan && < Dropdown label='Select plan : ' list={ plans_list } value={ currentPlan } setValue={ onPlanChange } /> }
                    <Heading style='text-xl text-black' label={ 'Please select the payment mode' } />
                    { isAgentLoggedIn && <View className='w-full items-center'>
                        <Button label={ 'CASH RECIEVED' } color={ 'blue' } onPress={ () => pay('offline') } />
                        <Text className='text-black'>-- or --</Text>
                    </View> }
                    <Button label={ 'ONLINE PAYMENT' } color={ 'blue' } onPress={ () => pay('online') } />
                </View>
                : <Loading isLoading={ isProcessing } text='Processing...' />
            }
        </View>
    )
}

export default Payment
