import React from 'react'
import Heading from './Heading'

function PhoneNumber({number, style, color}) {
    const formate=()=>{
        return `+ ${number.slice(0,2)} ${number.slice(2,7)} ${number.slice(7)}`
    }
  return (
      <Heading label={formate()} color={color} style={`${style}`}/>
  )
}

export default PhoneNumber
