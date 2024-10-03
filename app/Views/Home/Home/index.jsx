import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert, BackHandler, ActivityIndicator } from 'react-native';
import NavBar from '../../../../assets/components/NavBar';
import Categorie from '../../../../assets/components/Categorie';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '../Publication/Components/Card';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('Tudo');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState('');
    const [selected, setSelected] = useState();
    const [limit, setLimit] = useState(10)
    const [Verified, setVerified] = useState([])
    
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
            <NavBar onPress={() => {navigation.navigate('StackNavigator',{ screen: 'Chats'})}} />
            <View style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <Categorie text='Tudo' Selecionada={category === 'Tudo'} onPress={() => {}} />
                    <Categorie text='Filosóficas' Selecionada={category === 'Filosofica'} onPress={() => {}} />
                    <Categorie text='Poemas' Selecionada={category === 'Poemas'} onPress={() => {}} />
                    <Categorie text='Acolhedoras' Selecionada={category === 'Acolhedoras'} onPress={() => {}} />
                    <Categorie text='Motivacionais' Selecionada={category === 'Motivacionais'} onPress={() => {}} />
                    <Categorie text='Amor' Selecionada={category === 'Amor'} onPress={() => {}} />
                    <Categorie text='Amizade' Selecionada={category === 'Amizade'} onPress={() => {}} />
                    <Categorie text='Vida' Selecionada={category === 'Vida'} onPress={() => {}} />
                    <Categorie text='Trabalho' Selecionada={category === 'Trabalho'} onPress={() => {}} />
                    <Categorie text='Espiritualidade' Selecionada={category === 'Espiritualidade'} onPress={() => {}} />
                </ScrollView>
            </View>

            <FlatList
                data={Object.values(data).filter(item => category === 'Tudo' || category === item.CATEGORY).reverse()}
                style={{ flex: 1, backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<Loading isLoading={isRefreshing} />}
                refreshing={isRefreshing}
                onEndReached={() => {}}
                onEndReachedThreshold={0.2}
                onRefresh={() => {}}
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
                            onLike={() => { Like(index)}}
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
