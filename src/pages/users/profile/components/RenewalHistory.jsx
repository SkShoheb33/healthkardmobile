import Navbar from '@components/Navbar'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Heading from '@components/Heading'
import { CURRENCY } from 'src/pages/strings'

const Payment = ({ payment }) => {
    return (
        <View className='flex-row justify-between items-center border border-gray-200 my-2 p-2 rounded'>
            <View>
                <Text className='text-black text-xs'>Paid for </Text>
                <Text className='text-black text-lg font-bold'>{ payment.plan }</Text>
                <Text className='text-black text-sm'>{ payment.transactionId || 'N/A' }</Text>
                <Text className='text-black text-xs'>Issue Date: { new Date(payment.issueDate).toLocaleDateString() }</Text>
                <Text className='text-black text-xs'>Agent: { payment.agent }</Text>
            </View>
            <View className='items-end'>
                <Text className='text-black text-lg'>{ CURRENCY + ' ' + payment.amount }</Text>
                { payment.paymentStatus ? <Text className='text-green-500'>Success</Text> :
                    <Text className='text-red-500'>Failed</Text> }
            </View>
        </View>
    )
}

function RenewalHistory({ payments }) {
    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <View style={ { flex: 1 } } className='p-2'>
                <Heading label={ 'Payment history' } size={ 'text-xl' } />
                <ScrollView style={ { flex: 1 } }>
                    { payments && payments.length > 0 ? (
                        payments.map((payment, index) => <Payment payment={ payment } key={ index } />)
                    ) : (
                        <Text className='text-black text-center mt-4'>No payments initialized</Text>
                    ) }
                </ScrollView>
            </View>
        </View>
    )
}

export default RenewalHistory