import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Categorie = (props) => {
    return (
        <TouchableOpacity activeOpacity={.6} onPress={props.onPress}>
            <Text>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Categorie

const styles = StyleSheet.create({
    Categories: {
        fontWeight: 'bold',
        fontSize: 15
    },
    Selecionada: {
        color: '#E8DEF8'
    }
})
