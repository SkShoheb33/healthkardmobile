import Navbar from '@components/Navbar'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { payments } from '../constants'
import Heading from '@components/Heading'
import { CURRENCY } from 'src/pages/strings'

const Payment = ({ payment }) => {
    return (
        <View className='flex-row justify-between items-center border border-gray-200 my-2 p-2 rounded'>
            <View>
                <Text className='text-black text-xs'>Paid for </Text>
                <Text className='text-black text-lg font-bold'>{ payment.healthId } </Text>
                <Text className='text-black text-sm'>{ payment.transactionId } </Text>
            </View>
            <View className='items-end'>
                <Text className='text-black text-lg'>{ CURRENCY + ' ' + payment.amount }</Text>
                { payment.paymentStatus ? <Text className='text-green-500'>Success</Text> :
                    <Text className='text-red-500'>Failed</Text> }
            </View>
        </View>
    )
}

function RenewalHistory() {
    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <Heading label={ 'Payment history' } size={ 'text-xl' } />
            <ScrollView style={ { flex: 1 } } className='p-2'>
                {
                    payments.map((payment, index) => <Payment payment={ payment } key={ index } />)
                }
            </ScrollView>
        </View>
    )
}

export default RenewalHistory