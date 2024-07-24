import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import InputText from '../Componentes/InputText';
import Button from '../Componentes/Button';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import { ref, set, getDatabase } from 'firebase/database';
import sha256 from 'sha256';
import { AddUserToDatabase, VersoSignUp } from '../../../Settings/index.mjs';

const logo = require('../splash.png')

export default function SignUp({ navigation }) {

    const [field_email, setEmail] = useState('')
    const [field_password, setPassword] = useState('')
    const [field_cpassword, setCPassword] = useState('')

    
    const [field_country, setCountry] = useState('')
    const [field_name, setName] = useState('')
    const [field_phoneNumber, setPhoneNumber] = useState('')

    const [isCreated, setCreated] = useState(false)

    function Register() {
        console.log("Email:", field_email);
        console.log("Password:", field_password);
        console.log("Confirm Password:", field_cpassword);

        if (field_password == field_cpassword) {
            VersoSignUp(field_email, field_password).then((value) => {
                if (value == 'Usuário criado com sucesso!') {
                    setCreated(true)
                }
            }).catch((error) => {
                console.log('SignUp:', error.code);
            }).finally(() => {
                console.log('SignUp: Done!');
            })
        }
    }

    function addToDatabase() {
        console.log(field_name);
        console.log(field_country);
        console.log(field_phoneNumber);

        const email = field_email.toLowerCase().replace(' ', '')

        const tm = new Date()

        const time = tm.getUTCFullYear() + '/' + (tm.getUTCMonth() + 1 < 10 ? '0' + (tm.getUTCMonth() + 1) : tm.getUTCMonth() + 1) + '/' + (tm.getUTCDate() < 10 ? '0' + tm.getUTCDate() : tm.getUTCDate())

        const data = {
            Name: field_name,
            Country: field_country,
            Phone_Number: field_phoneNumber,
            Email: email,
            image_path: '',
            Post_Count: 0,
            Verified: false,
            Joined: time
        }

        if (isCreated) {
            AddUserToDatabase(email, data).then((value) => {
                if (value == true) {
                    setCreated(false)
                    navigation.navigate('SignIn')
                }
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

            {true ?
                <Modal animationType='slide' visible={isCreated}>
                    <View style={styles.container}>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Image source={logo} style={styles.img} />
                        </View>

                        <InputText maxLength={24} title='Name' placeholder="Type your name here..." onChangeText={setName} />
                        <InputText title='Phone Number' placeholder="Type your phone number here..." onChangeText={setPhoneNumber} />
                        <InputText title='Country' placeholder="Type your country here..." onChangeText={setCountry} />

                        <View style={{ height: 10 }}></View>
                        <Text></Text>

                        <TouchableOpacity
                            onPress={addToDatabase}
                            activeOpacity={.8}
                        >
                            <View style={styles.button}>
                                <Text style={styles.button_text}>Salvar</Text>
                            </View>
                        </TouchableOpacity>

                        <Text></Text>
                        <View style={{ height: 10 }}></View>


                    </View>
                </Modal>
                : []}
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


