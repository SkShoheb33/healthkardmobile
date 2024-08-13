import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View, Text, Image } from "react-native"
import {styles} from '../../styles/style'
import Heading from "../ui/Heading"
function Header({image, name, gender, age, healthCoins}){
    return(
        <View className='flex-row items-center w-11/12 mx-auto px-4 py-2 border border-gray-300 rounded-md shadow-2xl my-4 '>
            {image && <Image source={{uri:image}} className='rounded-lg' style={{width: 100, height: 100}}/>}
            <View> 
                <Heading label={name} size='text-xl' padding='p-2'/>
                <Text className='mx-4'>{gender}, {age}</Text>
                <View className='mx-4 flex-row my-2 p-1 rounded-md items-center'>
                    <FontAwesomeIcon icon={faCoins} color='#00BFA8'/>
                    <Heading color='green' label={healthCoins}/>
                </View>
            </View>
        </View>
    )
}
export default Header;