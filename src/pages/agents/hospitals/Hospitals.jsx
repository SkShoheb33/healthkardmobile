import React, { useEffect, useState, useCallback } from 'react'
import { Image, ScrollView, Text, View, RefreshControl } from 'react-native'
import Navbar from '@components/Navbar'
import httpService from 'src/httpService'
import { styles } from 'src/styles/style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { formatData, formateAddress } from 'src/helpers/formatData'
import ShimmerContainer from '@components/ShimmerContainer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '@components/Loading'

function Hospitals() {
  const [hospitalsAdded, setHospitalsAdded] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchHospitalsAdded = async () => {
    try {
      setLoading(true);
      const agentToken = await AsyncStorage.getItem('agentToken');
      const result = await httpService.get(`agents/${agentToken}/hospitals-added`);
      const formattedResult = formatData(result, 'hospitalID');
      setHospitalsAdded(formattedResult);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalsAdded();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHospitalsAdded().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={ { flex: 1 } } className='bg-white'>
      <Navbar color='blue' />
      <ScrollView
        style={ { flex: 1 } }
        refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
        }
      >
        <View style={ { flex: 1 } } className='p-2'>
          {
            loading ? <Loading isLoading={ loading } /> :
              hospitalsAdded?.map((day, index) => {
                return (
                  <View key={ index } className='p-2'>
                    <View className='flex-row justify-between'>
                      <Text className='text-black font-semibold text-lg'>{ day.date }</Text>
                      <Text className='text-black'>Count : { day?.hospitalID?.length }</Text>
                    </View>
                    {
                      day?.hospitalID?.map((hospital, index) => <HospitalCard key={ index } hospitalId={ hospital } />)
                    }
                  </View>
                )
              })
          }
          {
            hospitalsAdded?.length === 0 && <Text className='text-black text-center text-lg'>No hospitals added</Text>
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
  const logoImage = 'https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Flogo%2Flogo-small.png?alt=media&token=b98fada5-c5c8-4002-992c-253b68afb8fe'

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
          <Image source={ { uri: logoImage } } className='mr-2' />
          <Text style={ styles.greenText } className=' text-sm'>{ hospitalId }</Text>
        </View>
        <Text className='text-black text-lg font-semibold'>
          { hospital?.hospitalDetails?.hospitalLegalName?.length > 30
            ? hospital?.hospitalDetails?.hospitalLegalName.slice(0, 27) + '...'
            : hospital?.hospitalDetails?.hospitalLegalName }
        </Text>
        <Text className='text-black text-sm font-semibold'>
          { formateAddress(hospital?.hospitalDetails?.address) }
        </Text>
        <Text className='text-black text-xs'>
          { hospital?.hospitalDetails?.servicesOffered?.slice(0, 3).join(', ') }
          { hospital?.hospitalDetails?.servicesOffered?.length > 3 && '...' }
        </Text>
      </View>
    </View>
  )
}