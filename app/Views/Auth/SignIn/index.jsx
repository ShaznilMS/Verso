import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

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
        <View>
            <Text>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({})


