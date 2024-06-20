import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFilter, faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons'
import { styles } from '../../StyleSheet'
import img1 from '../../assets/PNG/img1.png'
import img2 from '../../assets/PNG/img2.png'
import img3 from '../../assets/PNG/img3.png'
import img4 from '../../assets/PNG/img4.png'
import img5 from '../../assets/PNG/img5.png'
import img6 from '../../assets/PNG/img6.png'
import img7 from '../../assets/PNG/img7.png'
import img8 from '../../assets/PNG/img8.png'
import img9 from '../../assets/PNG/img9.png'
import img10 from '../../assets/PNG/img10.png'
import img11 from '../../assets/PNG/img11.png'
import img12 from '../../assets/PNG/img12.png'
import ad1 from '../../assets/PNG/AD 1.png'
import ad2 from '../../assets/PNG/AD 2.png'
import refer from '../../assets/PNG/refer.png'
import axios from 'axios'
import { serverURL } from '../../ServerCongif'
function Home() {
    const images = [
        { image: img1, name: "Cardiologist" },
        { image: img2, name: "Dentist" },
        { image: img3, name: "Dermatologist" },
        { image: img4, name: "ENT" },
        { image: img5, name: "Gastroenterologist" },
        { image: img6, name: "General Medicine" },
        { image: img7, name: "Gynecologist" },
        { image: img8, name: "Nephrologist" },
        { image: img9, name: "Neurologist" },
        { image: img10, name: "Orthopedic" },
        { image: img11, name: "Pediatrician" },
        { image: img12, name: "Pulmonologist" }
    ];
    const ads =[ad1,ad2];
    const [hospitals,setHospitals] = useState([]);
    const [showLocation,setShowLocation] = useState(false);
    const [location,setLocation] = useState('');
    useEffect(()=>{
      let fetchData = async()=>{
          await axios.get(`${serverURL}/hospitals`).then((result) => {
              let data =[result.data[0],result.data[3],result.data[6]];
              setHospitals(data);
          }).catch((err) => {
              console.log('error ',err)
          });
      }
      fetchData();
  },[])
  return (
    <View style={{flex:1}} className=''>
        <ScrollView horizontal={false} className="w-full">
            <View style={styles.green} className="relative w-full flex flex-col  p-4 items-center justify-center rounded-b-3xl shadow-xl py-10">
                <Pressable onPress={()=>setShowLocation(true)} className="relative flex flex-row p-1 items-center w-full rounded-md bg-white">
                    <FontAwesomeIcon icon={faLocationDot} color='black' size={24}/>
                    <TextInput value={location} readOnly className="p-2 w-3/4 text-black" placeholder='Select Location'/>
                </Pressable>
                <View className="flex relative flex-row justify-around mt-4 items-center w-full rounded-xl border border-white px-4">
                    <FontAwesomeIcon icon={faSearch} color='white' size={24}/>
                    <TextInput className="p-2 w-3/4 text-white h-full" placeholder='Search for Hospital'/>
                    <FontAwesomeIcon icon={faFilter} color='white' size={24}/>
                    {showLocation && <View className='absolute top-0 w-full bg-white rounded-md p-2 shadow-xl border flex-row flex-wrap border-gray-200 left-0 flex items-center'>
                        <Pressable onPress={()=>{setShowLocation(false);setLocation("Narasaraopet")}} style={styles.greenBorder} className=' p-2 rounded-md m-2 z-20'><Text>Narasaraopet</Text></Pressable>
                        <Pressable onPress={()=>{setShowLocation(false);setLocation("Guntur")}} style={styles.greenBorder} className=' p-2 rounded-md m-2 z-20'><Text>Guntur</Text></Pressable>
                        <Pressable onPress={()=>{setShowLocation(false);setLocation("Vijayawada")}} style={styles.greenBorder} className=' p-2 rounded-md m-2 z-20'><Text>Vijayawada</Text></Pressable>
                    </View>}
                </View>
                
            </View>
            <Text className='font-semibold text-xl p-4'>What are you Looking for ?</Text>
            <View className='flex flex-row flex-wrap p-1 justify-center'>
                {images.map((image,index)=>{
                    return(
                        <OrgansImage key={index} image={image}/>
                    )
                })}
            </View>
            <Text className='font-semibold text-md p-4'>Advertisement</Text>
            <ScrollView horizontal className='flex flex-row flex-wrap p-1 '>
                {ads.map((image,index)=>{
                    return(
                        <Advertise key={index} image={image}/>
                    )
                })}
            </ScrollView>
            <Text className='font-semibold text-xl p-4'>Tops Pick's for you</Text>
            <ScrollView horizontal={true} className='w-full'>
                {hospitals.map((hospital,index)=><HospitalCard key={index} hospital={hospital}/>)}
            </ScrollView>
            <View style={styles.blue} className='font-semibold text-xl w-1/3 ml-4 p-2 rounded-xl items-center'>
                <Text className=' text-white'>Explore All</Text>
            </View>
            <Text className='font-semibold text-xl p-4'>Refer and earn Health Coins</Text>
            <Advertise image={refer}/>
        </ScrollView>
    </View>
  )
}

function OrgansImage({image}){
    return(
        <View className="w-1/3 flex flex-col justify-center items-center ">
            <Image source={image.image}></Image>
            <Text>{image.name}</Text>
        </View>
    )
}
function Advertise({image}){
    return(
        <View className="mx-auto">
            <Image source={image}></Image>
        </View>
    )
}


function HospitalCard({hospital}){
    return(
        <View className='m-4 border-1 items-start border border-gray-300 p-1 rounded-md shadow-xl bg-white' style={{width:210}}>
            <Image source={{uri:hospital.mediaDetails.hospitalImageURL}} style={{ width: 200, height: 120 }}    />
            <Text className='font-semibold text-lg my-1'>{hospital.hospitalDetails.hospitalTradeName}</Text>
            <Text className='my-1'>
                <Text>{hospital.hospitalDetails.address.street}, {hospital.hospitalDetails.address.city}, {hospital.hospitalDetails.address.landmark}, {hospital.hospitalDetails.address.code}, {hospital.hospitalDetails.address.state}, {hospital.hospitalDetails.address.country}</Text>
            </Text>
        </View>
    )
}
export default Home
