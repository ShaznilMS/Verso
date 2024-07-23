import react, { useState } from "react";
import { View, Text, TextInput, Animated, Keyboard, StyleSheet, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { IMAGES } from "../assets/USER/links.mjs";

export default function App() {

    const transY = useState(new Animated.Value(0))[0]

    const handleFocus = () => {
        console.log('Focus');
        Animated.timing(transY, {
            toValue: -40,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const handleBlur = () => {
        console.log('Blur');
        Keyboard.dismiss()
        Animated.timing(transY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const transX = transY.interpolate({
        inputRange: [-40, 0],
        outputRange: [-20, 0],
        extrapolate: 'clamp'
    })

    const handleKeyboardDismiss = () => {
        Keyboard.dismiss()
    }

    function Input({ label }) {
        return (
            <View style={{}}>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <Animated.Text style={[styles.Label, { transform: [{ translateY: transY }, { translateX: transX }] }]}>{label}</Animated.Text>
                    <TextInput onFocus={handleFocus} onBlur={handleBlur} style={styles.Input} />
                </View>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss} accessible={false}>

            {/* <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: 'orange' }}
            > */}
                <ScrollView style={{flex: 1}}>
                    <Input label={"Enter email"} />
                </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    Label: {
        position: "absolute",
        zIndex: 1,
        paddingHorizontal: 20,
        fontWeight: '600',
        fontSize: 16
    },
    Input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#fff"
    }
})