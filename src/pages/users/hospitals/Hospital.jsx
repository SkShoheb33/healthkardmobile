import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Service from '@components/Service';
import Doctor from './components/Doctor';
import Heading from '@components/Heading';
import ContactBox from './components/ContactBox';
import HospitalCard from './components/HospitalCard';
import httpService from 'src/httpService';
import Loading from '@components/Loading';
import Navbar from '@components/Navbar';
import ShimmerContainer from '@components/ShimmerContainer';

function Hospital({ route }) {
    const { hospitalId } = route.params;
    const [hospital, setHospital] = useState({});
    const [similarHospitals, setSimilarHospitals] = useState([]);
    const [isLoading, setLoadingStatus] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingStatus(true);
            try {
                const result = await httpService.get('hospitals', `?hospitalId=${hospitalId}`);
                setHospital(result.hospitals[0]);

                const hospitals = await httpService.get('hospitals');
                setSimilarHospitals(hospitals.hospitals);
            } catch (err) {
                console.log({ err });
            } finally {
                setLoadingStatus(false);
            }
        };
        fetchData();
    }, [hospitalId]);

    return (
        <View style={ { flex: 1 } } className='bg-white '>
            <Navbar />
            { !isLoading && hospital.mediaDetails ?
                (<ScrollView>
                    <View>
                        <ShimmerContainer
                            style={ { height: 200, width: '100%' } }
                            isVisible={ imageLoaded }
                        >
                            <Image
                                source={ { uri: hospital?.mediaDetails?.hospitalImageURL } }
                                className='w-full h-full'
                                onLoad={ () => setImageLoaded(true) }
                            />
                        </ShimmerContainer>
                        <View className='p-4'>
                            <Heading
                                color='blue'
                                label={ hospital.hospitalDetails.hospitalLegalName }
                                size='text-xl'
                            />
                            <Text className='text-black px-2'>
                                { hospital.mediaDetails.desc }
                            </Text>
                            <Heading
                                label='Specialized In'
                                size='text-xl'
                                style='mt-5 mb-4'
                            />
                            <View className='flex flex-row flex-wrap mb-4'>
                                { hospital.hospitalDetails.servicesOffered.map((service, index) => (
                                    <Service key={ index } service={ service } />
                                )) }
                            </View>
                            <Heading size='text-xl' label='Meet our chief doctor' />
                            <ScrollView horizontal>
                                { hospital.doctorList.map((doctor, index) => (
                                    <Doctor
                                        key={ index }
                                        doctor={ doctor }
                                        image={ hospital.mediaDetails.doctorImageURL }
                                    />
                                )) }
                            </ScrollView>
                            <Heading
                                label='Contact Information'
                                size='text-xl'
                            />
                            <ContactBox
                                address={ hospital.hospitalDetails.address }
                                number={ hospital.hospitalDetails.hospitalNumber }
                                email={ hospital.email }
                            />
                            <Heading
                                label='24x7 available Terms and conditions apply'
                                color='blue'
                                style='text-center my-2'
                            />
                            <Heading
                                label='Similar results'
                                size='text-xl'
                                style='my-4'
                            />
                            <ScrollView horizontal className='w-full p-2' >
                                { similarHospitals.map((hospital, index) => (
                                    <HospitalCard
                                        key={ index }
                                        hospital={ hospital }
                                        horizontal={ true }
                                    />
                                )) }
                            </ScrollView>
                        </View>
                    </View>

                </ScrollView>
                ) : (
                    <Loading isLoading={ isLoading } />
                ) }
        </View>
    );
}

export default Hospital;