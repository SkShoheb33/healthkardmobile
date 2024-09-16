import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export async function sendOTP(phoneNumber) {
    try {
        const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
        return confirmation; // Save this confirmation object for later verification
    } catch (error) {
        Alert.alert('Error', 'Failed to send otp, please try again');
        console.error("Failed to send OTP:", error);
        throw error;
    }
}

export async function verifyOTP(confirmation, code) {
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
    return user.phoneNumber;
}   
