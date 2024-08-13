import { Text, View } from "react-native";
import { styles } from "../../styles/style";

const Service = ({service})=>{
  return(
    <View style={styles.greenBorder} className='py-2 px-4 border m-1 rounded-full'>
      <Text className='self-start'>{service}</Text>
    </View>
  )
}

export default Service;