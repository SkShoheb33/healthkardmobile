import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Navbar from '../../../components/Navbar'
import img1 from '../../../assets/agentHome.png'
import { styles } from '../../../styles/style'
import Button from '../../../components/Button'
import { faHospital, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
function Home() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }} className=''>
            <Navbar />
            <ScrollView style={{ flex: 1 }} className='h-full'>
                <View style={{ flex: 1 }} className='w-full items-center justify-center h-full my-4'>
                    <View className='flex flex-row items-center justify-center gap-2 my-4'>
                        <View>
                            <Text className='text-2xl font-bold'>Welcome,</Text>
                            <Text className='text-xl font-bold'>Shoheb</Text>
                        </View>
                        <View>
                            <Image source={img1} />
                        </View>
                    </View>
                    <View className='w-full justify-center items-center my-4'>
                        <Text style={styles.blueText} className='text-2xl '>Your Progress of</Text>
                        <Text style={styles.blueText} className='text-2xl '>August, 2024</Text>
                    </View>
                    <View className='flex-row justify-around gap-4 my-4'>
                        <View style={styles.blue} className=' w-2/5 p-4 rounded-md'>
                            <Text className='text-xl text-white text-center'>Healthkards</Text>
                            <Text className='text-white text-center text-xl font-bold'>80</Text>
                            <Text className='text-white text-center'>Target : 90</Text>
                        </View>
                        <View style={styles.blue} className=' w-2/5 p-4 rounded-md'>
                            <Text className='text-xl text-white text-center'>Hospitals</Text>
                            <Text className='text-white text-center text-xl font-bold'>5</Text>
                            <Text className='text-white text-center'>Target : 10</Text>
                        </View>
                    </View>
                    <View className='w-full items-center  my-4'>
                        <Button color='green' style='w-11/12 p-4' label='Register user' icon={faUserPlus} onPress={() => navigation.navigate('AgentUserRegistration')} />
                        <Button color='green' style='w-11/12 p-4' label='Onboard hospital' icon={faHospital} onPress={() => navigation.navigate('AgentHospitalRegistration')} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Home
