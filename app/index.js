import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { GetAuthentication, SignIn, SignOut, SignUp, VerifyAuthentication } from './Settings/index.mjs'

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
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <Button label={'Verify Authentication'} method={() => VerifyAuthentication().then((value) => console.log(value))} />
                <Button label={'Sign In'} method={() => SignIn(email, password)} />
                <Button label={'Sign Out'} method={() => SignOut()} />
                <Button label={'Get Authentication'} method={() => GetAuthentication().then((user) => console.log(user))} />
                <Button label={'Sign  Up'} method={() => SignUp('shaznilmussagysulemane@gmail.com', 'Sm030106').then((value) => console.log(value))} />
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























