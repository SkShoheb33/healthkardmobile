import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const sendMobileOTP = async (phoneNumber) => {
    console.log('Sending OTP to:', phoneNumber);
    try {
        const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
        const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
        console.log('OTP sent successfully');
        return confirmation;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};

export async function verifyMobileOTP(confirmation, code) {
    try {
        const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, code);
        const userData = await auth().signInWithCredential(credential);
        return userData.user; // Return the authenticated user
    } catch (error) {
        console.error("Invalid OTP code:", error);
        Alert.alert('Error', 'Invalid OTP. Please try again.');
        throw error;
    }
}

export async function getUserPhoneNumber() {
    const user = await AsyncStorage.getItem('userNumber');
    return user.phoneNumber ? (user.phoneNumber.startsWith('+91') ? user.phoneNumber : `+91${user.phoneNumber}`) : null;
}

