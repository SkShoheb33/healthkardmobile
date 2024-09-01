import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View, Text, Image } from "react-native"
import { styles } from "src/styles/style"
function Header({ healthId, image, name, gender, age, healthCoins }) {
    return (
        <View className='flex-row items-center w-11/12 mx-auto px-4 py-2 border bg-white border-gray-300 rounded-md shadow-2xl my-4 '>
            { image && <Image source={ { uri: image } } className='rounded-lg' style={ { width: 100, height: 100 } } /> }
            <View className='p-2'>
                <Text className='text-xl text-black font-semibold' >{ name }</Text>
                <Text style={ styles.greenText } className=''>{ healthId }</Text>
                <Text className=''>{ gender }, { age }</Text>
                {/* <View className='mx-2 flex-row my-2 p-1 rounded-md items-center'>
                    <FontAwesomeIcon icon={ faCoins } color='#00BFA8' />
                    <Heading color='green' label={ healthCoins } />
                </View> */}
            </View>
        </View>
    )
}
export default Header;