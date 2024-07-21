import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const img = require('./images.jpg')

const Coment = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <View style={styles.img_cont}>
                    <Image source={img} style={styles.img} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{props.user}</Text>
                    <Text style={styles.content}>{props.time}</Text>
                </View>
            </View>
            <View style={styles.coment}>
                <Text>{props.content}</Text>
                <View style={styles.bottom}>
                    <Text style={{ color: '#777777', fontWeight: 500 }}>Responder</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <TouchableOpacity><FontAwesomeIcon color='#777777' icon={faHeart} /></TouchableOpacity>
                        <TouchableOpacity><Text style={{ color: '#777777', fontWeight: 500 }}>{props.ComentLikes} </Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Coment

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 20
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
    user: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    content: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#afaeae',
        maxWidth: 200
    },
    coment: {
        backgroundColor: '#eeeeee',
        borderRadius: 15,
        gap: 20,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    bottom: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
