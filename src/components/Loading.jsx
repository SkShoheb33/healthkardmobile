import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';

function Loading({ isLoading, text = 'Please Wait...' }) {
  if (!isLoading) return null;

  return (
    <View style={ styles.container } className=''>
      <Spinner
        isVisible={ true }
        size={ 50 }
        type="ChasingDots"
        color="#303486"
      />
      <Text style={ styles.text }>{ text }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginTop: 10,
    color: '#303486',
    fontSize: 16,
  },
});

export default Loading;
