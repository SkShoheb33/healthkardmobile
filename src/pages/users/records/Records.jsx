import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Linking, RefreshControl } from 'react-native'
import Navbar from '@components/Navbar'
import Button from '@components/Button'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import Dropdown from '@components/DropDown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import httpService from 'src/httpService'
import Loading from '@components/Loading'
import Heading from '@components/Heading'
import { getFileNameFromURL, pickFile } from 'src/helpers/fileupload'
import { formatDate } from 'src/helpers/formatData'

function Records() {
    const [file, setFile] = useState(null);
    const [healthId, setHealthId] = useState('');
    const [healthIds, setHealthIds] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [records, setRecords] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [newName, setNewName] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const upload = async () => {
        setUploading(true);
        try {
            const url = await pickFile('records');
            const newRecord = {
                name: getFileNameFromURL(url),
                url,
                date: new Date().toISOString()
            }
            setFile(newRecord);
        } catch (error) {
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        const fetchHealthIds = async () => {
            setLoadingStatus(true);
            try {
                const userNumber = await AsyncStorage.getItem('userNumber');
                if (!userNumber) {
                    console.error('User number not found in AsyncStorage');
                    return;
                }
                const result = await httpService.get('users', `?number=91${userNumber}`);
                const healthIds = result.users.map(item => ({ name: item.name, value: item.healthId }));
                setHealthId(healthIds[0]?.value || '')
                setHealthIds(healthIds);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingStatus(false);
            }
        };

        fetchHealthIds();
    }, []);

    useEffect(() => {
        setLoadingStatus(true);
        const fetchRecords = async () => {
            if (!healthId) return;
            try {
                const records = await httpService.get(`records/${healthId}`);
                setRecords(records);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingStatus(false);
            }
        };
        fetchRecords();
    }, [healthId]);

    const addRecord = async () => {
        setLoadingStatus(true);
        try {
            await httpService.post(`records/${healthId}`, file);
            setRecords([...records, file]);
            setFile(null);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRename = async () => {
        if (!selectedRecord || !newName.trim()) return;

        setLoadingStatus(true);
        try {
            const updatedRecord = { name: newName.trim() };
            await httpService.put(`records`, selectedRecord._id, updatedRecord);
            setRecords(records.map(r => r._id === selectedRecord._id ? { ...r, name: newName.trim() } : r));
            setModalVisible(false);
            setSelectedRecord(null);
            setNewName('');
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingStatus(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchRecords().then(() => setRefreshing(false));
    }, [healthId]);

    const fetchRecords = async () => {
        try {
            const records = await httpService.get(`records/${healthId}`);
            setRecords(records);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            {
                uploading ?
                    <Loading /> :
                    <ScrollView style={ { flex: 1 } } className='p-2' refreshControl={
                        <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                    }>
                        <View className='w-full'>
                            <Dropdown
                                style={ { width: '100%' } }
                                list={ healthIds }
                                setValue={ setHealthId }
                                value={ healthId }
                            />
                        </View>
                        <Button label='Upload Record' color='blue' onPress={ upload } icon={ faFile } />
                        <Button label='Add Record' color='blue' onPress={ addRecord } disabled={ !healthId || !file } />
                        <Heading label='Your Records' size='text-lg' />
                        {
                            loadingStatus
                                ? <Loading />
                                : records.length > 0
                                    ? records.map(record => (
                                        <RecordCard
                                            key={ record.id }
                                            record={ record }
                                            onRename={ () => {
                                                setSelectedRecord(record);
                                                setNewName(record.name);
                                                setModalVisible(true);
                                            } }
                                        />
                                    ))
                                    : <Text className='text-center text-lg text-gray-500'>No records found</Text>
                        }
                    </ScrollView>
            }
            <RenameModal
                visible={ modalVisible }
                onClose={ () => setModalVisible(false) }
                onRename={ handleRename }
                newName={ newName }
                setNewName={ setNewName }
            />
        </View>
    )
}

export default Records


const RecordCard = ({ record, onRename }) => {
    const handleView = async () => {
        try {
            const url = record.url;
            if (Platform.OS === 'web') {
                window.open(url, '_blank');
            } else {
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                    await Linking.openURL(url);
                } else {
                    console.log("Don't know how to open this URL: " + url);
                    Alert.alert("Error", "Unable to open this file.");
                }
            }
        } catch (error) {
            console.error("An error occurred while opening the file:", error);
            Alert.alert("Error", "An error occurred while trying to open the file.");
        }
    };

    return (
        <View className='p-2 bg-gray-100 rounded-md rounded-b-lg border-b border-gray-200'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='text-lg font-semibold text-black'>{ record.name }</Text>
                <Text className='text-sm text-gray-500'>{ formatDate(record.date) }</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
                <TouchableOpacity onPress={ handleView }>
                    <Text className='text-sm text-blue-500'>View</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ onRename }>
                    <Text className='text-sm text-blue-500'>Rename</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const RenameModal = ({ visible, onClose, onRename, newName, setNewName }) => {
    return (
        <Modal
            animationType="slide"
            transparent={ true }
            visible={ visible }
            onRequestClose={ onClose }
        >
            <View className="flex-1 justify-center items-center bg-black/20">
                <View className="bg-white p-5 rounded-lg w-4/5">
                    <Text className="text-lg font-semibold mb-3">Rename Record</Text>
                    <TextInput
                        className="border border-gray-300 p-2 rounded mb-3"
                        value={ newName }
                        onChangeText={ setNewName }
                        placeholder="Enter new name"
                    />
                    <View className="flex-row justify-end">
                        <TouchableOpacity onPress={ onClose } className="mr-3">
                            <Text className="text-blue-500">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ onRename }>
                            <Text className="text-blue-500 font-semibold">Rename</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
