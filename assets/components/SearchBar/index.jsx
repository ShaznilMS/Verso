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
            <View style={styles.searchBar}>
                <TextInput
                    cursorColor={"#666666"}
                    style={styles.searchText}
                    placeholder='Search...'
                />
                <TouchableOpacity activeOpacity={.8}>
                    <FontAwesomeIcon size={25} icon={faSearch} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'column',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    searchBar: {
        width: '100%',
        borderRadius: 25,
        height: 50,
        backgroundColor: "#ffffff",
        resizeMode: 'cover',
        elevation: 4,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchText: {
        fontSize: 20,
        flex: 1
    }
})