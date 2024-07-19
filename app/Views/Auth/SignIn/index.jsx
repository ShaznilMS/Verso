import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import InputText from '../Componentes/InputText';
import Button from '../Componentes/Button';

const logo = require('../splash.png')

export default function SignIn({ navigation }) {

    const [field_email, setEmail] = useState('')
    const [field_password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function Login() {
        signInWithEmailAndPassword(auth, field_email.replace(' ', ''), field_password)
            .then((user) => {
                console.log("Welcome:", user.user.email);
                navigation.navigate('HomeC')
            })
            .catch((e) => {
                console.log("Sign In:", e.code.replace('/', '').replace('-', ''));
            })
            .finally(() => {
                console.log("Sign In: Done!");
            })
    }

    useEffect(() => {
        setEmail("shaznilmussagysulemane@gmail.com")
        setPassword("Sm030106")
        if (getAuth(app).currentUser) {
            console.log("User allready beem logged!");
            navigation.navigate('HomeC')
        } else {
            // Login()
        }
    })

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.img} />
            <InputText onChangeText={setEmail} title='Email' placeholder='Type your email here' />
            <View style={{gap:10}}>
                <InputText onChangeText={setPassword} title='Password' placeholder='Type your password here' />
                <Text style={{alignSelf:'flex-end'}}>Esqueceu sua senha?</Text>
            </View>
            <Button text='Entrar' color='#fff' onPress={Login}/>
            <Text>Ainda não possui conta? Criar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 30
    },
    img: {
        width: 200,
        height: 100,
        marginTop: 50
    }
})


