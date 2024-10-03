import { StackActions } from '@react-navigation/native';
import InputText from '../Componentes/InputText';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';

const logo = require('../splash.png')

export default function SignIn({ navigation }) {

    const [field_mail, setMail] = useState('')
    const [field_pass, setPass] = useState('')

    const [field_mail_valid, setMailValid] = useState(true)
    const [field_pass_valid, setPassValid] = useState(true)

    const [field_error, setFieldError] = useState('')

    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const preset_mail = "shaznilmussagysulemane@gmail.com"
    const preset_pass = "Sm030106"

    const handleMail = (value = '') => {

        setMail(value)

        if (!value.includes('@')) {
            setMailValid(false)
            setIsValid(false)
            setFieldError("Email invalido! Ausencia de '@'.")
            return
        }

        if (!value.split('@')[1].includes('.')) {
            setMailValid(false)
            setIsValid(false)
            setFieldError("Email invalido")
            return
        }

        if (value.split('@')[1].split('.')[0].length == 0 || value.split('@')[1].split('.')[1].length == 0) {
            setMailValid(false)
            setIsValid(false)
            setFieldError("Email invalido")
            return
        }

        setMailValid(true)
        setIsValid(field_pass_valid)
        setFieldError("")
    }

    const handlePass = (value = '') => {
        setPass(value)

        if (value.length < 8) {
            console.log("Oito")
            setPassValid(false)
            setIsValid(false)
            setFieldError("Deve possuir minimo 8 caracteres.")
            return false
        }
        console.log("Oitos")


        setPassValid(true)
        setIsValid(field_mail_valid)
        setFieldError("")
        return true
    }

    const handleSignin = async () => {
        // handleMail(field_mail)
        setFieldError("")
        console.log(await handlePass(field_pass))
        console.log("IV" + isValid);

        if (!isValid) return

        setIsLoading(true)

        setTimeout(() => {
            if(!(field_mail.toLowerCase() == preset_mail.toLowerCase()) || !(field_pass == preset_pass)) {
                setFieldError('Usuário ou senha inválidos.')
                setIsLoading(false)
            } else {
                
                navigation.dispatch(
                    StackActions.replace('TabNavigator')
                )
                setIsLoading(false)

            }
        }, 3000)
        // clearTimeout(timeout)

    }

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color="#333" size={30}></ActivityIndicator>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>

                <View style={styles.container}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Image source={logo} style={styles.img} />
                    </View>

                    <InputText style={{
                        borderColor: field_mail_valid ? '#333' : '#ff375b'
                    }} title='Email' placeholder="Type your email here..." onChangeText={handleMail} value={field_mail} />

                    <InputText style={{
                        borderColor: field_pass_valid ? '#333' : '#ff375b'
                    }} title='Password' placeholder="Type your password here..." onChangeText={handlePass} value={field_pass} />

                    <View style={{ height: 10 }}></View>
                    {<Text style={{ color: "#ff375b", fontWeight: '700' }}>{field_error}</Text>}
                    <View style={{ height: 10 }}></View>

                    <TouchableOpacity
                        onPress={handleSignin}
                        activeOpacity={.8}
                    >
                        <View style={styles.button}>
                            <Text style={styles.button_text}>Entrar</Text>
                        </View>
                    </TouchableOpacity>

                    <Text></Text>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('SignUp') }}>
                        <Text style={{
                            textAlign: 'center'
                        }}>Have not an account? Create</Text>
                    </TouchableOpacity>

                    <View style={{ height: 10 }}></View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 20,
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "#ffffff"
    },
    input: {
        gap: 5
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
        height: 54
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
    },
    error: {
        color: '#ff375b'
    }
})


