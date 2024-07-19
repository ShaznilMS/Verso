import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import InputText from '../Componentes/InputText';
import Button from '../Componentes/Button';

const logo = require('../splash.png')

export default function SignUp() {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.img} />
            <View style={styles.inputs}>
                <InputText title='Email' placeholder="Type your email here" />
                <InputText title='Password' placeholder="Type your password here" />
                <InputText title='Confirm Password' placeholder="Confirm your password here" />
            </View>
            <Button text='Registrar' color='#fff' />
            <Text>Já possui conta? Entrar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 30,
        flex: 1,
        alignItems: 'center'
    },
    inputs: {
        gap: 30
    },
    img: {
        width: 200,
        height: 100,
        marginTop: 50
    }
})


