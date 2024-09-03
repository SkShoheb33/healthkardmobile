import { Alert, Linking, Platform } from "react-native";

export const dialPhoneNumber = (phoneNumber = '919347235528') => {
    // Format phone number with the country code
    const url = Platform.select({
        ios: `tel:${phoneNumber}`, // iOS uses 'tel:' scheme
        android: `tel:+${phoneNumber}`, // Android uses 'tel:+<country code>'
    });

    console.log('Attempting to open URL:', url); // Log URL for debugging

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                console.log('URL is supported, opening:', url); // Log when URL is supported
                return Linking.openURL(url);
            } else {
                console.log('URL is not supported:', url); // Log if URL is not supported
                Alert.alert('Error', 'Unable to open dialer on this device');
            }
        })
        .catch((err) => {
            console.error('An error occurred:', err); // Log error for debugging
            Alert.alert('Error', 'An unexpected error occurred while trying to open the dialer');
        });
};
