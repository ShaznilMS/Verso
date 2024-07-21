import React from 'react'
import { StyleSheet, Text, TextInputComponent, View } from 'react-native'
import User from './Components/User'
import ActionBar from './Components/ActionBar'
import InputComent from './Components/InputComent'
import Coment from './Components/Coment'

const Details = () => {
    return (
        <View>
            <User user='Antonio Cossa' time='20/07/24' />
            <View style={styles.content}>
                <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 400 }}>O Mundo pertence aos sabios📍
                    Aos ingênuos cabe o destino de acreditar.</Text>
                <Text style={{ textAlign: 'center', fontWeight: 700, top: 30 }}>Antonio Cossa</Text>
            </View>
            <ActionBar likes='20' shares='25' coments='2'/>
            <View style={styles.coments}>
                <InputComent/>
                <Coment ComentLikes='20' user='Antonio Cossa' time='20/07/24'/>
            </View>
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    content: {
        width: '100%',
        minHeight: 250,
        borderTopWidth: 1,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5a4',
        backgroundColor: '#f5f5f5a4',
        justifyContent: 'center'
    },
    coments: {
        width: '100%',
        minHeight:300,
        backgroundColor: '#f5f5f5a4'
    }
})
