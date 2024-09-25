import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View } from 'react-native';

const Select = ({ placeholder = { label: 'Select an option...', value: null }, options = [{ label: 'Option 1', value: 'option1' }], selectedValue, setSelectedValue = () => { }, styles = { width: 'w-1/2' } }) => {

  return (
    <View className={ `h-12 rounded bg-white ${styles.width} border border-gray-200` }>
      <RNPickerSelect
        placeholder={ placeholder }
        items={ options }
        onValueChange={ (value) => setSelectedValue(value) }
        value={ selectedValue }
        style={ { inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } } } // Added style prop
      />
    </View>
  );
};
export default Select;