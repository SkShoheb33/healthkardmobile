import React from 'react'
import { ScrollView, View, TextInput, Text } from 'react-native'
import Heading from '../../../../components/Heading'
import Button from '../../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { pickFile } from '../../../../helpers/fileupload'
import { styles } from '../../../../styles/style'

function MediaDetails({ hospital, setHospital }) {

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
    const url = await pickFile();
    onChangeHandler(key, url);
  };

  return (
    <View style={{ flex: 1 }}>
      <Heading label='Media Details' size='text-2xl font-semibold' />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View style={{ flex: 1 }}>
          <View style={{ borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 8 }}>
            <TextInput
              name='description'
              value={hospital?.mediaDetails?.desc}
              onChangeText={(value) => onChangeHandler('desc', value)}
              multiline={true}
              numberOfLines={6}
              placeholder='Hospital description'
              style={{ color: 'black', padding: 8 }}
            />
          </View>
          {hospital?.mediaDetails?.logoURL?.fileName ?
            <View style={{ ...styles.blueBorder, }} className='px-2 py-1 rounded-md border my-2 flex-row justify-between'>
              <Text style={{ ...styles.blueText }}>{hospital?.mediaDetails?.logoURL?.fileName}</Text>
              <TouchableOpacity><Text><FontAwesomeIcon icon={faXmark} /> </Text></TouchableOpacity>
            </View>
            : <Button label='Upload logo' color='blue' onPress={() => upload('logoURL')} />}
          {hospital?.mediaDetails?.hospitalImageURL?.fileName ?
            <View style={{ ...styles.blueBorder, }} className='px-2 py-1 rounded-md border my-2 flex-row justify-between'>
              <Text style={{ ...styles.blueText }}>{hospital?.mediaDetails?.hospitalImageURL?.fileName}</Text>
              <TouchableOpacity><Text><FontAwesomeIcon icon={faXmark} /> </Text></TouchableOpacity>
            </View>
            : <Button label='Upload hospital image' color='blue' onPress={() => upload('hospitalImageURL')} />}
          {hospital?.mediaDetails?.doctorImageURL?.fileName ?
            <View style={{ ...styles.blueBorder, }} className='px-2 py-1 rounded-md border my-2 flex-row justify-between'>
              <Text style={{ ...styles.blueText }}>{hospital?.mediaDetails?.doctorImageURL?.fileName}</Text>
              <TouchableOpacity><Text><FontAwesomeIcon icon={faXmark} /> </Text></TouchableOpacity>
            </View>
            : <Button label='Upload Doctor image' color='blue' onPress={() => upload('doctorImageURL')} />}


          <Heading label='Add some more images (Optional)' size='text-xl font-semibold' />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {
              hospital?.mediaDetails?.achivements[0]?.fileName ?
                <View style={{ alignItems: 'center' }}>

                  <View className=''>
                    <Text>{hospital?.mediaDetails?.achivements[0].fileName}</Text>
                  </View>


                </View>
                : <View>
                  <TouchableOpacity onPress={() => upload('achivements')}>
                    <FontAwesomeIcon icon={faImage} size={100} />
                  </TouchableOpacity>
                  <Heading label='Image 1' size='text-lg font-semibold' />
                </View>
            }
            {
              hospital?.mediaDetails?.achivements[1]?.fileName ?
                <View style={{ alignItems: 'center' }}>
                  <View className=''>
                    <Text>{hospital?.mediaDetails?.achivements[1].fileName}</Text>
                  </View>
                </View>
                :
                <View>
                  <TouchableOpacity onPress={() => upload('achivements')}>
                    <FontAwesomeIcon icon={faImage} size={100} />
                  </TouchableOpacity>
                  <Heading label='Image 2' size='text-lg font-semibold' />
                </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MediaDetails
