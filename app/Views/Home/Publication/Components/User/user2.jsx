import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faEye, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const img = require('./images.jpg')

const User2 = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <View style={styles.img_cont}>
                    <Image source={img} style={styles.img} />
                </View>
                <View style={styles.info}>
                    <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                        <Text style={styles.name}>{props.user}</Text>
                        <View style={[styles.verified, props.verified]}>
                            <FontAwesomeIcon icon={faCheck} color='#fff' size={9} />
                        </View>
                    </View>
                    <Text style={styles.time}>{props.time}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.options}><FontAwesomeIcon icon={faEllipsis} size={25} /></TouchableOpacity>
        </View>
    )
}

export default User2

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
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
    user: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    time: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#afaeae'
    },
    verified: {
        width: 13,
        height: 13,
        backgroundColor: '#00bfff',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
