import { getAuth } from '@firebase/auth';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'

export default function Notifications({ navigation }) {

    if (!getAuth(app).currentUser) {
        
    }

    return (
        <View style={styles.bg}>
            <NavBar />
            <View style={styles.container}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ffffff"
    },
    bg: {
        gap: 5,
        flex: 1,
        backgroundColor: "#ffffff"
    }
})


