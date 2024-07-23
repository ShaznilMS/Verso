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

export default function AddPublication({ navigation }) {

    const [ImageNumber, SetImageNumber] = useState(0)
    const [postCount, setPostCount] = useState()
    const [content, setContent] = useState('')
    const [ImageID, setImageID] = useState(0)

    const [stamp, SetStamp] = useState('')

    function timeStamp() {
        let time = new Date();
        const tm = time.getUTCDate() + '/' + time.getUTCMonth() + '/' + time.getUTCFullYear()
        SetStamp(tm)
    }

    stamp === '' ? timeStamp() : console.log(stamp)

    function IMG(id) {
        console.log(id)
        SetImageNumber(id)
    }

    function back() {
        navigation.goBack()
    }

    function addPublication() {
        const user = getAuth(app)

        const db = getDatabase(app)
        const getReferenceDatabase = ref(db, 'users/' + sha256(user.currentUser.email))
        const appReferenceDatabase = ref(db, 'post_number/')

        console.log('Add publication!', user.currentUser.email);

        get(getReferenceDatabase)
            .then((val) => {
                const data = val.val()
                PostCount = data.Post_Count
                let _post_index = data.Post_Index ? data.Post_Index : []

                console.log('Getted!');

                console.log(_post_index);

                get(appReferenceDatabase)
                    .then((app_user) => {
                        const POST_ID = app_user.val()
                        console.log('Getted!');

                        const num = POST_ID
                        const setReferenceDatabase = ref(db, 'publication/' + num)
                        let Post_index = _post_index

                        console.log(Post_index);



                        set(setReferenceDatabase, {
                            USER_ID: sha256(user.currentUser.email),
                            USER_NAME: data.Name,
                            CONTENT: content,
                            DATE_TIME: stamp,
                            LIKES: "",
                            ID: num,
                            CATEGORY: "Filosoficas",
                            QUOTE: '~ ' + data.Name,
                            STATUS: "Initial",
                            COMMENTARY: "",
                            IMAGE_ID: ImageID
                        }).then(() => {
                            console.log('Setted!');
                            _post_index.push(POST_ID)
                            // update(getReferenceDatabase, { Post_Count: data.Post_Count + 1 })

                            console.log({ Post_Count: data.Post_Count + 1, Post_Index: _post_index });
                            console.log(num, _post_index);

                            update(getReferenceDatabase, { Post_Count: data.Post_Count + 1, Post_Index: _post_index })
                                .then(() => {
                                    set(appReferenceDatabase, num + 1)
                                        .then(() => {
                                            console.log('Updated!');
                                            navigation.goBack()
                                        })
                                })
                        })
                    })

            })
            .finally(() => {
            })
        // set()
    }

    return (


        <View style={styles.container}>
            <View style={styles.Card}>
                <User user='Antonio Cossa' time={stamp} back={back} pub={addPublication} />
                <ImageBackground source={{ uri: IMAGES[ImageNumber].image }} style={{ width: '100%', minHeight: 250, resizeMode: "cover" }}>
                    <View style={styles.content}>

                        <TextInput onChangeText={setContent} style={styles.input} multiline={true} placeholder='Insira seu pensamento...' placeholderTextColor='#fff' />
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Citacao</Text>
                    </View>
                </ImageBackground>
            </View>

            <FlatList data={IMAGES}
                horizontal={true}
                renderItem={({ item }) => {

                    return (

                        <TouchableOpacity onPress={IMG(item.id)} style={styles.img_cont}>
                            <Image source={{ uri: item.image }} style={styles.img} resizeMode="cover" />
                        </TouchableOpacity>

                    )
                }
                } />
        </View>
    )
}

{/* <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={add_publication.title_page}>New Publication</Text>
                    <TouchableOpacity
                        onPress={addPublication}
                        activeOpacity={.8}>
                        <View style={{ padding: 15, borderRadius: 30, backgroundColor: "#000000" }}>
                            <FontAwesomeIcon icon={faPaperPlane} size={20} color="#ffffff" />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={add_publication.title}>Post</Text>

                <TextInput onChangeText={setContent} style={{ width: '100%', flexWrap: 'wrap', fontSize: 25, fontWeight: '700', textDecorationLine: 'none', textDecorationStyle: 'dotted', textDecorationColor: '#ffffff' }} multiline={true} placeholder='Post...' />
                <TextInput onChangeText={setImageID} keyboardType="decimal-pad" placeholder="Insert_image_id..." style={{ width: '100%', flexWrap: 'wrap', fontSize: 25, fontWeight: '700', textDecorationLine: 'none', textDecorationStyle: 'dotted', textDecorationColor: '#ffffff' }}/>
            </View>
            <View style={{ gap: 10 }}>
                <TouchableOpacity
                    onPress={addPublication}
                    activeOpacity={.8}
                >
                    <View style={add_publication.button}>
                        <Text style={add_publication.button_text}>Publicar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}//navigate('TabNavigator', {screen: 'Home'})  }}
                    activeOpacity={.8}
                >
                    <View style={add_publication.button}>
                        <Text style={add_publication.button_text}>Voltar</Text>
                    </View>
                </TouchableOpacity>
            </View> */}


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