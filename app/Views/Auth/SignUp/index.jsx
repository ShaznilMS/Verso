import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import InputText from '../Componentes/InputText';
import Button from '../Componentes/Button';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../../../configs/firebase.config.mjs';

const logo = require('../splash.png')

export default function SignUp({ navigation }) {

    const [field_email, setEmail] = useState('')
    const [field_password, setPassword] = useState('')
    const [field_cpassword, setCPassword] = useState('')

    function Register() {
        console.log("Email:", field_email);
        console.log("Password:", field_password);
        console.log("Confirm Password:", field_cpassword);

        if (field_password, field_cpassword) {
            createUserWithEmailAndPassword(auth, field_email.replace(' ', ''), field_password)
                .then((value) => {
                    console.log('User created successfully!');

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SignIn' }],
                    })
                })
                .catch((error) => {
                    console.log('SignUp:', error.code);
                })
                .finally(() => {
                    console.log('SignUp: Done!');
                })
        }

    }

    return (
        <View style={styles.container}>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <Image source={logo} style={styles.img} />
            </View>

            <InputText title='Email' placeholder="Type your email here..." onChangeText={setEmail} />
            <InputText title='Password' placeholder="Type your password here..." onChangeText={setPassword} />
            <InputText title='Confirm Password' placeholder="Confirm your password here..." onChangeText={setCPassword} />

            <Text style={{

            }}></Text>

            <View style={{ height: 10 }}></View>

            <TouchableOpacity
                onPress={Register}
                activeOpacity={.8}
            >
                <View style={styles.button}>
                    <Text style={styles.button_text}>Registrar</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => { navigation.navigate('SignIn') }}>
                <Text style={{
                    textAlign: 'center'
                }}>Have an account? Login</Text>
            </TouchableOpacity>

            <View style={{ height: 10 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 0,
        flex: 1
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


