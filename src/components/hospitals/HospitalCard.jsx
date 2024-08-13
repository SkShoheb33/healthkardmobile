import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import Service from "../home/Service";

function HospitalCard({hospital}){
  const navigation = useNavigation();
  return(
      <Pressable style={{width:250}} onPress={()=>navigation.navigate('Hospital',{hospitalId:hospital.hospitalId})} className=' border-1   items-start border border-gray-300 p-1 rounded-md shadow-xl bg-white '>
          <Image source={{uri:hospital.mediaDetails.hospitalImageURL}} style={{ height: 120 }}  className='w-full'   />
          <Text className='font-semibold text-lg my-1'>{hospital.hospitalDetails.hospitalTradeName}</Text>
          <Text className='my-1'>
              <Text>{hospital.hospitalDetails.address.street}, {hospital.hospitalDetails.address.city}, {hospital.hospitalDetails.address.landmark}, {hospital.hospitalDetails.address.code}, {hospital.hospitalDetails.address.state}, {hospital.hospitalDetails.address.country}</Text>
          </Text>
          <Text className='font-semibold text-md'>Specialized in</Text>
          <View className='flex-row flex-wrap '>
              {hospital.hospitalDetails.servicesOffered.length>1?<View>{hospital.hospitalDetails.servicesOffered.slice(0,1).map((service,index)=><Service key={index} service={service}/>)}<Service service={`${hospital.hospitalDetails.servicesOffered.length-1}+ more`}/></View>:hospital.hospitalDetails.servicesOffered.map((service,index)=><Service key={index} service={service}/>)}
          </View>
      </Pressable>
  )
}

export default HospitalCard;