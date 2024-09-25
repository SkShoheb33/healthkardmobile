import ShimmerContainer from '@components/ShimmerContainer'
import React, { useState, useRef, useEffect } from 'react'
import { Image, ScrollView, View, Dimensions } from 'react-native'
import { colors } from 'src/styles/style';

function Curosols({ list, time = 5000 }) {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentIndex < list.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex(0);
            }
        }, time);

        return () => clearInterval(intervalId);
    }, [currentIndex, list.length]);

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ x: currentIndex * screenWidth, animated: true });
    }, [currentIndex]);

    return (
        <View>
            <ScrollView
                ref={ scrollViewRef }
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={ false }
                className='flex flex-row flex-wrap'
                onMomentumScrollEnd={ (event) => {
                    const contentOffset = event.nativeEvent.contentOffset.x;
                    const index = Math.round(contentOffset / screenWidth);
                    setCurrentIndex(index);
                } }
            >
                { list.map((image, index) => (
                    <View key={ index } style={ { width: screenWidth } }>
                        <ShimmerContainer
                            isVisible={ true }
                            style={ { width: screenWidth, height: 140, alignSelf: 'center' } }
                        >
                            <Image
                                source={ { uri: image } }
                                style={ { width: '100%', height: '100%', alignSelf: 'center' } }
                                resizeMode="contain"
                            />
                        </ShimmerContainer>
                    </View>
                )) }
            </ScrollView>
            <View style={ { flexDirection: 'row', justifyContent: 'center', marginTop: 10 } }>
                { list.map((_, index) => (
                    <View
                        key={ index }
                        style={ {
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: index === currentIndex ? colors.primary : colors.senary,
                            marginHorizontal: 4,
                        } }
                    />
                )) }
            </View>
        </View>
    )
}

export default Curosols
