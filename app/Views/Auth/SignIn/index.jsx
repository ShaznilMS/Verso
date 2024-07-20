import InputText from '../Componentes/InputText';
import React, { useEffect, useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { StyleSheet, Text, Image, TouchableOpacity, View, Modal } from 'react-native';

const logo = require('../splash.png')

export default function SignIn({ navigation }) {

    const [field_email, setEmail] = useState('')
    const [field_password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    function Login() {
        console.log("Email:", field_email);
        console.log("Password:", field_password);
        signInWithEmailAndPassword(auth, field_email.replace(' ', ''), field_password)
            .then((user) => {
                console.log("Welcome:", user.user.email);
                console.log("User allready beem logged!");
                navigation.dispatch(
                    StackActions.replace('TabNavigator')
                )
            })
            .catch((e) => {
                console.log("Sign In:", e.code.replace('/', '').replace('-', ''));
            })
            .finally(() => {
                console.log("Sign In: Done!");
            })
    }

    useEffect(() => {
        if (getAuth(app).currentUser) {
            console.log("User allready beem logged!");
            navigation.dispatch(
                StackActions.replace('TabNavigator')
            )
        } else {
            // Login()
        }
    })

    return (
        <View style={styles.container}>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <Image source={logo} style={styles.img} />
            </View>

            <InputText title='Email' placeholder="Type your email here..." onChangeText={setEmail} />
            <InputText title='Password' placeholder="Type your password here..." onChangeText={setPassword} />

            <TouchableOpacity
                onPress={() => { }}>

                {/*  navigation.navigate('SignUp') }}> */}

                <Text style={{
                    textAlign: 'right'
                }}> </Text>

                {/* Forgot password? Reset</Text> */}

            </TouchableOpacity>

            <View style={{ height: 10 }}></View>

            <TouchableOpacity
                onPress={Login}
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

            <View style={{ height: 10 }}></View>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20,
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "#ffffff"
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
    },
    img: {
        width: 200,
        height: 100,
        marginTop: 50
    }
})


