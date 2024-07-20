import { getAuth } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import FollowCard from './Componentes/NotificationCards/FollowCard';
// import LikeCard from './Componentes/NotificationCards/LikeCard';
// import ShareCard from './Componentes/NotificationCards/ShareCard';
// import NewPubCard from './Componentes/NotificationCards/NewPubCard';

export default function Notifications({ navigation }) {

    const [isRefreshing, setIsRefrshing] = useState(false)

    // if (!getAuth(app).currentUser) {

    // }

    function handleRefresh() {
        console.log('Refresh!');
    }

    return (

        <View style={styles.bg}>

            <NavBar />
            <FollowCard />

            <FlatList
                data={[{}]}
                refreshing={isRefreshing}
                style={{ flex: 1, backgroundColor: "#fff" }}
                onRefresh={handleRefresh}
                renderItem={() => {

                }}

            />


        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        gap: 15,
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff"
    },
    container: {
        backgroundColor: "#ffffff",
        paddingTop: 10,
    }
})
