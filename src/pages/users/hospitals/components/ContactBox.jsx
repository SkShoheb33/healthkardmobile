import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../../../../styles/style';
import Address from '../../../../components/Address';
import PhoneNumber from '../../../../components/PhoneNumber';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';

const ContactBox = ({ address, number, email }) => {
    return (
        <View className='border border-gray-200 w-11/12 p-2 rounded-md shadow-xl'>
            {/* Address Section */}
            <View className='w-full my-2 flex flex-row items-center'>
                <FontAwesomeIcon icon={faLocationDot} color='#303486' />
                <Address
                    address={address}
                    styles='mx-2'
                    color={styles.blueText}
                />
            </View>
            <Button
                color='blue'
                label='View in maps'
            />
            {/* Phone Number Section */}
            <View className='w-full my-2 flex flex-row items-center'>
                <FontAwesomeIcon icon={faPhone} color='#303486' />
                <PhoneNumber
                    number={number}
                    style='w-10/12 mx-2'
                    color='blue'
                />
            </View>
            {/* Email Section */}
            <View className='w-full my-2 flex flex-row items-center'>
                <FontAwesomeIcon icon={faEnvelope} color='#303486' />
                <Heading
                    label={email}
                    color='blue'
                    style='mx-2'
                />
            </View>
        </View>
    );
};

export default ContactBox;
