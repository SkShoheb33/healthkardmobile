import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { ScrollView, View } from 'react-native';
import Button from '../../../components/Button';
import {
  faArrowLeftLong,
  faArrowRightLong,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import HospitalDetails from './HospitalRegistrationForms/HospitalDetails';
import DoctorsDetails from './HospitalRegistrationForms/DoctorsDetails';
import MediaDetails from './HospitalRegistrationForms/MediaDetails';

function HospitalRegistration() {
  const [hospital, setHospital] = useState({
    hospitalId: '',
    email: '',
    isverified: '0',
    agentID: 'Agent id',
    hospitalDetails: {
      daysAvailabilty: [false, true, true, true, true, true, true],
      from: '',
      gstNumber: '',
      hospitalGSTFile: '',
      hospitalLegalName: '',
      hospitalLicense: '',
      hospitalNumber: '',
      hospitalOwnerContactNumber: '',
      hospitalOwnerEmail: '',
      hospitalOwnerFullName: '',
      hospitalTradeName: '',
      licenseNumber: '',
      address: {
        lat: '',
        lng: '',
        city: '',
        code: '',
        country: '',
        landmark: '',
        state: '',
        street: '',
      },
      typeOfHospital: '',
      servicesOffered: [],
      to: '',
    },
    doctorList: [
      {
        doctorLicenseURL: '',
        email: '',
        lisenceNumber: '',
        name: '',
        number: '',
        qualification: '',
      },
    ],
    mediaDetails: {
      achivements: [],
      desc: '',
      doctorImageURL: '',
      hospitalImageURL: '',
      logoURL: '',
    },
    users: [],
  });
  const [currentForm, setCurrentForm] = useState('HospitalDetails');
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);

  useEffect(() => {
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
  }, [currentForm])
  const next = () => {
    if (currentForm === 'HospitalDetails') {

      setCurrentForm('DoctorsDetails');
    } else if (currentForm === 'DoctorsDetails') {

      setCurrentForm('MediaDetails');
    } else if (currentForm === 'MediaDetails') {

      return;
    }
  };
  const prev = () => {
    if (currentForm === 'HospitalDetails') {
      return;
    } else if (currentForm === 'DoctorsDetails') {
      setCurrentForm('HospitalDetails');
    } else if (currentForm === 'MediaDetails') {
      setCurrentForm('DoctorsDetails');
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView style={{ flex: 1 }}>
        {currentForm === 'HospitalDetails' && <HospitalDetails hospital={hospital} setHospital={setHospital} />}
        {currentForm === 'DoctorsDetails' && <DoctorsDetails hospital={hospital} setHospital={setHospital} />}
        {currentForm === 'MediaDetails' && <MediaDetails hospital={hospital} setHospital={setHospital} />}
        <View className="flex-row justify-between p-2">
          <Button
            label="Prev"
            color="blue"
            icon={faArrowLeftLong}
            style="w-1/3 p-4"
            onPress={prev}
            disabled={leftButtonDisabled}
          />
          {!rightButtonDisabled && <Button
            label="Next"
            color="blue"
            reverse={true}
            icon={faArrowRightLong}
            style="w-1/3 p-4"
            onPress={next}
            disabled={rightButtonDisabled}
          />}
          {rightButtonDisabled && <Button
            label="Save"
            color="green"
            reverse={false}
            icon={faBookmark}
            style="w-1/3 p-4"
            onPress={next}
          />}
        </View>
      </ScrollView>
    </View>
  );
}

export default HospitalRegistration;
