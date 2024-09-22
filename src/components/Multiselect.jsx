import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Pressable, ScrollView } from 'react-native'
import ErrorBoundary from './ErrorBoundary';

function Multiselect({ selectedItems: alreadySelectedItems, placeHolder = 'Tap to select', list = [], onChange }) {
    const [selectedItems, setSelectedItems] = useState(alreadySelectedItems || []);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        onChange('servicesOffered', selectedItems);
    }, [selectedItems])

    const onSelect = (item) => {
        if (selectedItems.includes(item)) {
            let temp = selectedItems.filter(selectedItem => selectedItem !== item);
            setSelectedItems(temp);
        } else {
            setSelectedItems(prev => [...prev, item]);
        }
    }

    function getDisplayText() {
        if (showList) {
            return `Tap here to close, selected ${selectedItems.length}`;
        } else {
            return selectedItems.length === 0 ? placeHolder : `You have selected ${selectedItems.length} items`;
        }
    }

    return (
        <ErrorBoundary>
            <View className='relative z-10'>
                <Pressable onPress={ () => setShowList(!showList) } className='h-12 bg-white justify-center rounded-md p-4'>
                    <Text className=''>{ getDisplayText() }</Text>
                </Pressable>
                { showList && <ScrollView className='max-h-48 absolute z-20 bottom-20 left-0 w-full bg-white border border-gray-200 rounded-md'>
                    {
                        list.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={ () => onSelect(item) } key={ index } className={ `p-2 ${selectedItems.includes(item) && 'bg-[#E5F7EF]'}` }>
                                    <Text className='text-black'>{ item }</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView> }
            </View>
        </ErrorBoundary>
    )
}

export default Multiselect
