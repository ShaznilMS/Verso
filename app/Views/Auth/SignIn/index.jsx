import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { StackActions } from '@react-navigation/native';

export default function SignIn({ navigation }) {

    const [field_email, setEmail] = useState('')
    const [field_password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function Login() {
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
        setEmail("shaznilmussagysulemane@gmail.com")
        setPassword("Sm030106")

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
            <View style={styles.input}>
                <Text style={styles.title}>Email</Text>
                <View style={styles.input_view}>
                    <TextInput onChangeText={setEmail} style={styles.input_field} placeholder='Type your email...' />
                </View>
            </View>
            <View style={styles.input}>
                <Text style={styles.title}>Password</Text>
                <View style={styles.input_view}>
                    <TextInput onChangeText={setPassword} style={styles.input_field} placeholder='Type your password...' />
                </View>
            </View>

            <TouchableOpacity
                onPress={() => { navigation.navigate('SignUp') }}>
                <Text style={{
                    textAlign: 'right'
                }}>Forgot password? Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={Login}
                activeOpacity={.8}
            >
                <View style={styles.button}>
                    <Text style={styles.button_text}>Entrar</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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


