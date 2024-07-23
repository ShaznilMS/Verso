import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated, Vibration, ImageBackground } from "react-native";
import User from "../User";
import ActionBar from "../ActionBar";
import IMAGES from '../../../../../../assets/USER/links.mjs'

export default function Card(props) {

    const [ImageNumber, SetImageNumber] = useState(0)

    const [selected, setSelected] = useState(false)

    const value = useState(new Animated.Value(1))[0]

    const font = useState(new Animated.Value(18))[0]

    const color = useState(new Animated.Value(0))[0]


    const zoomIn = Animated.timing(font, {
        toValue: 22,
        duration: 500,
        useNativeDriver: false
    })

    const zoomOut = Animated.timing(font, {
        toValue: 18,
        duration: 500,
        delay: 2000,
        useNativeDriver: false
    })

    return (

        <View View style={styles.container} >

            <Animated.View style={[card.container, { backgroundColor: color }]}>
                <User time={props.time} user={props.name} />
                <ImageBackground source={{ uri: IMAGES[props.img].image }} style={{ width: '100%', minHeight: 250, resizeMode: "cover" }}>
                    <View style={styles.content}>
                        <View>
                            <Animated.Text onLongPress={() => zoomIn.start()} onPressOut={() => zoomOut.start()} style={{ paddingHorizontal: 20, fontSize: font, color: '#fff', textAlign: 'center', fontWeight: 400 }}>{props.text}</Animated.Text>
                            <Text style={{ textAlign: 'center', fontWeight: 700, top: 30, color: '#fff' }}>{props.citation ? props.citation : ''}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <ActionBar likes='3' coments='1' shares='2' onComment={props.onComment} />
            </Animated.View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ffffff",
        borderTopWidth: 5,
        borderTopColor: '#eee'
    },
    content: {
        width: '100%',
        minHeight: 250,
        paddingVertical: 20,
        justifyContent: 'center'
    }
})

const card = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: '100%'
    }
})