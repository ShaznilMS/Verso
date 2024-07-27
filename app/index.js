import { useEffect, useState } from 'react'
import { Animated, FlatList, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Vibration, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../configs/firebase.config.mjs'

// const api = axios.create({
//     baseURL: 'http://192.168.43.162/api',
//     timeout: 50000,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

async function SignIn() {

    console.log('Sign In processing...');

    const user = await signInWithEmailAndPassword(auth, "shaznilmussagysulemane@gmail.com", "Sm030106")

    let data = JSON.stringify({
        "user": user.user
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.43.162:3333/api/auth/signin',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const response_data = await axios.request(config)

    const token = response_data.data.token
    const udata = response_data.data.user_info

    await AsyncStorage.setItem('Token', token)
    await AsyncStorage.setItem('Udata', udata)

    console.log('Sign In finish!');

    return true;
}

async function SignUp(email, password, name, phone_number, country) {
    console.log('Check if data is valid processing...')
    
    const user = await createUserWithEmailAndPassword(auth, email, password)

    let data = JSON.stringify({
        "email" : user.user.email,
        "name" : name,
        "phone_number" : phone_number,
        "country" : country
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.43.162:3333/api/auth/signup',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios.request(config)

    await signOut(auth);

    console.log('Check if data is valid finish!')

    return true;
}

function Button({ label, method }) {
    return (
        <TouchableOpacity activeOpacity={.9} onPress={method}>
            <View style={{ width: '100%', height: 60, borderRadius: 10, backgroundColor: "#333", justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: '700' }}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const email = "shaznilmussagysulemane@gmail.com"
const password = "Sm030106"

export default function App() {

    const [isStarted, setIsStarted] = useState(true)

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={{ flex: 1, gap: 10 }}>

                    <Button label={'Sign In'} method={() => { SignIn() }} />
                    <Button label={'Sign Up'} method={() => { SignUp() }} />

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
        backgroundColor: 'orange'
    }
})

























