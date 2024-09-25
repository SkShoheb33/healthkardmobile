import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({ placeHolder = 'Date', width, onChange, value }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);

    useEffect(() => {
        setSelectedDate(value);
    }, [value]);

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
        <View className={ `items-start justify-start bg-white h-12 ${width} border border-gray-200 rounded px-4` }>
            <TouchableOpacity onPress={ showDatePicker } className='h-full w-full items-start'>
                <View className='w-full h-full items-start justify-center'>
                    <Text className={ selectedDate ? 'text-black' : 'text-gray-500' }>
                        { selectedDate ? selectedDate.toLocaleDateString() : placeHolder }
                    </Text>
                </View>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={ isDatePickerVisible }
                mode="date"
                onConfirm={ handleConfirm }
                onCancel={ hideDatePicker }
                date={ selectedDate || new Date() }
            />
        </View>
    );
};

export default DatePicker;
