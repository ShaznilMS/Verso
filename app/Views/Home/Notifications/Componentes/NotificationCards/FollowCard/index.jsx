import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../../../../../Auth/Componentes/Button'
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group'

const img = require('../images.jpg')

const FollowCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.img_cont}><Image source={img} style={styles.img} /></View>

            <View style={styles.top}>
                <View style={styles.bottom}>
                    <View>
                        <Text style={styles.head_text}>{props.user}</Text>
                        <Text style={styles.head_msg}>{props.action}</Text>
                    </View>
                    <Button style={{ width: 48, height: 20 }} text='Perfil' color='#fff' fontSize={10} />
                </View>
            </View>


        </View>
    )
}

export default FollowCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    img_cont: {
        height: '100%',
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        top: 20

    },
    top: {
        height: '100%',
        gap: 20,
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
        color: '#000'
    },
    head_msg: {
        fontWeight: 'regular',
        color: '#afafaf'
    },
    bottom: {
        gap: 10
    }
})
