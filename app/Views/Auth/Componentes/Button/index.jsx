import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.btn} activeOpacity={.7}>
            <Text style={{color:props.color,fontWeight:'bold'}}>{props.text}</Text>
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
