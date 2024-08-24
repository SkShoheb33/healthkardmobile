import React from 'react'
import { Image, Text, View } from 'react-native'

function Organs({images}) {
  return (
    <View className='flex flex-row flex-wrap p-1 justify-center'>
        {images.map((image,index)=>{
            return(
                <View key={index} className="w-1/3 flex flex-col justify-center items-center ">
                    <Image source={image.image}></Image>
                    <Text>{image.name}</Text>
                </View>
            )
        })}
    </View>
  )
}

export default Organs
