import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import Categorie from '../../../../assets/components/Categorie';
import { get, getDatabase, ref } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';

let PostCount
let Publication = [{}, {}]

export default function Home({ navigation }) {

    const [Pub, setPub] = useState([])
    const [started, setStarted] = useState(false)
    const [category, setCategory] = useState('Tudo')
    const [isRefreshing, setIsRefrshing] = useState(false)
    const USER_PROFILE = require('./../../../../assets/USER/USER_PROFILE.jpg')

    const handleCategory = (category) => {
        setCategory(category)
    }

    function handleRefresh() {
        setIsRefrshing(true)
        getPublications()
        setIsRefrshing(false)
    }

    function getPublications() {
        console.log('Get publication!');
        const db = getDatabase(app)

        const referenceDatabase = ref(db, 'publication/')

        get(referenceDatabase)
            .then((val) => {
                Publication = val.val()
                atualizar(val.val())
            })
    }

    function atualizar(data) {
        setPub(data)
        console.log(Pub)
    }

    useEffect(() => {
        if (!started) {
            getPublications()
            setStarted(true)
        }
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
                data={Pub}
                style={{ flex: 1, backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                renderItem={(item) => {
                    console.log(' ');
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