import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimePicker = ({ placeHolder = '', width, onChange, value }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
    onChange(time);
  };

  return (
    <View className={ `items-center justify-start bg-white h-12 ${width}` }>
      <TouchableOpacity onPress={ showTimePicker } className='h-full w-full' >
        <View className='w-full h-full items-center justify-center'>
          <Text className='text-black'>{ selectedTime ? selectedTime.toLocaleTimeString() : placeHolder }</Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={ isTimePickerVisible }
        mode="time"
        onConfirm={ handleConfirm }
        onCancel={ hideTimePicker }
      />
    </View>
  );
};

export default TimePicker;
