import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';

const img = require('./images.jpg')

const User = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.user}>
            <TouchableOpacity style={{paddingEnd:10}} onPress={props.onPress}><FontAwesomeIcon icon={faArrowLeft} size={25}/></TouchableOpacity>
                <View style={styles.img_cont}>
                    <Image source={img} style={styles.img} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{props.user}</Text>
                    <Text style={styles.time}>{props.time}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.options} onPress={props.onPress}><FontAwesomeIcon icon={faEllipsis} color='#cfcfcf' size={25}/></TouchableOpacity>
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:20
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    img_cont: {
        width: 60,
        height: 60,
        borderRadius: 100,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        backgroundColor: "#ffffff",
        padding: 5
    },
    info: {},
    user:{
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    name:{
        fontWeight:'bold',
        fontSize:15
    },
    time:{
        fontWeight:'bold',
        fontSize:12,
        color:'#afaeae'
    }
})
