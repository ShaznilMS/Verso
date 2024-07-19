import { getAuth, signOut } from '@firebase/auth';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'

export default function Favorite({ navigation }) {

    if (!getAuth(app).currentUser) {
        navigation.navigate('SignIn')
    }

    return (
        <>
            <NavBar />
            <View style={styles.container}>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


