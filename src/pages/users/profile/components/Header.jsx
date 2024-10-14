import ShimmerContainer from "@components/ShimmerContainer"
import { useState } from "react"
import { View, Text, Image } from "react-native"
import { formatDate } from "src/helpers/formatData";
import { styles } from "src/styles/style"
import ProfileStatus from "./ProfileStatus";
function Header({ healthId, image, name, validity, healthCoins }) {
    if (!healthId) return <ProfileStatus />;
    const [imageLoading, setImageLoading] = useState(false);
    return (
        <View className='flex-row items-center w-full mx-auto px-4 py-2 border bg-white border-gray-300 rounded-md shadow-2xl my-4 '>
            { image &&
                <ShimmerContainer
                    isVisible={ imageLoading }
                    style={ { width: 100, height: 100 } }
                >
                    <Image source={ { uri: image } } className='rounded-lg' style={ { width: 100, height: 100 } } onLoad={ () => setImageLoading(true) } />
                </ShimmerContainer>
            }
            <View className='p-2 flex-1'>
                <Text className='text-xl text-black font-semibold' >{ name }</Text>
                <Text style={ styles.greenText } className=''>{ healthId }</Text>
                <Text className='text-black'>Validity: { formatDate(validity) }</Text>
            </View>
        </View>
    )
}
export default Header;