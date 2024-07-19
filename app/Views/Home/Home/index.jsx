import { getAuth, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import { StackActions } from '../../../../configs/views.config.mjs';
import Categorie from '../../../../assets/components/Categorie';
import { get, getDatabase, ref } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Home({ navigation }) {

    const user = getAuth(app).currentUser
    const [categoria, setCategoria] = useState('Tudo')
    const [isRefreshing, setIsRefrshing] = useState(false)
    const [Publication, setPublication] = useState([])
    const USER_PROFILE = require('./../../../../assets/USER/USER_PROFILE.jpg')

    const handleCategoriaPress = (categoria) => {
        setCategoria(categoria)
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
                // console.log(Publication[0].CONTENT);
            })
    }

    return (

        <View style={styles.bg}>
            <NavBar />
            <View style={styles.container}>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} bounces={false} alwaysBounceHorizontal={false} bouncesZoom={false} horizontal >
                        <Categorie text='Tudo' Selecionada={categoria === 'Tudo'} onPress={() => { handleCategoriaPress('Tudo') }} />
                        <Categorie text='Filosóficas' Selecionada={categoria === 'Filosóficas'} onPress={() => { handleCategoriaPress('Filosóficas') }} />
                        <Categorie text='Poemas' Selecionada={categoria === 'Poemas'} onPress={() => { handleCategoriaPress('Poemas') }} />
                        <Categorie text='Acolhedoras' Selecionada={categoria === 'Acolhedoras'} onPress={() => { handleCategoriaPress('Acolhedoras') }} />
                        <Categorie text='Motivacionais' Selecionada={categoria === 'Motivacionais'} onPress={() => { handleCategoriaPress('Motivacionais') }} />
                        <Categorie text='Amor' Selecionada={categoria === 'Amor'} onPress={() => { handleCategoriaPress('Amor') }} />
                        <Categorie text='Amizade' Selecionada={categoria === 'Amizade'} onPress={() => { handleCategoriaPress('Amizade') }} />
                        <Categorie text='Vida' Selecionada={categoria === 'Vida'} onPress={() => { handleCategoriaPress('Vida') }} />
                        <Categorie text='Trabalho' Selecionada={categoria === 'Trabalho'} onPress={() => { handleCategoriaPress('Trabalho') }} />
                        <Categorie text='Espirtualidade' Selecionada={categoria === 'Espirtualidade'} onPress={() => { handleCategoriaPress('Espirtualidade') }} />
                    </ScrollView>
                </View>
            </View>

            <FlatList
                data={Publication}
                style={{ flex: 1, backgroundColor: "#fff" }}
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
                                <FontAwesomeIcon size={22} color='#666666' icon={faHeart}/>
                                <FontAwesomeIcon size={22} color='#666666' icon={faMessage}/>
                                <FontAwesomeIcon size={22} color='#666666' icon={faArrowUpFromBracket}/>
                            </View>
                        </View>
                    )
                }}
            />

        </View>
    )
}

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