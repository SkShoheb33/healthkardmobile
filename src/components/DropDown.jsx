import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Heading from './Heading';

const Dropdown = ({ list = [], value, setValue, label = 'Choose Healthkard.' }) => {

  return (
    <View style={ styles.container } className='flex-row w-full justify-center items-center h-9'>
      <Heading label={ label } size={ 'text-md' } />
      <Picker
        selectedValue={ value }
        style={ styles.picker }
        onValueChange={ (itemValue) => setValue(itemValue) }
      >
        {
          list.map(value => <Picker.Item key={ value } label={ value.name } value={ value.value } />)
        }

      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '60%',
  },
  selected: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Dropdown;
