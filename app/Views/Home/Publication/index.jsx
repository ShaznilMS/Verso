import { getAuth } from "@firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import sha256 from "sha256";
import { app } from "../../../../configs/firebase.config.mjs";
import { get, getDatabase, ref, set, update } from 'firebase/database';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


export default function AddPublication({ navigation }) {

    const [postCount, setPostCount] = useState()
    const [content, setContent] = useState('')
    const [ImageID, setImageID] = useState(0)

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

                        let time = new Date();
                        const tm = time.getUTCFullYear() + '/' + time.getUTCMonth() + '/' + time.getUTCDate()

                        set(setReferenceDatabase, {
                            USER_ID: sha256(user.currentUser.email),
                            USER_NAME: data.Name,
                            CONTENT: content,
                            DATE_TIME: tm,
                            LIKES: "",
                            ID: num,
                            CATEGORY: "Filosoficas",
                            QUOTE: '~ '+ data.Name,
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
        <View style={add_publication.container}>
            <View>
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
            </View>

        </View>
    )
}

const add_publication = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    title_page: {
        fontSize: 30,
        fontWeight: '700',
        color: '#38434D'
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#38434D'
    },
    textarea: {
        flex: 1,
        backgroundColor: "#f00",
        height: 100,
        width: '100%'
    },
    button: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#000000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 60
    },
    button_text: {
        fontSize: 25,
        fontWeight: '700',
        color: "#ffffff"
    }
})