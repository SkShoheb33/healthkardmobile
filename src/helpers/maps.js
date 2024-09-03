import { Linking, Alert } from "react-native";

export const openMap = () => {
    const lat = 37.7749;
    const lng = -122.4194;

    // Define URLs for Google Maps and Apple Maps
    const googleMapsUrl = `google.navigation:q=${lat},${lng}`;
    const appleMapsUrl = `maps:0,0?q=${lat},${lng}`;
    const webMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

    // Try Google Maps URL scheme
    Linking.canOpenURL(googleMapsUrl)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(googleMapsUrl);
            } else {
                // Fall back to Apple Maps URL scheme
                return Linking.canOpenURL(appleMapsUrl)
                    .then((supported) => {
                        if (supported) {
                            return Linking.openURL(appleMapsUrl);
                        } else {
                            // Fall back to web maps if neither app is installed
                            return Linking.openURL(webMapsUrl);
                        }
                    });
            }
        })
        .catch((err) => {
            console.error('An error occurred', err);
            Alert.alert('Error', 'Unable to open the map');
        });
};
