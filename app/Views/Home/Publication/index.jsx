import { getAuth } from "@firebase/auth";
import { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import sha256 from "sha256";
import { app } from "../../../../configs/firebase.config.mjs";
import { get, getDatabase, ref, set, update } from 'firebase/database';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import User from "./Components/User";
import IMAGES from "../../../../assets/USER/links.mjs";
import { AddPosts, GetAuthentication } from "../../../Settings/index.mjs";

export default function AddPublication({ navigation }) {
    const [Autor, setAutor] = useState('')
    const [ImageNumber, SetImageNumber] = useState(0)
    const [postCount, setPostCount] = useState()
    const [content, setContent] = useState('')

    const [stamp, SetStamp] = useState('')

    function timeStamp() {
        let time = new Date();
        const tm = time.getUTCDate() + '/' + time.getUTCMonth() + '/' + time.getUTCFullYear()
        SetStamp(tm)
    }

    stamp === '' ? timeStamp() : console.log(stamp)

    function handleAutor(autor) {
        setAutor(autor)
    }

    function IMG(id) {
        SetImageNumber(id)
    }

    function back() {
        navigation.goBack()
    }

    function addPublication() {

        const email = getAuth(app).currentUser.email

        const DATABASE = getDatabase(app)
        const reference = ref(DATABASE, 'USERS/' + sha256(email))

        get(reference)
            .then((_values) => {
                GetAuthentication().then((value) => {
                    AddPosts({
                        CONTEUDO: content, 
                        AUTOR: Autor, 
                        CATEGORIA: 'Filosofia', 
                        USER_ID: sha256(value.auth.email), 
                        USER_NAME: _values.val().Name,
                        IMAGE_ID: ImageNumber
                    }).then((result) => {
                        console.log('Success', result);
                        if( result == 'Post adicionado com sucesso!') {
                            navigation.goBack()
                        }
                    })
                    
                })
            })
    }

    return (


        <View style={styles.container}>
            <View style={styles.Card}>
                <User user='Antonio Cossa' time={stamp} back={back} pub={addPublication} />
                <ImageBackground source={{ uri: IMAGES[ImageNumber].image }} style={{ width: '100%', minHeight: 250, resizeMode: "cover" }}>
                    <View style={styles.content}>

                        <TextInput onChangeText={setContent} style={styles.input} multiline={true} placeholder='Insira seu pensamento...' placeholderTextColor='#fff' />
                        <TextInput onChangeText={setAutor} style={styles.input} multiline={true} placeholder='Autor...' placeholderTextColor='#fff' />
                    </View>
                </ImageBackground>
            </View>

            <FlatList data={IMAGES}
                horizontal={true}
                renderItem={({ item }) => {

                    return (

                        <TouchableOpacity onPress={() => IMG(item.id)} style={styles.img_cont}>
                            <Image source={{ uri: item.image }} style={styles.img} resizeMode="cover" />
                        </TouchableOpacity>

                    )
                }
                } />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    content: {
        width: '100%',
        minHeight: 250,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    Card: {
        backgroundColor: "#fff",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        flexWrap: 'wrap',
        fontSize: 18,
        fontWeight: 'regular',
        textDecorationLine: 'none',
        textDecorationStyle: 'dotted',
        textDecorationColor: '#ffffff',
        textAlign: 'center',
        color: '#fff'
    },
    input_autor: {
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'none',
        textDecorationStyle: 'dotted',
        textDecorationColor: '#ffffff',
        textAlign: 'center',
        color: '#fff'
    },
    img_cont: {
        width: 100,
        height: 100,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        backgroundColor: "#ffffff"
    },
    img: {
        width: '100%',
        height: '100%',
        borderWidth: 3,
        borderColor: '#fff'
    }
})