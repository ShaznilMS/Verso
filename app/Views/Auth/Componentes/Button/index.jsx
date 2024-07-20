import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity style={[styles.btn,props.style]} activeOpacity={.7} onPress={props.onPress}>
            <Text style={{color:props.color,fontWeight:'bold',fontSize:props.fontSize}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        width: 190,
        height: 54,
        backgroundColor:'#000',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    }
})
