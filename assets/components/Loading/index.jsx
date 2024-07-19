import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Modal, SafeAreaView } from 'react-native';

export default function Loading(props) {

    if (props.isLoading) {
        return (
            <Modal>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar hidden={true} backgroundColor='#f00'></StatusBar>
                    <ActivityIndicator size={40} color={'#000000'}></ActivityIndicator>
                </SafeAreaView>
            </Modal>
        )
    }
}