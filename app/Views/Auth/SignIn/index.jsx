import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from '@firebase/auth';

export default function SignIn() {

    const [ field_email, setEmail ] = useState('')
    const [ field_password, setPassword ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    function Login() {
        signInWithEmailAndPassword(auth, field_email.replace(' ', ''), field_password)
    }

    return (
        <View>
            <Text>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({})


