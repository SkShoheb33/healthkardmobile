import { Alert, Linking, Platform } from "react-native";

export const dialPhoneNumber = (phoneNumber = '919876543210') => {
    // Format phone number with the country code
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    const url = Platform.select({
        ios: `telprompt:${formattedNumber}`,
        android: `tel:${formattedNumber}`,
    });

    console.log('Attempting to open URL:', url);

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                console.log('URL is supported, opening:', url);
                return Linking.openURL(url);
            } else {
                console.log('URL is not supported:', url);
                throw new Error('Dialer not supported on this device');
            }
        })
        .then(() => {
            console.log('Dialer opened successfully');
        })
        .catch((err) => {
            console.error('An error occurred:', err);
            Alert.alert('Error', `Unable to open dialer: ${err.message}`);
        });
};
