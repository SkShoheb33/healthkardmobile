import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Plans from '@components/Plans'
import Navbar from '@components/Navbar'
import Button from '@components/Button'

function Renewal({ route }) {

    const { healthId } = route.params || {};
    const [plan, setPlan] = useState('1 month');
    const changePlan = (selectedPlan) => {
        setPlan(selectedPlan);
    };

    const navigation = useNavigation();

    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <SafeAreaView style={ { flex: 1 } } className='w-10/12 mx-auto items-center justify-center'>
                <Plans plan={ plan } changePlan={ changePlan } />
                <Button onPress={ () => { navigation.navigate('Pay', { onlyOnline: true, plan: plan, healthId: healthId }) } } label="Pay" color='blue' />
            </SafeAreaView>
        </View>
    )
}

export default Renewal
