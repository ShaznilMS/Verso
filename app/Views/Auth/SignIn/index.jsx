import InputText from '../Componentes/InputText';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Modal, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { VerifyAuthentication, VersoSignIn } from '../../../Settings/index.mjs';
import { StackActions, useFocusEffect } from '@react-navigation/native';

const logo = require('../splash.png')

export default function SignIn({ navigation }) {

    const [field_email, setEmail] = useState('')
    const [field_password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    "",
                    "Realmente deseja sair?",
                    [
                        { text: "Cancelar", onPress: () => null, style: "cancel" },
                        { text: "Sair", onPress: () => { BackHandler.exitApp() } }
                    ]
                );
                return true;
            };

            
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [navigation])
    )

    function handleLogin(data) {
        const { email, password } = data
        console.log(email, password);
        setIsLoading(true)
        VersoSignIn(email, password).then((value) => {
            if (value == true) {
                navigation.dispatch(
                    StackActions.replace('TabNavigator')
                )
            }
        }).catch(() => {
            setIsLoading(false)
        })
    }

    const schema = yup.object({
        email: yup.string().required('Insira seu email'),
        password: yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').required('Type your password')
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    if (isLoading) {
        return (
            <Modal>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator color={"#333"} size={40}></ActivityIndicator>
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <Image source={logo} style={styles.img} />
            </View>

            <Controller control={control} name='email' render={({ field: { onChange, onblur, value } }) => (
                <InputText style={{
                    borderWidth: errors.email ? errors.email && 1 : 2, borderColor: errors.email && '#ff375b'
                }} title='Email' placeholder="Type your email here..." onChangeText={onChange} value={value} onblur={onblur} />

            )} />
            {errors.email && <Text style={styles.error}>{errors.email?.message}</Text>}

            <Controller control={control} name='password' render={({ field: { onChange, onblur, value } }) => (
                <InputText style={{
                    borderWidth: errors.password ? errors.password && 1 : 2, borderColor: errors.password && '#ff375b'
                }} title='Password' placeholder="Type your password here..." onChangeText={onChange} value={value} onblur={onblur} />
            )} />
            {errors.password && <Text style={styles.error}>{errors.password?.message}</Text>}


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
                onPress={handleSubmit(handleLogin)}
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
    },
    error: {
        color: '#ff375b'
    }
})


