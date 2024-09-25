import { Alert, Linking, Platform } from "react-native";

export const dialPhoneNumber = (phoneNumber = '919876543210') => {
    // Format phone number with the country code
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

    if (Platform.OS === 'android') {
        const url = `tel:${formattedNumber}`;
        Linking.openURL(url)
            .catch(err => {
                console.error('Error opening dialer on Android:', err);
                // Try an alternative method
                return Linking.openURL(`market://details?id=com.android.dialer`);
            })
            .catch(err => {
                console.error('Error opening Play Store:', err);
                Alert.alert('Error', `Unable to open dialer: ${err.message}`);
            });
    } else if (Platform.OS === 'ios') {
        const url = `tel:${formattedNumber}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    throw new Error('Phone dialer is not available');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(err => {
                console.error('Error opening dialer on iOS:', err);
                Alert.alert('Error', `Unable to open dialer: ${err.message}`);
            });
    } else {
        console.error('Unsupported platform');
        Alert.alert('Error', 'Dialing is not supported on this platform');
    }
};
