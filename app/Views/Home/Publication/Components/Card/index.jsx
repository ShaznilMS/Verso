import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated, Vibration } from "react-native";
import User from "../User";
import ActionBar from "../ActionBar";

export default function Card(props) {

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
        <TouchableOpacity onPress={props.onPress} activeOpacity={1} style={styles.container}>
            <Animated.View style={[card.container, { backgroundColor: color }]}>
                <User time={props.time} user={props.name} />
                <View style={styles.content}>
                    <View>
                        <Animated.Text onLongPress={() => zoomIn.start()} onPressOut={() => zoomOut.start()} style={{ paddingHorizontal: 20, fontSize: font, textAlign: 'center', fontWeight: 400 }}>{props.text}</Animated.Text>
                        <Text style={{ textAlign: 'center', fontWeight: 700, top: 30 }}>{props.citation ? props.citation : ''}</Text>
                    </View>
                </View>
                <ActionBar likes='3' coments='1' shares='2' />
            </Animated.View>
        </TouchableOpacity>
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
        borderTopWidth: 1,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5a4',
        backgroundColor: '#f5f5f5a4',
        justifyContent: 'center'
    }
})

const card = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: '100%'
    }
})