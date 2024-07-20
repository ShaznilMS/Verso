import { getAuth } from '@firebase/auth';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import FollowCard from './Componentes/NotificationCards/FollowCard';
import LikeCard from './Componentes/NotificationCards/LikeCard';
import ShareCard from './Componentes/NotificationCards/ShareCard';
import NewPubCard from './Componentes/NotificationCards/NewPubCard';

export default function Notifications({ navigation }) {

    if (!getAuth(app).currentUser) {

    }

    return (
        <View style={styles.bg}>
            <NavBar />
            <ShareCard msg='O homem que diz a verdade o tempo todo está fadado a ruina' />
            <NewPubCard msg='O homem que diz a verdade o tempo todo está fadado a ruina'/>
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


