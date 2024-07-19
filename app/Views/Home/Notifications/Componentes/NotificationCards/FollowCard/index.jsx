import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const img = require('../images.jpg')

const FollowCard = () => {
    return (
        <View style={styles.container}>
            <Image source={img} style={styles.img} />
        </View>
    )
}

export default FollowCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 220,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#8000ff'
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff'
    }
})
