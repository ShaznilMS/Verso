import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const InputText = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput value={props.value} onBlur={props.onBlur} style={[styles.input,props.style]} multiline={false} maxLength={props.maxLength ? props.maxLength : 255} cursorColor={"#555555"} placeholder={props.placeholder} onChangeText={props.onChangeText} />
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    input:{
        height:60,
        width:'100%',
        borderWidth:2,
        borderColor:'#000',
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

