import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Pressable, ScrollView } from 'react-native-gesture-handler'

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

    return (
        <View className='relative z-10'>
            <Pressable onPress={ () => setShowList(!showList) } className='h-12 bg-white justify-center rounded-md p-4'>
                <Text className=''>{ !showList ? selectedItems.length === 0 ? placeHolder : `You have selected ${selectedItems.length} items` : `Tap here to close, selected ${selectedItems.length}` }</Text>
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
    )
}

export default Multiselect
