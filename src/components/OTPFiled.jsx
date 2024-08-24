import React, {useRef} from 'react'
import { StyleSheet, View } from 'react-native'
import OTPTextView from 'react-native-otp-textinput';


function OTPFiled() {
    const input = useRef(null);
  return (
    <View classNames='w-full'>
      <OTPTextView containerStyle={styles.textInputContainer}/>
    </View>
  )
}

export default OTPFiled

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    borderColor: '#303486',
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
})