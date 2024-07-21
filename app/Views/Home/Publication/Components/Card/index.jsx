import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated, Vibration } from "react-native";
import User from "../User";
import ActionBar from "../ActionBar";

export default function Card(props) {

    const [selected, setSelected] = useState(false)

    const value = useState(new Animated.Value(1))[0]

    const font = useState(new Animated.Value(18))[0]

    const color = useState(new Animated.Value(0))[0]

    const clickIn = Animated.timing(value, {
        toValue: .6,
        duration: 500,
        useNativeDriver: false
    })

    const clickOut = Animated.timing(value, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
    })

    const zoomIn = Animated.timing(font, {
        toValue: 30,
        duration: 500,
        useNativeDriver: false
    })

    const zoomOut = Animated.timing(font, {
        toValue: 18,
        duration: 500,
        delay: 2000,
        useNativeDriver: false
    })

    // const dark = Animated.timing(color, {
    //     toValue: "#333333",
    //     duration: 1000,
    //     useNativeDriver: false
    // })

    return (
        <View style={styles.container}>

            {/* <TouchableOpacity
                onLongPress={() => {
                    clickIn.start();
                    setSelected(true);
                    console.log('Long Press')
                    Vibration.vibrate(40)
                }}
                onPressOut={() => {
                    clickOut.start()
                }}
                onPressIn={() => {
                    console.log('Blur');
                    setSelected(false)
                }}
                activeOpacity={1}
            > */}
                <Animated.View style={[card.container, { opacity: value }, { backgroundColor: color }]}>

                    <User time={props.time} user={props.name} />
                    <View style={styles.content}>
                        <View>
                            <Animated.Text onLongPress={() => zoomIn.start()} onPressOut={() => zoomOut.start()} style={{ paddingHorizontal: 20, fontSize: font, textAlign: 'center', fontWeight: 400 }}>{props.text}</Animated.Text>
                            <Text style={{ textAlign: 'center', fontWeight: 700, top: 30 }}>{props.citation ? props.citation : ''}</Text>
                        </View>
                    </View>
                    <ActionBar likes='50' coments='3' shares='23' />
                </Animated.View>
            {/* </TouchableOpacity> */}
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
        minHeight:250,
        borderTopWidth: 1,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5a4',
        backgroundColor: '#f5f5f5a4',
        justifyContent:'center'
    }
})

const card = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: '100%'
    }
})