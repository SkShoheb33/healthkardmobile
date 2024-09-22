import React from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import Heading from '@components/Heading'
import Input from '@components/Input'
import Button from '@components/Button'
import { styles } from 'src/styles/style'
import { pickFile } from 'src/helpers/fileupload'
import Multiselect from '@components/Multiselect'
import TimePicker from '@components/TimePicker'
import { days, hospitalTypes, services } from './constants'
import Select from '@components/Select'

function HospitalDetails({ hospital, setHospital, errors }) {
    // const [errors, setErrors] = useState({});

    const changeDaysAvailabilityHandler = (index) => {
        const tempDays = hospital.hospitalDetails.daysAvailabilty;
        tempDays[index] = !tempDays[index];
        setHospital(prev => ({
            ...prev,
            hospitalDetails: {
                ...prev.hospitalDetails,
                daysAvailabilty: tempDays
            }
        }))
    }
    const changeHandler = (property, value) => {
        setHospital(prev => ({
            ...prev,
            hospitalDetails: {
                ...prev.hospitalDetails,
                [property]: value
            }
        }))
    }
    const changeAddressHandler = (property, value) => {
        setHospital(prev => ({
            ...prev,
            hospitalDetails: {
                ...prev.hospitalDetails,
                address: {
                    ...prev.hospitalDetails.address,
                    [property]: value
                }
            }
        }))
    }
    const upload = async (key) => {
        const url = await pickFile();
        changeHandler(key, url);
    };

    return (
        <View style={ { flex: 1, padding: 12 } }>
            <Heading label='Hospital Details' size='text-2xl font-semibold' />
            <ScrollView style={ { flex: 1 } } className='w-full px-2'>
                <SafeAreaView style={ { flex: 1 } } className='w-full'>
                    <Heading label='General details' size='text-lg' />
                    <View style={ styles.lightGreen } className='p-2 rounded-md'>
                        <Input
                            placeholder='Hospital legal name'
                            onChange={ changeHandler }
                            value={ hospital.hospitalDetails.hospitalLegalName }
                            property='hospitalLegalName'
                            error={ {
                                status: !!errors.hospitalLegalName,
                                message: errors.hospitalLegalName
                            } }
                        />
                        <Input
                            placeholder='Hospital Trade name'
                            onChange={ changeHandler }
                            value={ hospital.hospitalDetails.hospitalTradeName }
                            property='hospitalTradeName'
                            error={ {
                                status: !!errors.hospitalTradeName,
                                message: errors.hospitalTradeName
                            } }
                        />
                        <Input
                            placeholder='Hospital License ID'
                            onChange={ changeHandler }
                            value={ hospital.hospitalDetails.licenseNumber }
                            property='licenseNumber'
                            error={ {
                                status: !!errors.licenseNumber,
                                message: errors.licenseNumber
                            } }
                        />
                        <Button onPress={ () => upload('hospitalLicense') } label='Upload License' color='blue' />
                        { errors.hospitalLicense && <Text className='text-xs text-[#BD3B3B]'>{ errors.hospitalLicense }</Text> }
                        <Input
                            placeholder='Contact Number'
                            onChange={ changeHandler }
                            value={ hospital.hospitalDetails.hospitalNumber }
                            property='hospitalNumber'
                            inputMode='number'
                            error={ {
                                status: !!errors.hospitalNumber,
                                message: errors.hospitalNumber
                            } }
                        />
                    </View>
                    <Heading label='Contact Address' size='text-lg' />
                    <View style={ styles.lightGreen } className='p-2 rounded-md'>
                        <View className='w-full flex-row items-center justify-between'>
                            <Input
                                placeholder='Street'
                                width='w-6/12'
                                onChange={ changeAddressHandler }
                                value={ hospital.hospitalDetails.address.street }
                                property='street'
                                error={ {
                                    status: !!errors.street,
                                    message: errors.street
                                } }
                            />
                            <Input
                                placeholder='Landmark'
                                width='w-5/12'
                                onChange={ changeAddressHandler }
                                value={ hospital.hospitalDetails.address.landmark }
                                property='landmark'
                                error={ {
                                    status: !!errors.landmark,
                                    message: errors.landmark
                                } }
                            />
                        </View>
                        <View className='w-full flex-row items-center justify-between'>
                            <Input
                                placeholder='City'
                                width='w-6/12'
                                onChange={ changeAddressHandler }
                                value={ hospital.hospitalDetails.address.city }
                                property='city'
                                error={ {
                                    status: !!errors.city,
                                    message: errors.city
                                } }
                            />
                            <Input
                                placeholder='Code'
                                width='w-5/12'
                                onChange={ changeAddressHandler }
                                value={ hospital.hospitalDetails.address.code }
                                property='code'
                                error={ {
                                    status: !!errors.code,
                                    message: errors.code
                                } }
                            />
                        </View>
                        <View className='w-full flex-row items-center justify-between'>
                            <Input
                                placeholder='State'
                                width='w-6/12'
                                onChange={ changeAddressHandler }
                                value={ hospital.hospitalDetails.address.state }
                                property='state'
                                error={ {
                                    status: !!errors.state,
                                    message: errors.state
                                } }
                            />
                            <Input
                                placeholder='Country'
                                width='w-5/12'
                                onChange={ changeAddressHandler }
                                value={ hospital.hospitalDetails.address.country }
                                property='country'
                                error={ {
                                    status: !!errors.country,
                                    message: errors.country
                                } }
                            />
                        </View>
                    </View>
                    <Heading label='Services' size='text-lg' />
                    <View style={ styles.lightGreen } className='p-2 rounded-md'>
                        <View className='w-full my-2'>
                            <Select
                                selectedItems={ hospital?.hospitalDetails?.hospitalType || [] }
                                placeHolder='Hospital Type'
                                selectedValue={ hospital?.hospitalDetails?.typeOfHospital }
                                options={ hospitalTypes }
                                setSelectedValue={ (value) => changeHandler('typeOfHospital', value) }
                                styles={ { width: 'w-full' } }
                            />
                            { errors.typeOfHospital && <Text className='text-xs text-[#BD3B3B]'>{ errors.typeOfHospital }</Text> }
                        </View>
                        <View className='w-full flex-row items-center justify-between'>
                            <TimePicker
                                placeHolder='From'
                                width='w-5/12'
                                onChange={ (value) => changeHandler('from', value) }
                                value={ hospital.hospitalDetails.from }
                            />
                            <TimePicker
                                placeHolder='To'
                                width='w-5/12'
                                onChange={ (value) => changeHandler('to', value) }
                                value={ hospital.hospitalDetails.to }
                            />
                        </View>
                        { (errors.from || errors.to) && <Text className='text-xs text-[#BD3B3B]'>{ errors.from || errors.to }</Text> }
                        <Heading label='Availability' />
                        <View className='flex-row flex-wrap justify-between'>
                            { days.map((day, index) => (
                                <Pressable
                                    onPress={ () => changeDaysAvailabilityHandler(index) }
                                    key={ index }
                                    style={ hospital.hospitalDetails.daysAvailabilty[index] && styles.green }
                                    className={ `w-1/4 m-1 rounded-md flex items-center justify-center px-2 py-1 border border-[#00BFA8]` }
                                >
                                    <Text className={ `${hospital.hospitalDetails.daysAvailabilty[index] ? 'text-white' : 'text-black text-nowrap'}` }>
                                        { day.length > 6 ? day.slice(0, 6) + '...' : day }
                                    </Text>
                                </Pressable>
                            )) }
                        </View>
                        { errors.daysAvailabilty && <Text className='text-xs text-[#BD3B3B]'>{ errors.daysAvailabilty }</Text> }
                        <Heading label='Services offered' />
                        <Multiselect
                            selectedItems={ hospital?.hospitalDetails?.servicesOffered || [] }
                            placeHolder='Services offered'
                            list={ services }
                            onChange={ changeHandler }
                        />
                        { errors.servicesOffered && <Text className='text-xs text-[#BD3B3B]'>{ errors.servicesOffered }</Text> }
                    </View>
                    <Heading label='Owner Details' size='text-lg' />
                    <View style={ styles.lightGreen } className='p-2 rounded-md'>
                        <Input
                            placeholder='Full name'
                            onChange={ changeHandler }
                            value={ hospital.hospitalDetails.hospitalOwnerFullName }
                            property='hospitalOwnerFullName'
                            error={ {
                                status: !!errors.hospitalOwnerFullName,
                                message: errors.hospitalOwnerFullName
                            } }
                        />
                        <Input
                            placeholder='Contact number'
                            onChange={ changeHandler }
                            value={ hospital.hospitalDetails.hospitalOwnerContactNumber }
                            property='hospitalOwnerContactNumber'
                            error={ {
                                status: !!errors.hospitalOwnerContactNumber,
                                message: errors.hospitalOwnerContactNumber
                            } }
                        />
                        <Input
                            placeholder='Email Id'
                            onChange={ changeHandler }
                            value={ hospital.hospitalDetails.hospitalOwnerEmail }
                            property='hospitalOwnerEmail'
                            error={ {
                                status: !!errors.hospitalOwnerEmail,
                                message: errors.hospitalOwnerEmail
                            } }
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default HospitalDetails
