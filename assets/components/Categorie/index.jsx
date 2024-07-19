import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Categorie = (props) => {
    return (
        <TouchableOpacity activeOpacity={.6} onPress={props.onPress}>
            <Text style={[styles.Categories,{color:"#60606077"}, props.Selecionada && styles.Selecionada]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Categorie

const styles = StyleSheet.create({
    Categories: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingEnd:15
    },
    Selecionada: {
        color: '#000000'
    }
})
