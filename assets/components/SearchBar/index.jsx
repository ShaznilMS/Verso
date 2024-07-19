import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image_Source } from '../../../configs/assets.config.mjs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(props) {

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Pesquise aqui...' />
            <TouchableOpacity style={styles.search} activeOpacity={.5}><FontAwesomeIcon icon={faSearch} size={20}/></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 355,
        height: 56,
        shadowColor: '#171717',
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 30,
        paddingStart: 25,
        backgroundColor: '#fff',
        fontWeight:'bold'
    },
    search:{
        position:'absolute',
        alignSelf:'flex-end',
        right:20,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})