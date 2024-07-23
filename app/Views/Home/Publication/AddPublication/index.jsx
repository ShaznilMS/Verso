import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import User from '../Components/User'

const AddPublication = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <User user='Antonio Cossa' time='20/07/24' back={navigation.goBack()}/>
        </View>
    )
}

export default AddPublication

const styles = StyleSheet.create({})
