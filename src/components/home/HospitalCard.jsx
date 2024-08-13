import { View, Text, Image, Pressable } from "react-native";
import Address from "../ui/Address";
import Service from "./Service";
import { useNavigation } from "@react-navigation/native";
function HospitalCard({hospital, address=false, horizontal=false}){
    const navigation = useNavigation();
    return(
        <Pressable onPress={()=>navigation.navigate('Hospital',{hospitalId:hospital.hospitalId})} className={`border-1 ${horizontal?'w-[210]':'w-1/2'}  items-start border border-gray-300 p-1 rounded-md shadow-xl bg-white `}>
            <Image source={{uri:hospital.mediaDetails.hospitalImageURL}} style={{ height: 120 }}  className='w-full' />
            <Text className='font-semibold text-lg my-1 text-black  text-ellipsis overflow-hidden'>{hospital.hospitalDetails.hospitalTradeName}</Text>
            {address && <Address address={hospital.hospitalDetails.address}/>}
            <Text className='font-semibold text-md text-black'>Specialized in</Text>
            <View className='flex-row flex-wrap items-center'>
                {hospital.hospitalDetails.servicesOffered.length>2?<View>{hospital.hospitalDetails.servicesOffered.slice(0,2).map((service,index)=><Service key={index} service={service}/>)}<Service service={`${hospital.hospitalDetails.servicesOffered.length-2}+ more`}/></View>:hospital.hospitalDetails.servicesOffered.map((service,index)=><Service key={index} service={service}/>)}
            </View>
        </Pressable>
    )
}


export default HospitalCard;