import { faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { plans } from './constants'
import { styles } from 'src/styles/style'

function Plans({ plan, changePlan = () => { } }) {
    return (
        <View>
            <Text className='my-4 text-xl text-center text-black'>Choose your plan</Text>
            { plans.map((p) => (
                <TouchableOpacity
                    key={ p.id }
                    onPress={ () => changePlan(p.id) }
                    style={ styles.greenBorder }
                    className='flex-row items-center p-4 rounded-md w-full my-1'
                >
                    <FontAwesomeIcon icon={ faCircleDot } color={ plan === p.id ? '#303486' : '#00BFA8' } />
                    <View className='mx-4'>
                        <Text className='text-xl text-black'>{ p.label } <Text className='text-gray-400 text-sm'>{ p.price }</Text></Text>
                        <Text className='text-xs text-black'>Visit all hospitals associated with healthkard for { p.duration }</Text>
                    </View>
                </TouchableOpacity>
            )) }
        </View>
    )
}

export default Plans
