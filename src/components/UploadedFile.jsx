import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { colors } from '../styles/style'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { deleteFile, getFileNameFromURL } from '../helpers/fileupload'

const UploadedFile = ({ url, onDelete }) => {
    const [fileName, setFileName] = useState('');
    useEffect(() => {
        setFileName(getFileNameFromURL(url));
    }, [url])
    const handleDelete = async () => {
        // await deleteFile(url)
        onDelete()
    }
    return (
        <View style={ { borderWidth: 1, borderColor: colors.quaternary } } className='flex flex-row items-center px-2 py-1 rounded w-28 justify-between'  >
            <Text className='text-sm text-black'>{ fileName.length > 10 ? fileName.substring(0, 7) + '...' : fileName }</Text>
            <TouchableOpacity onPress={ handleDelete }>
                <FontAwesomeIcon icon={ faXmark } color={ colors.danger } size={ 18 } />
            </TouchableOpacity>
        </View>
    )
}

export default UploadedFile