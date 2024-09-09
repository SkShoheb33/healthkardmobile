import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Navbar from '../../../components/Navbar'
import httpService from '../../../httpService'
import logoSmall from '../../../assets/logo-small.png'
import { styles } from '../../../styles/style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { AGENT_ID } from '../constants'
import { formatData } from 'src/helpers/formatData'
import ShimmerContainer from '@components/ShimmerContainer'

function Hospitals() {
  const [hospitalsAdded, setHospitalsAdded] = useState([]);

  useEffect(() => {
    const fetchHospitalsAdded = async () => {
      const result = await httpService.get(`agents/${AGENT_ID}/hospitals-added`);
      const formattedResult = formatData(result, 'hospitalId');
      setHospitalsAdded(formattedResult);
    };
    fetchHospitalsAdded();
  }, [AGENT_ID]);

  return (
    <View style={ { flex: 1 } } className='bg-white'>
      <Navbar color='blue' />
      <ScrollView style={ { flex: 1 } }>
        <View style={ { flex: 1 } } className='p-2'>
          {
            hospitalsAdded.map((day, index) => {
              return (
                <View key={ index } className='p-2'>
                  <View className='flex-row justify-between'>
                    <Text className='text-black font-semibold text-lg'>{ day.date }</Text>
                    <Text className='text-black'>Count : { day?.hospitalId?.length }</Text>
                  </View>
                  {
                    day?.hospitalId?.map((hospital, index) => <HospitalCard key={ index } hospitalId={ hospital } />)
                  }
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Hospitals

const HospitalCard = ({ hospitalId }) => {
  const [hospital, setHospital] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  useEffect(() => {
    const fetchHospital = async () => {
      const result = await httpService.get(`hospitals/?hospitalId=${hospitalId}`);
      setHospital(result.hospitals[0]);
    }
    fetchHospital();
  }, [hospitalId])

  return (
    <View className='flex-row items-center my-2 p-2 border border-gray-300 rounded-md shadow-xl relative bg-white'>
      { hospital?.isverified === '2'
        ? <Text className='absolute top-1 right-1 rounded-full p-1'>
          <FontAwesomeIcon icon={ faCheck } size={ 12 } color='green' />
        </Text>
        : <Text className='absolute top-1 right-1 rounded-full p-1'>
          <FontAwesomeIcon icon={ faClock } size={ 12 } color='gray' />
        </Text>
      }
      <ShimmerContainer
        style={ { width: 60, height: 60 } }
        isVisible={ imageLoading }
      >
        { hospital?.mediaDetails?.logoURL && <Image style={ { width: 60, height: 60 } } className='rounded-full' source={ { uri: hospital?.mediaDetails?.logoURL } } onLoad={ () => setImageLoading(true) } /> }
      </ShimmerContainer>

      <View className='flex mx-2'>
        <View className='flex-row items-center'>
          <Image source={ logoSmall } className='mr-2' />
          <Text style={ styles.greenText } className=' text-sm'>{ hospitalId }</Text>
        </View>
        <Text className='text-black text-lg font-semibold'>
          { hospital?.hospitalDetails?.hospitalLegalName?.length > 30
            ? hospital?.hospitalDetails?.hospitalLegalName.slice(0, 27) + '...'
            : hospital?.hospitalDetails?.hospitalLegalName }
        </Text>
        <Text className='text-black text-sm'>
          { hospital?.hospitalDetails?.servicesOffered?.slice(0, 3).join(', ') }
          { hospital?.hospitalDetails?.servicesOffered?.length > 3 && '...' }
        </Text>
      </View>
    </View>
  )
}