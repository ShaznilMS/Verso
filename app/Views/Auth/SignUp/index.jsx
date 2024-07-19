import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import InputText from '../Componentes/InputText';
import Button from '../Componentes/Button';

const logo = require('../splash.png')

export default function SignUp({ navigation }) {

    function Register() {
        console.log('Register');
    }

    return (
        <View style={styles.container}>

            <Image source={logo} style={styles.img}/>
            <InputText title='Email' placeholder="Type your email here" />
            <InputText title='Password' placeholder="Type your password here" />
            <InputText title='Confirm Password' placeholder="Confirm your password here" />

            <TouchableOpacity
                onPress={() => { navigation.navigate('SignUp') }}>
                <Text style={{
                    textAlign: 'right'
                }}>Forgot password? Reset</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }}></View>

            <TouchableOpacity
                onPress={Register}
                activeOpacity={.8}
            >
                <View style={styles.button}>
                    <Text style={styles.button_text}>Entrar</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => { navigation.navigate('SignUp') }}>
                <Text style={{
                    textAlign: 'center'
                }}>Have not an account? Create</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }}></View>
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
    },
    container: {
        padding: 20,
        gap: 20,
        flex: 1,
        justifyContent: 'flex-end'
    },
    input: {
        gap: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    input_view: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        padding: 10,
        height: 60
    },
    button: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#000000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 60
    },
    button_text: {
        fontSize: 25,
        fontWeight: '700',
        color: "#ffffff"
    },
    input_field: {
        fontSize: 18
    }
})


