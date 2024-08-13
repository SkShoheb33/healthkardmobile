import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { styles } from '../styles/style'
import img1 from '../assets/PNG/img1.png'
import img2 from '../assets/PNG/img2.png'
import img3 from '../assets/PNG/img3.png'
import img4 from '../assets/PNG/img4.png'
import img5 from '../assets/PNG/img5.png'
import img6 from '../assets/PNG/img6.png'
import img7 from '../assets/PNG/img7.png'
import img8 from '../assets/PNG/img8.png'    
import img9 from '../assets/PNG/img9.png'
import img10 from '../assets/PNG/img10.png'
import img11 from '../assets/PNG/img11.png'
import img12 from '../assets/PNG/img12.png'
import ad1 from '../assets/PNG/AD1.png'
import ad2 from '../assets/PNG/AD2.png'
import refer from '../assets/PNG/refer.png'
import Header from '../components/home/Header'
import Organs from '../components/home/Organs'
import Advertisements from '../components/home/Advertisements'
import { getTopHospitals } from '../apis/Home'
import HospitalCard from '../components/home/HospitalCard'
import Heading from '../components/ui/Heading'
import Button from '../components/ui/Button'
import httpService from '../httpService'
import Navbar from '../components/Navbar'
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
    
    useEffect(()=>{
      let fetchData = async()=>{
        try{
          const result = await httpService.get('hospitals');
          setHospitals(result);
        }catch(err){
          console.log({err});
        }
      }
      fetchData();
  },[])
  return (
    <View style={{flex:1}} className=''>
        <Navbar/>
        <ScrollView horizontal={false} className="w-full">
            <Header/>
            <Text className='font-semibold text-xl p-4 text-black'>What are you Looking for ?</Text>
            <Organs images={images}/>
            <Heading label='Advertisement' size='text-md'/>
            <Advertisements ads={ads}/>
            <Heading label="Tops Pick's for you" size='text-xl'/>
            <ScrollView horizontal={true} className='w-full p-2'>
                {hospitals.slice(0,3).map((hospital,index)=><HospitalCard key={index} hospital={hospital} address={true} horizontal={true}/>)}
            </ScrollView>
            <Button label='Explore All' color={styles.blue}/>
            <Heading label="Refer and earn Health Coins" size='text-xl'/>
            <Image source={refer} className='mx-auto my-2'/>
        </ScrollView>
    </View>
  )
}



export default Home
