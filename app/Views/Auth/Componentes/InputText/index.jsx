import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const InputText = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput style={styles.input} placeholder={props.placeholder} onChangeText={props.onChangeText} />
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    input:{
        height:60,
        width:'100%',
        borderWidth:2,
        paddingHorizontal:15,
        borderRadius:10
    },
    title:{
        fontWeight:'bold',
    },
    container:{
        gap:10
    }
})
