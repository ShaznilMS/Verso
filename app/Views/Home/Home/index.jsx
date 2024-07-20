import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import Categorie from '../../../../assets/components/Categorie';
import { get, getDatabase, ref } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Home({ navigation }) {

    const [category, setCategory] = useState('Tudo')
    const [isRefreshing, setIsRefrshing] = useState(false)
    const [Publication, setPublication] = useState([])
    const [showAddPublication, setShowAddPublication] = useState(false)
    const USER_PROFILE = require('./../../../../assets/USER/USER_PROFILE.jpg')

    const handleCategory = (category) => {
        setCategory(category)
    }

    function handleRefresh() {
        getPublications()
    }

    function getPublications() {
        const db = getDatabase(app)

        const referenceDatabase = ref(db, 'publication/')

        get(referenceDatabase)
            .then((val) => {
                setPublication(val.val())
            })
    }

    function addPublication() {
        console.log('Add Publication');
    }

    useEffect(() => {
        getPublications()
    })

    return (

        <View style={styles.bg}>
            <NavBar />
            <View style={styles.container}>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} bounces={false} alwaysBounceHorizontal={false} bouncesZoom={false} horizontal >
                        <Categorie text='Tudo' Selecionada={category === 'Tudo'} onPress={() => { handleCategory('Tudo') }} />
                        <Categorie text='Filosóficas' Selecionada={category === 'Filosóficas'} onPress={() => { handleCategory('Filosóficas') }} />
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
                data={Publication}
                style={{ flex: 1, backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                renderItem={(item) => {
                    return (
                        <View style={publication.container}>
                            <View style={publication.top}>
                                <Image style={publication.user_profile} source={USER_PROFILE} />
                                <Text style={publication.user_name} >{item['item'].USER_NAME}</Text>
                            </View>

                            <Text style={publication.content}>{item['item'].CONTENT}</Text>

                            <View style={publication.bottom}>
                                <FontAwesomeIcon size={22} color='#666666' icon={faHeart} />
                                <FontAwesomeIcon size={22} color='#666666' icon={faMessage} />
                                <FontAwesomeIcon size={22} color='#666666' icon={faArrowUpFromBracket} />
                            </View>
                        </View>
                    )
                }}
            />

            <TouchableOpacity
                activeOpacity={.8}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                }}
                onPress={() => { setShowAddPublication(!showAddPublication) }}
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

            <Modal
                animationType='slide'
                visible={showAddPublication}
            >

                <View style={add_publication.container}>
                    <View>
                        <Text style={add_publication.title_page}>New Publication</Text>
                        <Text style={add_publication.title}>Post</Text>

                        <TextInput style={{ width: '100%', flexWrap: 'wrap', fontSize: 25, fontWeight: '700', textDecorationLine: 'none', textDecorationStyle: 'dotted', textDecorationColor: '#ffffff' }} multiline={true} placeholder='Post...' />

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
                            onPress={() => { setShowAddPublication(!showAddPublication) }}
                            activeOpacity={.8}
                        >
                            <View style={add_publication.button}>
                                <Text style={add_publication.button_text}>Voltar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>

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
        fontSize: 40,
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

const publication = StyleSheet.create({
    container: {
        margin: 10,
        gap: 15,
        padding: 15,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: "#ffffff"
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    user_profile: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    user_name: {
        fontSize: 20,
        fontWeight: 'bold'
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
        paddingHorizontal: 10,
    },

})