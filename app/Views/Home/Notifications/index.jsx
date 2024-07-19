import { getAuth } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import FollowCard from './Componentes/NotificationCards/FollowCard';

export default function Notifications({ navigation }) {

    const [isRefreshing, setIsRefrshing] = useState(false)

    if (!getAuth(app).currentUser) {

    }

    function handleRefresh() {
        console.log('Refresh!');
    }

    return (

        <FlatList
            data={[{}]}
            refreshing={isRefreshing}
            style={{ flex: 1, backgroundColor: "#fff" }}
            onRefresh={handleRefresh}
            renderItem={() => (
                <View style={styles.bg}>
                    <NavBar />
                    <FollowCard />
                </View>
            )}
        />
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


