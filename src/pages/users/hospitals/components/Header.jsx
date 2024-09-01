import React, { useState } from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFilter,
  faLocationDot,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { styles } from 'src/styles/style';

function Header({ location, setLocation, onSearch }) {
  const [showLocation, setShowLocation] = useState(false);

  return (
    <View
      style={ styles.green }
      className="relative w-full flex flex-col p-4 pt-2  items-center justify-center rounded-b-3xl shadow-xl pb-10">
      {/* Location Selection */ }
      <Pressable
        onPress={ () => setShowLocation(true) }
        className="relative flex flex-row p-1 items-center w-full rounded-md bg-white">
        <FontAwesomeIcon icon={ faLocationDot } color="black" size={ 24 } />
        <TextInput
          value={ location }
          readOnly
          className="p-2 w-3/4 text-black"
          placeholder="Select Location"
        />
      </Pressable>

      {/* Search and Filter */ }
      <View className="flex relative flex-row justify-around mt-4 items-center w-full rounded-xl border border-white px-4">
        <FontAwesomeIcon icon={ faSearch } color="white" size={ 24 } />
        <TextInput
          className="p-2 w-3/4 text-white h-full"
          placeholder="Search for Hospital"
          onChangeText={ hospital => onSearch(hospital) }
        />
        <FontAwesomeIcon icon={ faFilter } color="white" size={ 24 } />
        {/* Location Options */ }
        { showLocation && (
          <View className="absolute top-0 w-full bg-white rounded-md p-2 shadow-xl border flex-row flex-wrap border-gray-200 left-0">
            <Pressable
              onPress={ () => {
                setShowLocation(false);
                setLocation('Narasaraopet');
              } }
              style={ styles.greenBorder }
              className="p-2 rounded-md m-2 z-20">
              <Text className="text-black">Narasaraopet</Text>
            </Pressable>
            <Pressable
              onPress={ () => {
                setShowLocation(false);
                setLocation('Guntur');
              } }
              style={ styles.greenBorder }
              className="p-2 rounded-md m-2 z-20">
              <Text className="text-black">Guntur</Text>
            </Pressable>
            <Pressable
              onPress={ () => {
                setShowLocation(false);
                setLocation('Vijayawada');
              } }
              style={ styles.greenBorder }
              className="p-2 rounded-md m-2 z-20">
              <Text className="text-black">Vijayawada</Text>
            </Pressable>
          </View>
        ) }
      </View>
    </View>
  );
}

export default Header;
