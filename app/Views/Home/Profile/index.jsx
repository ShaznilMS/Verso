import { getAuth, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import { Link } from 'expo-router';
import { StackActions } from '@react-navigation/native';

export default function Profile({ navigation }) {


    if (!getAuth(app).currentUser) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StackNavigator' }],
        })
    }

    function Sair() {

        console.log('Sair!');
        const user = getAuth(app).currentUser
        if (user) {
            console.log('Usuário', user.email.toUpperCase(), "saiu da conta!");
            signOut(auth)
                .then(() => {
                    console.log('Sign out has been executed successfully!');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'StackNavigator' }],
                    })
                })
        }
    }

    return (
        <View style={styles.bg}>
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={Sair}
                >
                    <View style={{
                        borderRadius: 20,
                        backgroundColor: "#333333",
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>
                        <Text style={{
                            color: "#ffffff",
                            fontWeight: '700',
                            fontSize: 20
                        }}>Sair</Text>
                    </View>
                </TouchableOpacity>
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