import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

function MobileInput({ autoFocus = false, styles = { width: 'w-full' } }) {
    const phoneInput = useRef(null);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [isLimitExceeded, setIsLimitExceeded] = useState(false);
    useEffect(()=>{
        console.log({value})
    },[value])

    const handleTextChange = (text) => {
        const cleanedText = text.replace(/\D/g, '');
        if (cleanedText.length <= 10) {
            setValue(text);
            setIsLimitExceeded(false);
        } else {
            setIsLimitExceeded(true);
        }
    };

    const handleFormattedTextChange = (text) => {
        const cleanedText = text.replace(/\D/g, '');
        if (cleanedText.length <= 12) {
            setFormattedValue(text);
            setIsLimitExceeded(false);
        } else {
            setIsLimitExceeded(true);
        }
    };

    return (
        <View className={`my-2 ${styles.width} items-center rounded bg-black p-0`}>
            <PhoneInput
                ref={phoneInput}
                value={value}
                defaultCode="IN"
                layout="first"
                onChangeText={handleTextChange}
                onChangeFormattedText={handleFormattedTextChange}
                autoFocus={autoFocus}
                containerStyle={{ backgroundColor: '#fff' }}
                textContainerStyle={{ backgroundColor: '#fff', height: '100%' }}
                textInputStyle={{ color: '#000' }}
            />
            {isLimitExceeded && (
                <Text className='text-xs text-[#BD3B3B] w-full text-left'>
                    Number must be 10 digits
                </Text>
            )}
        </View>
    );
}

export default MobileInput;
