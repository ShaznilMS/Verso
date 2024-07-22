import { getAuth } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';

export default function Notifications({ navigation }) {

    const [isRefreshing, setIsRefrshing] = useState(false)

    function handleRefresh() {
        console.log('Refresh!');
    }

    return (
        <View style={styles.bg}>
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
