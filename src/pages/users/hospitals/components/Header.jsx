import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFilter,
  faLocationDot,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { styles } from 'src/styles/style';
import { SERVICES, CITIES } from 'src/pages/users/home/constants';
import { useUserSharedData } from 'src/context/UserSharedDataContext';

function Header({ location, setLocation, onSearch }) {
  const { updateUserData } = useUserSharedData();
  const [showLocation, setShowLocation] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    updateUserData({ service: selectedService });
  }, [selectedService]);

  const handlePressOutside = () => {
    if (showLocation) {
      setShowLocation(false);
    }
  };
  useEffect(() => {
    if (showLocation) {
      const timer = setTimeout(() => {
        setShowLocation(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showLocation]);

  return (
    <TouchableWithoutFeedback onPress={ handlePressOutside }>
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
          <Pressable onPress={ () => setShowFilter(true) }>
            <FontAwesomeIcon icon={ faFilter } color="white" size={ 24 } />
          </Pressable>

          {/* Location Options */ }
          { showLocation && (
            <TouchableWithoutFeedback>
              <View className="absolute top-0 w-full bg-white rounded-md p-2 shadow-xl border flex-row flex-wrap border-gray-200 left-0 z-20">
                { CITIES.map((city, index) => {
                  return (
                    <Pressable
                      onPress={ () => {
                        setShowLocation(false);
                        setLocation(city);
                      } }
                      style={ styles.greenBorder }
                      key={ index }
                      className="p-2 rounded-md m-1 z-20">
                      <Text className="text-black text-xs">{ city }</Text>
                    </Pressable>
                  )
                }) }
              </View>
            </TouchableWithoutFeedback>
          ) }
        </View>

        {/* Filter Modal */ }
        <Modal
          animationType="slide"
          transparent={ true }
          visible={ showFilter }
          onRequestClose={ () => setShowFilter(false) }
        >
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl p-4">
              <Text className="text-xl font-bold mb-4 text-black">Select Services</Text>
              <View className="flex-row flex-wrap">
                { SERVICES.map((service, index) => (
                  <Pressable
                    key={ index }
                    onPress={ () => {
                      setSelectedService(service);
                      setShowFilter(false);
                    } }
                    style={ [
                      styles.greenBorder,
                      selectedService === service && styles.selectedService
                    ] }
                    className="p-2 rounded-md m-2"
                  >
                    <Text className="text-black">{ service }</Text>
                  </Pressable>
                )) }
              </View>
              <Pressable
                onPress={ () => setShowFilter(false) }
                className="mt-4 p-2 bg-red-500 rounded-md"
              >
                <Text className="text-white text-center">Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Header;
