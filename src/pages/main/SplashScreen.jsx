import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';

function SplashScreen({ onFinish }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(40)).current;
    const splashImage = 'https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Flogo%2FLogo.png?alt=media&token=6636cc55-c1e8-429c-852f-758d32238177';

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            onFinish();
        }, 5000);

        return () => clearTimeout(timer);
    }, [fadeAnim, translateY, onFinish]);

    return (
        <View style={ styles.container }>
            <Animated.View style={ [styles.content, { opacity: fadeAnim, transform: [{ translateY }] }] }>
                <Image
                    source={ { uri: splashImage } }
                    style={ styles.logo }
                    className='w-full h-full'
                    resizeMode="contain"
                />
                <Text style={ styles.text }>HealthKard</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
});

export default SplashScreen;
