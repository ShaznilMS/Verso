import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image_Source } from '../../../configs/assets.config.mjs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';

export default function NavBar(props) {

    return (
        <View style={styles.container}>
            <Image
                style={styles.stretch}
                source={require('./../../../assets/splash.png')}
            />
            <TouchableOpacity>
                <FontAwesomeIcon size={25} icon={faMessage} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    stretch: {
        width: 120,
        height: 50,
        resizeMode: 'cover',
    },
})