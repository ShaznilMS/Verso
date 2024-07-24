import { getAuth, signOut } from '@firebase/auth';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'

export default function Favorite({ navigation }) {

    if (!getAuth(app).currentUser) {
        
    }

    
    return (
        <View style={styles.bg}>
            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        gap: 15,
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal:10
    }
})