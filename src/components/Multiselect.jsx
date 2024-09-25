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
                    <Text className='text-black'>{ getDisplayText() }</Text>
                </Pressable>
                { showList &&
                    <View style={ { flex: 1 } } className=' absolute z-20 bottom-16 left-0 w-full rounded-md bg-white border border-gray-300'>
                        <View
                            style={ { flex: 1 } }
                            className=''
                            keyboardShouldPersistTaps='handled'
                            nestedScrollEnabled={ true } // Ensure nested scrolling is enabled
                        >
                            {
                                list.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={ () => onSelect(item) } key={ index } className={ `p-2 ${selectedItems.includes(item) && 'bg-[#E5F7EF]'}` }>
                                            <Text className='text-black'>{ item }</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                }
            </View>
        </ErrorBoundary>
    )
}

export default Multiselect
