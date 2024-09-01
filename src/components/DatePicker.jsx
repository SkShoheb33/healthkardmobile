import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({ placeHolder = 'Date', width, onChange, value }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
        onChange(date);
    };

    return (
        <View className={ `items-center justify-start bg-white h-12 ${width} border border-gray-200 rounded` }>
            <TouchableOpacity onPress={ showDatePicker } className='h-full w-full'>
                <View className='w-full h-full items-center justify-center'>
                    <Text className='text-black'>
                        { selectedDate ? selectedDate.toLocaleDateString() : placeHolder }
                    </Text>
                </View>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={ isDatePickerVisible }
                mode="date"
                onConfirm={ handleConfirm }
                onCancel={ hideDatePicker }
            />
        </View>
    );
};

export default DatePicker;
