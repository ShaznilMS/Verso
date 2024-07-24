import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../../../../../Auth/Componentes/Button'

const img = require('../images.jpg')

const LikeCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.img_cont}><Image source={img} style={styles.img} /></View>

            <View style={styles.top}>
                <Text style={styles.head_text}>{props.user}</Text>
                <Text style={styles.head_msg_1}>{props.action}</Text>
                <Text numberOfLines={2} style={styles.head_msg_2}>"{props.msg}"</Text>
                <View style={styles.btns}>
                    <Button style={{ width: 60, height: 30, backgroundColor: 'none', borderColor: '#000', borderWidth: 2 }} text='Perfil' color='#000' fontSize={10} />
                    <Button style={{ width: 60, height: 30 }} text='Ver' color='#fff' fontSize={10} />
                </View>
            </View>


        </View>
    )
}

export default LikeCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    img_cont: {
        height: '100%'
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        top: 30


    },
    top: {
        height: '100%',
        justifyContent: 'center'
    },
    headline: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 5,
        width: '100%'
    },
    headline_text: {
        color: '#49454F'
    },
    head_text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
        maxWidth: 250
    },
    head_msg_1: {
        color: '#afafaf'
    },
    head_msg_2: {
        fontWeight: 'regular',
        color: '#474747',
        maxWidth: 200
    },
    bottom: {

    }, btns: {
        flexDirection: 'row',
        gap: 15,
        top: 10
    }
})

