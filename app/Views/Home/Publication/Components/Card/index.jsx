import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import User from '../User'
import ActionBar from '../ActionBar/index'

const Card = (props) => {
    return (
        <TouchableOpacity activeOpacity={1} style={{ borderTopWidth: 5, borderColor: '#d4d4d43d' }} onPress={props.onPress}>
            <User time='20/07/24' user='Antonio Cossa' />
            <View style={styles.content}>
                <View>
                    <Text style={{ textAlign: 'center', fontWeight: 500 }}>{props.content}Prefiro encarar a derrota com plena consciência de sua inevitabilidade do que me iludir com uma falsa expectativa de vitória</Text>
                    <Text style={{ textAlign: 'center', fontWeight: 700, top: 30 }}>{props.cit}Raimundo Chitava</Text>
                </View>
            </View>
            <ActionBar likes='50' coments='3' shares='23' />
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    content: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5a4',
        width: '100%',
        paddingVertical: 50,
        backgroundColor: '#f5f5f5a4',
        paddingHorizontal: 10
    }
})
