import React, { useState, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { CURRENCY } from 'src/pages/strings'
import Dropdown from './DropDown';
import Heading from './Heading';
import Button from './Button';
import Navbar from './Navbar';
import Success from './Success';
import Failed from './Failed';
import { useNavigation } from '@react-navigation/native';

function Payment({ route }) {
    const { onlyOnline, plan, healthId } = route.params || {};
    const navigation = useNavigation();

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

    const handlePaymentSuccess = useCallback(() => {
        setPaymentStatus('success');
        console.log('success' + healthId)
        navigation.setParams({ paymentStatus: 'success' });
    }, [navigation]);

    const handlePaymentFailure = useCallback(() => {
        setPaymentStatus('failed');
        console.log('failed' + healthId)
        navigation.setParams({ paymentStatus: 'failed' });
    }, [navigation]);

    const pay = (flag) => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            if (!flag) {
                handlePaymentSuccess();
            } else {
                handlePaymentFailure();
            }
        }, 2000); // Simulate 2 seconds of processing time
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
                    { changePlan && < Dropdown label='Select plan : ' list={ plans_list } value={ currentPlan } setValue={ onPlanChange } /> }
                    <Heading style='text-xl text-black' label={ 'Please select the payment mode' } />
                    { !onlyOnline && <View className='w-full items-center'>
                        <Button label={ 'CASH RECIEVED' } color={ 'blue' } onPress={ () => pay(true) } />
                        <Text className='text-black'>-- or --</Text>
                    </View> }
                    <Button label={ 'ONLINE PAYMENT' } color={ 'blue' } onPress={ () => pay(false) } />
                </View>
                : <Text className='text-black'>Processing payment...</Text> }
        </View>
    )
}

export default Payment
