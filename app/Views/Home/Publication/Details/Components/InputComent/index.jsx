import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const InputComent = (props) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Escreva o seu comentario...' />
            <TouchableOpacity activeOpacity={.6} style={styles.btn} onPress={props.onPress}>
                <FontAwesomeIcon icon={faPaperPlane} size={20}/>
            </TouchableOpacity>
        </View>
    )
}

export default InputComent

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 363,
        height: 50,
        borderRadius: 30,
        padding: 15,
        borderWidth: 1
    },
    btn: {
        position: 'absolute',
        alignSelf: 'flex-end',
        left:'95%'
    }
})
