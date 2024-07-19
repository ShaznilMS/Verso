import { getAuth, signOut } from '@firebase/auth';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';

export default function Profile() {

    if (!getAuth(app).currentUser) {
        navigation.navigate('SignIn')
    }

    function Sair() {
        if (getAuth(app).currentUser) {
            signOut(auth)
                .then(() => {
                    navigation.navigate('SignIn')
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