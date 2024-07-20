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
                <View style={styles.headline}>
                    <Text style={styles.headline_text}>Notificação</Text>
                </View>

                <View style={styles.bottom}>
                    <Text style={styles.head_text}>Antonio Cossa<Text style={styles.head_msg}> Seguio voce</Text></Text>
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
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        backgroundColor: "#ffffff",
        borderRadius: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    img_cont: {
        height: '100%',
        justifyContent: 'center'
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',

    },
    top: {
        height: '100%',
        gap: 20
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
    bottom:{
        gap:10
    }
})
