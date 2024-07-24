import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert, BackHandler, ActivityIndicator } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar';
import Categorie from '../../../../assets/components/Categorie';
import { getDatabase, ref, onValue, query, limitToLast, get } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '../Publication/Components/Card';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from '@firebase/auth';
import sha256 from 'sha256';
import { GetPosts, GetUserVerified, LikePost } from '../../../Settings/index.mjs';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('Tudo');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState('');
    const [selected, setSelected] = useState();
    const [limit, setLimit] = useState(10)
    const [Verified, setVerified] = useState([])
    const db = getDatabase(app);

    useFocusEffect(
        React.useCallback(() => {
            const handleRefresh = () => {
                setIsRefreshing(true);
                fetchPosts(limit);
            };

            const onBackPress = () => {
                Alert.alert(
                    "",
                    "Realmente deseja sair?",
                    [
                        { text: "Cancelar", onPress: () => null, style: "cancel" },
                        { text: "Sair", onPress: () => BackHandler.exitApp() }
                    ]
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Fetch posts initially
            handleRefresh();

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [navigation])
    );



    async function GetVerified() {
        const USERS_TO_FETCH = [];
        const verifiedMap = {};

        Object.values(data).forEach((value) => {
            if (!USERS_TO_FETCH.includes(value.USER_ID)) {
                USERS_TO_FETCH.push(value.USER_ID);
            }
        });

        // Use Promise.all para aguardar todas as promessas
        const verificationPromises = USERS_TO_FETCH.map((userId) => GetUserVerified(userId));
        const verifiedResults = await Promise.all(verificationPromises);

        verifiedResults.forEach((result, index) => {
            verifiedMap[USERS_TO_FETCH[index]] = result;
        });

        setVerified(verifiedMap);
        // console.log(verifiedMap);
    }

    const fetchPosts = () => {
        const postsRef = ref(db, 'POSTS');
        const QUERY = query(postsRef, limitToLast(limit))

        get(postsRef).then((snapshot) => {
            const data = snapshot.val();
            console.log('Tamanho: ' + Object.values(data).length);
            const formattedData = data ? data : [];
            setData(formattedData);
            GetVerified()
            setIsRefreshing(false);
        });
    };

    const handleCategory = (category) => {
        setCategory(category);
    };

    const Like = (ID) => {
        LikePost(getItemID(ID), getUserID());
    };

    const getItemID = (index) => {
        return Object.keys(data).reverse()[index];
    };

    const getUserID = () => {
        return sha256(getAuth(app).currentUser.email);
    };
    
    function Loading({ isLoading }) {

        if (!isLoading) return null

        return (
            <View style={{
                width: '100%',
                height: 30
            }}>
                <ActivityIndicator color={"#000"} size={30}></ActivityIndicator>
            </View>
        )
    }

    return (
        <View style={styles.bg}>
            <NavBar />
            <View style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <Categorie text='Tudo' Selecionada={category === 'Tudo'} onPress={() => { handleCategory('Tudo') }} />
                    <Categorie text='Filosóficas' Selecionada={category === 'Filosofica'} onPress={() => { handleCategory('Filosofica') }} />
                    <Categorie text='Poemas' Selecionada={category === 'Poemas'} onPress={() => { handleCategory('Poemas') }} />
                    <Categorie text='Acolhedoras' Selecionada={category === 'Acolhedoras'} onPress={() => { handleCategory('Acolhedoras') }} />
                    <Categorie text='Motivacionais' Selecionada={category === 'Motivacionais'} onPress={() => { handleCategory('Motivacionais') }} />
                    <Categorie text='Amor' Selecionada={category === 'Amor'} onPress={() => { handleCategory('Amor') }} />
                    <Categorie text='Amizade' Selecionada={category === 'Amizade'} onPress={() => { handleCategory('Amizade') }} />
                    <Categorie text='Vida' Selecionada={category === 'Vida'} onPress={() => { handleCategory('Vida') }} />
                    <Categorie text='Trabalho' Selecionada={category === 'Trabalho'} onPress={() => { handleCategory('Trabalho') }} />
                    <Categorie text='Espiritualidade' Selecionada={category === 'Espiritualidade'} onPress={() => { handleCategory('Espiritualidade') }} />
                </ScrollView>
            </View>

            <FlatList
                data={Object.values(data).filter(item => category === 'Tudo' || category === item.CATEGORY).reverse()}
                style={{ flex: 1, backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<Loading isLoading={isRefreshing} />}
                refreshing={isRefreshing}
                onEndReached={() => setLimit(limit + 10)}
                onEndReachedThreshold={0.2}
                onRefresh={() => {fetchPosts(limit); console.log(limit)}}
                renderItem={({ item, index }) => {
                    let likes = item.LIKES ? Object.values(item.LIKES).length : 0;
                    let _isVerified = Verified[item.USER_ID]

                    return (
                        <Card
                            isVerified={_isVerified}
                            onShare={() => console.log(limit)}
                            Likes={likes}
                            img={item.IMAGE_ID}
                            name={item.USER_NAME}
                            text={item.POST}
                            time={item.DATE_TIME}
                            citation={item.QUOTE}
                            onLike={() => { Like(index); fetchPosts(limit); }}
                            onComment={() => { navigation.navigate('StackNavigator', { screen: 'Details', params: { data: item } }); }}
                        />
                    );
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
                        <TextInput style={{ fontWeight: '500', fontSize: 18, color: "#333" }} multiline defaultValue={selected >= 0 ? Pub[selected].CONTENT : ''} onChangeText={(valor) => { setEditText(valor) }}></TextInput>
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
                                // Implement edit functionality
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
});
