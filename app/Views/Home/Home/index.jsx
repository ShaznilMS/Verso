import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, BackHandler, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar';
import Categorie from '../../../../assets/components/Categorie';
import { getDatabase, limitToLast, onValue, query, ref } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faMessage, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faPen, faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons';
import Card from '../Publication/Components/Card';
import { createStackNavigator } from '@react-navigation/stack';
import Details from '../Publication/Details';
import { GetPosts, GetUserVerified, LikePost } from '../../../Settings/index.mjs';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from '@firebase/auth';
import sha256 from 'sha256';

export default function Home({ navigation }) {

    const [Pub, setPub] = useState([]);
    const [data, setData] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [category, setCategory] = useState('Tudo');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const USER_PROFILE = require('./../../../../assets/USER/USER_PROFILE.jpg');
    const [selected, setSelected] = useState();
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState('');
    const [edited, setEdited] = useState(false);
    const [limit, setLimit] = useState(10);
    const [Verified, setVerified] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            handleRefresh();
            const onBackPress = () => {
                Alert.alert(
                    "",
                    "Realmente deseja sair?",
                    [
                        { text: "Cancelar", onPress: () => null, style: "cancel" },
                        { text: "Sair", onPress: () => { BackHandler.exitApp(); } }
                    ]
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [navigation])
    );

    const DATABASE = getDatabase(app)
    const POST_REFERENCE = ref(DATABASE, 'POSTS/')

    // function TestGetPosts(Limit = 10) {
    //     const QUERY = query(POST_REFERENCE, limitToLast(Limit))

    //     onValue(QUERY, (value) => {
    //         if (value) {
    //             console.log(value.val())
    //         }
    //     })
    // }

    const handleCategory = (category) => {
        setCategory(category);
    };

    function handleRefresh() {
        setIsRefreshing(true);
        GetPost().then(() => {
            GetVerified().finally(() => {
                setIsRefreshing(false);
            });
        });
    }

    async function GetPost() {
        let data = [];
        await GetPosts(limit) ? await GetPosts(limit).then((value) => data = value) : [];
        setData(data);
        setIsRefreshing(false);
    }

    async function GetVerified() {
        const USERS_TO_FETCH = [];
        const verifiedMap = {};

        Object.values(data).forEach((value) => {
            if (!USERS_TO_FETCH.includes(value.USER_ID)) {
                USERS_TO_FETCH.push(value.USER_ID);
            }
        });

        const verificationPromises = USERS_TO_FETCH.map((userId) => GetUserVerified(userId));
        const verifiedResults = await Promise.all(verificationPromises);

        verifiedResults.forEach((result, index) => {
            let dados = Object.values(result);
            verifiedMap[USERS_TO_FETCH[index]] = dados[0].value_;
        });

        setVerified(verifiedMap);
    }

    useEffect(() => {
        if (!isStarted) {
            const fetchData = async () => {
                await GetPost(10);
                await GetVerified().finally(() => {
                    setIsRefreshing(false)
                });
                setIsStarted(true);
            };

            fetchData();
        }
    }, [isStarted]);

    const [refreshing, setRefreshing] = useState(false);

    function Like(ID) {
        LikePost(getItemID(ID), getUserID());
    }

    function getItemID(index) {
        return Object.keys(data).reverse()[index];
    }

    function getUserID() {
        return sha256(getAuth(app).currentUser.email);
    }

    return (
        <View style={styles.bg}>
            <NavBar />
            <View style={styles.container}>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} bounces={false} alwaysBounceHorizontal={false} bouncesZoom={false} horizontal >
                        <Categorie text='Tudo' Selecionada={category === 'Tudo'} onPress={() => { handleCategory('Tudo'); }} />
                        <Categorie text='Filosóficas' Selecionada={category === 'Filosofica'} onPress={() => { handleCategory('Filosofica'); }} />
                        <Categorie text='Poemas' Selecionada={category === 'Poemas'} onPress={() => { handleCategory('Poemas'); }} />
                        <Categorie text='Acolhedoras' Selecionada={category === 'Acolhedoras'} onPress={() => { handleCategory('Acolhedoras'); }} />
                        <Categorie text='Motivacionais' Selecionada={category === 'Motivacionais'} onPress={() => { handleCategory('Motivacionais'); }} />
                        <Categorie text='Amor' Selecionada={category === 'Amor'} onPress={() => { handleCategory('Amor'); }} />
                        <Categorie text='Amizade' Selecionada={category === 'Amizade'} onPress={() => { handleCategory('Amizade'); }} />
                        <Categorie text='Vida' Selecionada={category === 'Vida'} onPress={() => { handleCategory('Vida'); }} />
                        <Categorie text='Trabalho' Selecionada={category === 'Trabalho'} onPress={() => { handleCategory('Trabalho'); }} />
                        <Categorie text='Espiritualidade' Selecionada={category === 'Espiritualidade'} onPress={() => { handleCategory('Espiritualidade'); }} />
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
                    setEdited(false);
                }}
                renderItem={({ item, index }) => {
                    let likes = item.LIKES ? Object.values(item.LIKES).length : 0;

                    let _isVerifieda = Boolean(Verified[item.USER_ID])

                    if (category === 'Tudo' || category === item.CATEGORY) {
                        return (
                            <Card
                                onShare={() => {  }}
                                isVerified={_isVerifieda}
                                Likes={likes}
                                img={item.IMAGE_ID}
                                name={item.USER_NAME}
                                text={item.POST}
                                time={item.DATE_TIME}
                                citation={item.QUOTE}
                                onLike={() => { Like(index); handleRefresh(); }}
                                onComment={() => { navigation.navigate('StackNavigator', { screen: 'Details', params:  { data: item } }); }}
                            />
                        );
                    }

                    return null;
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
                    navigation.navigate('StackNavigator', { screen: 'AddPublication' });
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
                        <TextInput style={{ fontWeight: '500', fontSize: 18, color: "#333" }} multiline defaultValue={selected >= 0 ? Pub[selected].CONTENT : ''} onChangeText={(valor) => { setEditText(valor); }}></TextInput>
                        : []
                    }

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                setEdit(false);
                            }}
                        >
                            <View style={{ borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#000000" }}>
                                <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: '700', letterSpacing: 4 }}>Back</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                setEdit(false);
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
    );
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
});

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
    }
});