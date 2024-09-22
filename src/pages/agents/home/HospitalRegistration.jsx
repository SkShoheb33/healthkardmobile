import React, { useEffect, useState } from 'react';
import Navbar from 'src/components/Navbar';
import { ScrollView, View, Text, Alert } from 'react-native';
import Button from 'src/components/Button';
import { faArrowLeftLong, faArrowRightLong, faBookmark, } from '@fortawesome/free-solid-svg-icons';
import HospitalDetails from './HospitalRegistrationForms/HospitalDetails';
import DoctorsDetails from './HospitalRegistrationForms/DoctorsDetails';
import MediaDetails from './HospitalRegistrationForms/MediaDetails';
import { initialHospitals } from './constants';
import ErrorBoundary from '@components/ErrorBoundary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpService from 'src/httpService';
import Geolocation from '@react-native-community/geolocation';
import { validateHospitalDetails } from 'src/helpers/validations';

function HospitalRegistration() {
  const [hospital, setHospital] = useState(initialHospitals);
  const [currentForm, setCurrentForm] = useState('HospitalDetails');
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    requestLocationPermission();
    updateButtonStates();
  }, [currentForm])

  const updateButtonStates = () => {
    switch (currentForm) {
      case 'HospitalDetails':
        setLeftButtonDisabled(true);
        setRightButtonDisabled(false);
        break;
      case 'DoctorsDetails':
        setLeftButtonDisabled(false);
        setRightButtonDisabled(false);
        break;
      case 'MediaDetails':
        setLeftButtonDisabled(false);
        setRightButtonDisabled(true);
        break;
    }
  };

  const next = () => {
    if (currentForm === 'HospitalDetails') {
      const validationResult = validateHospitalDetails(hospital.hospitalDetails);
      if (validationResult.isValid) {
        setCurrentForm('DoctorsDetails');
        setValidationErrors({});
      } else {
        setValidationErrors(validationResult.errors);
        Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
      }
    } else if (currentForm === 'DoctorsDetails') {
      setCurrentForm('MediaDetails');
    }
  };

  const prev = () => {
    if (currentForm === 'DoctorsDetails') {
      setCurrentForm('HospitalDetails');
    } else if (currentForm === 'MediaDetails') {
      setCurrentForm('DoctorsDetails');
    }
  };

  const save = async () => {
    try {
      const agentId = await AsyncStorage.getItem('agentId');
      const updatedHospital = {
        ...hospital,
        agentID: agentId
      };
      // console.log('Updated Hospital Details:');
      const response = await httpService.post('hospitals', updatedHospital);

    } catch (error) {
      console.error('Error in save:', error);
    }
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await Geolocation.requestAuthorization();
      if (granted === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setHospital(prevHospital => ({
              ...prevHospital,
              hospitalDetails: {
                ...prevHospital.hospitalDetails,
                address: {
                  ...prevHospital.hospitalDetails.address,
                  lat: latitude,
                  lng: longitude
                }
              }
            }));
          },
          error => {
            console.error('Error getting location:', error);
            Alert.alert('Location Error', 'Unable to get your current location. Please enter it manually.');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to automatically fill in your hospital location. Please enter it manually.');
        // requestLocationPermission();
      }
    } catch (err) {
      console.error('Error requesting location permission:', err);
    }
  };

  return (
    <View style={ { flex: 1 } } className='bg-white'>
      <Navbar color='blue' />
      { error && <Text style={ { color: 'red' } }>{ error }</Text> }
      <ScrollView style={ { flex: 1, } } >
        <ErrorBoundary>
          { currentForm === 'HospitalDetails' &&
            <HospitalDetails
              hospital={ hospital }
              setHospital={ setHospital }
              errors={ validationErrors }
            />
          }
        </ErrorBoundary>
        <ErrorBoundary>
          { currentForm === 'DoctorsDetails' && <DoctorsDetails hospital={ hospital } setHospital={ setHospital } /> }
        </ErrorBoundary>
        <ErrorBoundary>
          { currentForm === 'MediaDetails' && <MediaDetails hospital={ hospital } setHospital={ setHospital } /> }
        </ErrorBoundary>
        <View className="flex-row justify-between w-11/12 mx-auto mt-4">
          <Button
            label="Prev"
            color="blue"
            icon={ faArrowLeftLong }
            style="w-1/3 p-4"
            onPress={ prev }
            disabled={ leftButtonDisabled }
          />
          { !rightButtonDisabled &&
            <Button
              label="Next"
              color="blue"
              reverse={ true }
              icon={ faArrowRightLong }
              style="w-1/3 p-4"
              onPress={ next }
              disabled={ rightButtonDisabled }
            /> }
          { rightButtonDisabled && <Button
            label="Save"
            color="green"
            reverse={ false }
            icon={ faBookmark }
            style="w-1/3 p-4"
            onPress={ save }
          /> }
        </View>
      </ScrollView>
    </View>
  );
}

export default HospitalRegistration;
