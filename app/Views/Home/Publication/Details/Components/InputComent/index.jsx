import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const InputComent = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <TextInput onChangeText={props.onText} style={styles.input} placeholder='Escreva o seu comentario...' />
            <TouchableOpacity activeOpacity={.6} style={styles.btn} onPress={props.onSendComment}>
                <FontAwesomeIcon icon={faPaperPlane} size={20} />
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
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 30,
        padding: 15,
        borderRadius: 100,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        backgroundColor: "#ffffff",
    },
    btn: {
        position: 'absolute',
        alignSelf: 'flex-end',
        left: '95%'
    }
})