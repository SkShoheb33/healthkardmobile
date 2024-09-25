import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { styles } from 'src/styles/style';
import Address from '@components/Address';
import PhoneNumber from '@components/PhoneNumber';
import Heading from '@components/Heading';
import Button from '@components/Button';
import { openMap } from 'src/helpers/maps';
import { dialPhoneNumber } from 'src/helpers/call';
import { openMailClient } from 'src/helpers/mail';

const ContactBox = ({ address, number, email }) => {
    return (
        <View className='border border-gray-200 w-11/12 p-2 rounded-md shadow-xl'>
            {/* Address Section */ }
            <View className='w-full my-2 flex flex-row items-center'>
                <FontAwesomeIcon icon={ faLocationDot } color='#303486' />
                <Address
                    address={ address }
                    styles='mx-2'
                    color={ styles.blueText }
                />
            </View>
            <Button
                color='blue'
                label='View in maps'
                onPress={ () => {
                    openMap(address.lat, address.lng);
                } }
            />
            {/* Phone Number Section */ }
            <View className='w-full my-2 flex flex-row items-center'>
                <TouchableOpacity
                    onPress={ () => dialPhoneNumber(number) }
                    className='flex flex-row items-center w-full'
                >
                    <FontAwesomeIcon icon={ faPhone } color='#303486' />
                    <PhoneNumber
                        number={ number }
                        style='w-10/12 mx-2'
                        color='blue'
                    />
                </TouchableOpacity>
            </View>
            {/* Email Section */ }
            <TouchableOpacity
                onPress={ () => openMailClient(email) }
                className='w-full my-2 flex flex-row items-center'
            >
                <FontAwesomeIcon icon={ faEnvelope } color='#303486' />
                <Heading
                    label={ email }
                    color='blue'
                    style='mx-2'
                />
            </TouchableOpacity>
        </View>
    );
};

export default ContactBox;
