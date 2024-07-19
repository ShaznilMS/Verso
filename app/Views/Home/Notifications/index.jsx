import { getAuth } from '@firebase/auth';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import FollowCard from './Componentes/NotificationCards/FollowCard';

export default function Notifications({ navigation }) {

    if (!getAuth(app).currentUser) {

    }

    return (
        <View style={styles.bg}>
            <NavBar />
            <FollowCard />
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        gap: 15,
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff"
    }
})


