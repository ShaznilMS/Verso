import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import InputText from '../Componentes/InputText';

const logo = require('../splash.png')

export default function SignUp({ navigation }) {

    // ==========================================

    const [field_mail, setMail] = useState('')
    const [field_pass, setPass] = useState('')
    const [field_cpass, setCPass] = useState('')

    const [field_mail_valid, setMailValid] = useState(true)
    const [field_pass_valid, setPassValid] = useState(true)
    const [field_cpass_valid, setCPassValid] = useState(true)

    const [field_mail_error, setMailError] = useState('')
    const [field_pass_error, setPassError] = useState('')
    const [field_cpass_error, setCPassError] = useState('')

    // ==========================================

    const [isValid, setIsValid] = useState(false)

    const [field_country, setCountry] = useState('')
    const [field_name, setName] = useState('')
    const [field_phoneNumber, setPhoneNumber] = useState('')

    const [isCreated, setCreated] = useState(false)

    
    const handleMail = (value = '') => {

        setMail(value)

        if (!value.includes('@')) {
            setMailValid(false)
            setIsValid(false)
            setMailError("Email invalido! Ausencia de '@'.")
            return
        }

        if (!value.split('@')[1].includes('.')) {
            setMailValid(false)
            setIsValid(false)
            setMailError("Email invalido")
            return
        }

        if (value.split('@')[1].split('.')[0].length == 0 || value.split('@')[1].split('.')[1].length == 0) {
            setMailValid(false)
            setIsValid(false)
            setMailError("Email invalido")
            return
        }

        setMailValid(true)
        setIsValid(field_pass_valid && field_mail_valid)
        setMailError("")
    }

    const handlePass = (value = '') => {
        setPass(value)

        if (value.length < 7) {
            setPassValid(false)
            setIsValid(false)
            setPassError("Deve possuir minimo 8 caracteres.")
            return
        }
        setPassValid(true)
        setIsValid(field_pass_valid && field_mail_valid)
        setPassError("")
    }

    const Continue = () => {
        if(field_pass !== field_cpass) {
            setCPassValid(false)
            setIsValid(false)
            setCPassError("Confirme a palavra passe.")
            return
        }

        setCPassValid(true)
        setIsValid(true)
        setCPassError("")
        
        if(!isValid) return
        
        setCreated(true)
        
        
    }

    const handleSignup = () => {
        if (!isValid) return
    }


    return (
        <View style={styles.container}>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <Image source={logo} style={styles.img} />
            </View>

            <InputText title='Email' placeholder="Type your email here..." onChangeText={handleMail} value={field_mail} />
            {<Text style={{ color: "#ff375b", fontWeight: '700' }}>{field_mail_error}</Text>}
            <InputText title='Password' placeholder="Type your password here..." onChangeText={handlePass} value={field_pass} />
            {<Text style={{ color: "#ff375b", fontWeight: '700' }}>{field_pass_error}</Text>}
            <InputText title='Confirm Password' placeholder="Confirm your password here..." onChangeText={setCPass} value={field_cpass} />
            {<Text style={{ color: "#ff375b", fontWeight: '700' }}>{field_cpass_error}</Text>}

            <View style={{ height: 10 }}></View>
            <Text></Text>

            <TouchableOpacity
                onPress={() => {
                    Continue()
                }}
                activeOpacity={.8}
            >
                <View style={styles.button}>
                    <Text style={styles.button_text}>Continuar</Text>
                </View>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity
                onPress={() => { navigation.navigate('SignIn') }}>
                <Text style={{
                    textAlign: 'center'
                }}>Allready have an account? Login</Text>
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
                            activeOpacity={.8}
                        >
                            <View style={styles.button}>
                                <Text style={styles.button_text}>Cadastrar</Text>
                            </View>
                        </TouchableOpacity>

                        <Text></Text>

                        <TouchableOpacity
                            onPress={() => { setCreated(false) }}>
                            <Text style={{
                                textAlign: 'center'
                            }}>Back</Text>
                        </TouchableOpacity>

                        <View style={{ height: 10 }}></View>


                    </View>
                </Modal>
                : []}
        </View>
    );
}

const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 100,
        marginTop: 50
    },
    container: {
        gap: 10,
        padding: 20,
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
    }
})


