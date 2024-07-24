import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, BackHandler, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import Categorie from '../../../../assets/components/Categorie';
import { update, get, getDatabase, ref } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faMessage, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faPen, faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons';
import Card from '../Publication/Components/Card';
import { createStackNavigator } from '@react-navigation/stack';
import Details from '../Publication/Details';
import { CountPostsLikes, GetAuthentication, GetPosts, LikePost } from '../../../Settings/index.mjs';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { getAuth } from '@firebase/auth';
import sha256 from 'sha256';

let PostCount
let Publication = [{}, {}]

export default function Home({ navigation }) {

    const [Pub, setPub] = useState([])
    const [data, setData] = useState([])

    const [isStarted, setIsStarted] = useState(false)
    const [category, setCategory] = useState('Tudo')
    const [isRefreshing, setIsRefrshing] = useState(false)
    const USER_PROFILE = require('./../../../../assets/USER/USER_PROFILE.jpg')
    const [selected, setSelected] = useState()
    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState('')
    const [edited, setEdited] = useState(false)
    const [limit, setLimit] = useState(10)

    useFocusEffect(
        React.useCallback(() => {
            handleRefresh()
            const onBackPress = () => {
                Alert.alert(
                    "",
                    "Realmente deseja sair?",
                    [
                        { text: "Cancelar", onPress: () => null, style: "cancel" },
                        { text: "Sair", onPress: () => { BackHandler.exitApp() } }
                    ]
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [navigation])
    )

    const handleCategory = (category) => {
        setCategory(category)
    }

    function handleRefresh() {
        setIsRefrshing(true)
        GetPost()
        // console.log(data);
        // setIsRefrshing(false)
    }

    async function GetPost() {
        let data = []
        await GetPosts(limit) ? await GetPosts(limit).then((value) => data = value) : []
        console.log(data);
        setData(data)
        setIsRefrshing(false)

    }

    useEffect(() => {
        if (!isStarted) {
            GetPost(100)
            setIsStarted(true)
        }
        console.log('Home');
    })


    const [refreshing, setRefreshing] = useState(false)

    // const Edit = (ind, value) => {
    //     let old = selected >= 0 ? Pub[selected] : []
    //     if (edited && old.CONTENT != value) {
    //         console.log(ind, value);
    //         const db = getDatabase(app)
    //         const reference = ref(db, 'publication/' + old.ID)
    //         update(reference, { CONTENT: value })
    //             .then(() => {
    //                 console.log('Post: ' + ind + ', ' + value);
    //                 setEdit(false)
    //                 getPublications()
    //             })
    //     }
    // }

    function Like(ID) {
        console.log(ID);
        console.log(getItemID(ID));
        LikePost(getItemID(ID), getUserID())
    }
    
    function getItemID(index) {
        return Object.keys(data).reverse()[index]
    }

    function getUserID() {
        return sha256(getAuth(app).currentUser.email)
    }
    
    // GetUser().then((value) => {console.log(value.Name);})
    // async function GetUser() {
    //     const db = getDatabase(app)
    //     const reference = ref(db, 'USERS/' + getUserID())
    //     let data = {}
    //     await get(reference)
    //         .then((value) => {
    //             data = value.val()
    //         })
    //         .finally(() => {
    //             console.log('Finally');
    //         })

    //     return data
    // }

    return (

        <View style={styles.bg}>
            <NavBar />
            <View style={styles.container}>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} bounces={false} alwaysBounceHorizontal={false} bouncesZoom={false} horizontal >
                        <Categorie text='Tudo' Selecionada={category === 'Tudo'} onPress={() => { handleCategory('Tudo') }} />
                        <Categorie text='Filosóficas' Selecionada={category === 'Filosofica'} onPress={() => { handleCategory('Filosofica') }} />
                        <Categorie text='Poemas' Selecionada={category === 'Poemas'} onPress={() => { handleCategory('Poemas') }} />
                        <Categorie text='Acolhedoras' Selecionada={category === 'Acolhedoras'} onPress={() => { handleCategory('Acolhedoras') }} />
                        <Categorie text='Motivacionais' Selecionada={category === 'Motivacionais'} onPress={() => { handleCategory('Motivacionais') }} />
                        <Categorie text='Amor' Selecionada={category === 'Amor'} onPress={() => { handleCategory('Amor') }} />
                        <Categorie text='Amizade' Selecionada={category === 'Amizade'} onPress={() => { handleCategory('Amizade') }} />
                        <Categorie text='Vida' Selecionada={category === 'Vida'} onPress={() => { handleCategory('Vida') }} />
                        <Categorie text='Trabalho' Selecionada={category === 'Trabalho'} onPress={() => { handleCategory('Trabalho') }} />
                        <Categorie text='Espirtualidade' Selecionada={category === 'Espirtualidade'} onPress={() => { handleCategory('Espirtualidade') }} />
                    </ScrollView>
                </View>
            </View>

            <FlatList
                data={Object.values(data).reverse()}
                style={{ flex: 1, backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                onScroll={() => {
                    setEdited(false)
                    // onSelect(null)
                }}


                renderItem={({ item, index }) => {
                    let color = "#ffffff"
                    let isSelected = false

                    if (selected == index) {
                        isSelected = true
                        color = "#E8DEF8"
                    } else {
                        color = "#ffffff"
                    }

                    // console.log(CountPostsLikes(Object.keys(data)[index]))
                    // // let likesNum = 
                    // CountPostsLikes(getItemID(index)).then((value) => { console.log(value) })

                    likes = item.LIKES ? Object.values(item.LIKES).length : 0
                    if(category == 'Tudo') {
                        return (
                            <Card Likes={likes} img={item.IMAGE_ID} name={item.USER_NAME} text={item.POST} time={item.DATE_TIME} citation={item.QUOTE} onLike={() => { Like(index); handleRefresh() }} onComment={() => { navigation.navigate('StackNavigator', { screen: 'Details', params: { data: item } }) }} />
                        )
                    } else {
                        if(category == item.CATEGORY){
                            return (
                            <Card Likes={likes} img={item.IMAGE_ID} name={item.USER_NAME} text={item.POST} time={item.DATE_TIME} citation={item.QUOTE} onLike={() => { Like(index); handleRefresh() }} onComment={() => { navigation.navigate('StackNavigator', { screen: 'Details', params: { data: item } }) }} />
                            )
                        }
                    }
                }}
            />

            <TouchableOpacity
                activeOpacity={.8}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                }}
                onPress={() => {
                    navigation.navigate('StackNavigator', { screen: 'AddPublication' })
                }}
            >


                <View
                    style={{
                        backgroundColor: "#E8DEF8",
                        width: 60,
                        height: 60,
                        elevation: 4,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <FontAwesomeIcon size={25} color='#333333' icon={faPlus} />
                </View>
            </TouchableOpacity>

            <Modal animationType='slide' visible={edit} transparent>
                <View style={{ flex: 1, backgroundColor: "#fff", padding: 20, gap: 20 }}>
                    <Text style={{ fontWeight: '700', fontSize: 30 }}>Edit</Text>

                    <Text style={{ fontWeight: '700', fontSize: 20 }}>Current</Text>
                    {edit ?
                        <Text style={{ fontWeight: '500', fontSize: 18, color: "#aaa" }}>{selected >= 0 ? Pub[selected].CONTENT : []}</Text>
                        : []
                    }

                    <Text style={{ fontWeight: '700', fontSize: 20 }}>New</Text>
                    {edit ?
                        <TextInput style={{ fontWeight: '500', fontSize: 18, color: "#333" }} multiline defaultValue={selected >= 0 ? Pub[selected].CONTENT : ''} onChangeText={(valor) => { Edited(valor) }}></TextInput>
                        : []
                    }

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                setEdit(false)
                            }}
                        >
                            <View style={{ borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#000000" }}>
                                <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: '700', letterSpacing: 4 }}>Back</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                Edit(selected, editText)
                            }}
                        >
                            <View style={{ borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#000000" }}>
                                <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: '700', letterSpacing: 4 }}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

        </View>
    )
}


const publication = StyleSheet.create({
    container: {
        margin: 10,
        gap: 15,
        padding: 15,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        backgroundColor: "#ffffff"
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    user_profile: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    user_name: {
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: 200
    },
    content: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 2
    },
    bottom: {
        flexDirection: 'row',
        gap: 25,
        paddingHorizontal: 10
    },
    bottom_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        paddingTop: 10,
        paddingHorizontal: 15
    },
    bg: {
        gap: 15,
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 0,
    },

})