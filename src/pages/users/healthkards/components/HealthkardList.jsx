import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View, FlatList } from 'react-native';
import { styles } from 'src/styles/style';
import Loading from '@components/Loading';
import ShimmerContainer from '@components/ShimmerContainer';

function HealthkardList({ kards, fetchMoreKards }) {
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreKards = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        await fetchMoreKards();
        setIsLoading(false);
    }, [fetchMoreKards, isLoading]);

    const renderFooter = () => {
        if (!isLoading) return null;
        return <Loading isLoading={ true } />;
    };

    const renderHealthkard = ({ item }) => (
        <Healthkard kard={ item } />
    );

    return (
        <FlatList
            data={ kards }
            renderItem={ renderHealthkard }
            keyExtractor={ (item, index) => item.healthId || index.toString() }
            onEndReached={ loadMoreKards }
            onEndReachedThreshold={ 0.1 }
            ListFooterComponent={ renderFooter }
        />
    );
}

const Healthkard = ({ kard }) => {
    const navigation = useNavigation();
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <Pressable
            onPress={ () => navigation.navigate('Healthkard', { healthId: kard.healthId }) }
            className='my-2 w-11/12 mx-auto p-4 rounded-md border border-gray-300 shadow-xl flex flex-row items-center bg-white'
        >
            <ShimmerContainer
                style={ { width: 80, height: 80 } }
                isVisible={ imageLoaded }>
                <Image
                    source={ { uri: kard.image } }
                    className='w-10 h-10 border rounded-full'
                    style={ { width: 80, height: 80 } }
                    onLoad={ () => setImageLoaded(true) }
                />

            </ShimmerContainer>
            <View className='mx-2'>
                <Text style={ styles.greenText } className='font-semibold my-1'>{ kard.healthId }</Text>
                <Text className='my-1'>{ kard.name }</Text>
                <Text style={ styles.blueText } className='my-1'>
                    Validity till : { (new Date(kard.expireDate)).toLocaleDateString() }
                </Text>
            </View>
        </Pressable>
    );
};

export default HealthkardList;
