import React from 'react'
import { Image, ScrollView, View } from 'react-native'

function Advertisements({ads}) {
  return (
    <ScrollView horizontal className='flex flex-row flex-wrap p-1 '>
        {ads.map((image,index)=>{
            return(
                <View key={index} className="mx-auto">
                    <Image source={image} />
                </View>
            )
        })}
    </ScrollView>
  )
}

export default Advertisements
