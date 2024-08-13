import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Heading from './Heading';

const DropdownComponent = ({healthIds, healthId, setHealthId}) => {

  return (
    <View style={styles.container} className='flex-row'>
        <Heading label={"Choose Healthkard."} size={'text-md'}/>
        <Picker
            selectedValue={healthId}
            style={styles.picker}
            onValueChange={(itemValue) => setHealthId(itemValue)}
        >
            {
                healthIds.map(healthId=><Picker.Item key={healthId} label={healthId.name} value={healthId.healthId} />)
            }

        </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default DropdownComponent;
