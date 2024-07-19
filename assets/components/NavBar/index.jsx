import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image_Source } from '../../../configs/assets.config.mjs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import SearchBar from '../SearchBar';

export default function NavBar(props) {

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.stretch}
                    source={require('./../../../assets/splash.png')}
                />
                <TouchableOpacity activeOpacity={.8}>
                    <FontAwesomeIcon size={25} icon={faMessage} />
                </TouchableOpacity>
            </View>
            <SearchBar />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 40
    },
    stretch: {
        width: 120,
        height: 50,
        resizeMode: 'cover',
    },
})