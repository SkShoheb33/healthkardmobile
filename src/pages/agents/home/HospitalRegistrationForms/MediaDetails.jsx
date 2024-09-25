import React, { useState } from 'react'
import { ScrollView, View, TextInput, Text } from 'react-native'
import Heading from '@components/Heading'
import Button from '@components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { pickFile } from 'src/helpers/fileupload'
import { styles } from 'src/styles/style'
import UploadedFile from '@components/UploadedFile'

function MediaDetails({ hospital, setHospital }) {
  const [loadings, setLoadings] = useState({
    logoURL: false,
    hospitalImageURL: false,
    doctorImageURL: false,
    achivements: false
  });

  const onChangeHandler = (key, value) => {
    let achievements = [];
    if (key === 'achivements') {
      achievements = hospital.mediaDetails.achivements || [];
      achievements.push(value);
    }
    setHospital(prev => ({
      ...prev,
      mediaDetails: {
        ...prev.mediaDetails,
        [key]: key === 'achivements' ? achievements : value
      }
    }));
  }

  const upload = async (key) => {
    setLoadings(prev => ({ ...prev, [key]: true }));
    try {
      const url = await pickFile();
      onChangeHandler(key, url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <ScrollView style={ { flex: 1, padding: 12 } }>
      <Heading label='Media Details' size='text-2xl font-semibold' />
      <View style={ { flex: 1 } }>
        <View style={ { borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 8 } }>
          <TextInput
            name='description'
            value={ hospital?.mediaDetails?.desc }
            onChangeText={ (value) => onChangeHandler('desc', value) }
            multiline={ true }
            numberOfLines={ 6 }
            placeholder='Hospital description'
            style={ { color: 'black', padding: 8, textAlignVertical: 'top' } }
          />
        </View>
        { hospital?.mediaDetails?.logoURL ?
          <UploadedFile url={ hospital?.mediaDetails?.logoURL } onDelete={ () => onChangeHandler('logoURL', null) } />
          : <Button label='Upload logo' color='blue' onPress={ () => upload('logoURL') } loading={ loadings.logoURL } /> }
        { hospital?.mediaDetails?.hospitalImageURL ?
          <UploadedFile url={ hospital?.mediaDetails?.hospitalImageURL } onDelete={ () => onChangeHandler('hospitalImageURL', null) } />
          : <Button label='Upload hospital image' color='blue' onPress={ () => upload('hospitalImageURL') } loading={ loadings.hospitalImageURL } /> }
        { hospital?.mediaDetails?.doctorImageURL ?
          <UploadedFile url={ hospital?.mediaDetails?.doctorImageURL } onDelete={ () => onChangeHandler('doctorImageURL', null) } />
          : <Button label='Upload Doctor image' color='blue' onPress={ () => upload('doctorImageURL') } loading={ loadings.doctorImageURL } /> }


        <Heading label='Add some more images (Optional)' size='text-xl font-semibold' />
        <View style={ { flexDirection: 'row', gap: 8 } }>
          {
            hospital?.mediaDetails?.achivements[0]?.fileName ?
              <View style={ { alignItems: 'center' } }>

                <View className=''>
                  <Text>{ hospital?.mediaDetails?.achivements[0].fileName }</Text>
                </View>


              </View>
              : <View className='items-center justify-center'>
                <TouchableOpacity onPress={ () => upload('achivements') }>
                  <FontAwesomeIcon icon={ faImage } size={ 100 } />
                </TouchableOpacity>
                <Heading label='Image 1' size='text-sm' />
              </View>
          }
          {
            hospital?.mediaDetails?.achivements[1]?.fileName ?
              <View style={ { alignItems: 'center' } }>
                <View className=''>
                  <Text>{ hospital?.mediaDetails?.achivements[1].fileName }</Text>
                </View>
              </View>
              :
              <View className='items-center justify-center'>
                <TouchableOpacity onPress={ () => upload('achivements') }>
                  <FontAwesomeIcon icon={ faImage } size={ 100 } />
                </TouchableOpacity>
                <Heading label='Image 2' size='text-sm' />
              </View>
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default MediaDetails
