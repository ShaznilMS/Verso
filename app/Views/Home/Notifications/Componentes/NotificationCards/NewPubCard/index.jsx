import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../../../../../Auth/Componentes/Button'
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group'

const img = require('./imagem.png')

const NewPubCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.img_cont}><Image source={img} style={styles.img} /></View>

            <View style={styles.top}>
                <View style={styles.headline}>
                    <Text style={styles.headline_text}>Notificação</Text>
                </View>



                <View style={styles.bottom}>
                    <Text style={styles.head_text}>Raimundo Chitava</Text>
                    <Text style={styles.head_msg_1}>Tem uma nova publicação</Text>
                    <Text numberOfLines={2} style={styles.head_msg_2}>{props.msg}</Text>
                    <View style={styles.btns}>
                        <Button style={{ width: 55, height: 25, backgroundColor:'none',borderColor:'#000',borderWidth:2 }} text='Perfil' color='#000' fontSize='10' />
                        <Button style={{ width: 55, height: 25 }} text='Ver' color='#fff' fontSize='10' />
                    </View>

                </View>
            </View>


        </View>
    )
}

export default NewPubCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#fff',
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
        gap: 15
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
    head_msg_1: {
        color: '#afafaf'
    },
    head_msg_2: {
        fontWeight: 'bold',
        color: '#474747',
        maxWidth: 200
    },
    bottom: {
        gap: 3
    },btns:{
        flexDirection:'row',
        gap:15
    }
})
