import React from 'react';
import { StyleSheet } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10, // Rounded corners
    borderWidth: 2, // Thickness of the border
    borderColor: '#000', // Border color
    textAlign: 'center', // Center text alignment
    fontSize: 20, // Font size for the digits
    width: 50, // Width of each input field
    height: 50, // Height of each input field
  },
});

const OTPFiled = ({ otpInput, setOtpInput }) => {
  return (
    <OTPTextView
      containerStyle={ styles.textInputContainer }
      textInputStyle={ styles.roundedTextInput }
      handleTextChange={ setOtpInput }
      inputCount={ 4 } // Number of OTP digits
      defaultValue={ otpInput } // Set initial value
    />
  );
};

export default OTPFiled;
