import React, { useState } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const img = require('./images.jpg')

const User = (props) => {

    const [showOptions, setShowOptions] = useState(false)
    const iconX = useState(new Animated.Value(100))[0]

    const show = Animated.timing(iconX, {
        toValue: 0,
        duration: 200,
        delay: 300,
        useNativeDriver: true
    })

    const hide = Animated.timing(iconX, {
        toValue: 100,
        duration: 200,
        delay: 300,
        useNativeDriver: true
    })

    return (

        <TouchableOpacity
            onLongPress={() => {
                Vibration.vibrate(40)
                show.start()
            }}

            onPress={() => {
                console.log('Press');
                hide.start()
            }}

            // onPressOut={() => {
            //     handleShowOption()
            // }}
            activeOpacity={1}
        >
                <Animated.View style={styles.container}>
                    <View style={styles.user}>
                        <View style={styles.img_cont}>
                            <Image source={img} style={styles.img} />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name} numberOfLines={1}>{props.user}</Text>
                            <Text style={styles.time}>{props.time}</Text>
                        </View>
                    </View>
                    <Animated.View style={[styles.btnGroup, { transform: [{ translateX: iconX }] }]}>
                        {/* <Animated.View style={[styles.btnGroup]}> */}
                        {/* <TouchableOpacity onPress={() => handleShowOption()} style={[styles.optionsOut]}>
                    <FontAwesomeIcon icon={faEllipsis} color='#aaa' size={25} />
                </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.optionsOut]} onPress={props.onPress}>
                            <FontAwesomeIcon icon={faPenToSquare} color='#aaa' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.optionsOut]} onPress={props.onPress}>
                            <FontAwesomeIcon icon={faTrashAlt} color='#aaa' size={25} />
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
        </TouchableOpacity >
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: "#fff"
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
        gap: 10,
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        maxWidth: 150,
        fontSize: 15
    },
    time: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#afaeae'
    },
    optionsOut: {

    },
    btnGroup: {
        flexDirection: 'row',
        gap: 20
    }
})
