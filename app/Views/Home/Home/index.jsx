import { getAuth, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import { StackActions } from '../../../../configs/views.config.mjs';
import Categorie from '../../../../assets/components/Categorie';

export default function Home({ navigation }) {

    const [categoria, setCategoria] = useState('Tudo')

    const handleCategoriaPress = (categoria) => {
        setCategoria(categoria)
    }

    if (!getAuth(app).currentUser) {

    }

    return (
        <View style={styles.bg}>
            <NavBar />
            <View style={styles.container}>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} bounces={false} alwaysBounceHorizontal={false} bouncesZoom={false} horizontal >
                        <Categorie text='Tudo' Selecionada={categoria === 'Tudo'} onPress={()=>{handleCategoriaPress('Tudo')}}/>
                        <Categorie text='Filosóficas' Selecionada={categoria === 'Filosóficas'} onPress={()=>{handleCategoriaPress('Filosóficas')}}/>
                        <Categorie text='Poemas' Selecionada={categoria === 'Poemas'} onPress={()=>{handleCategoriaPress('Poemas')}}/>
                        <Categorie text='Acolhedoras' Selecionada={categoria === 'Acolhedoras'} onPress={()=>{handleCategoriaPress('Acolhedoras')}}/>
                        <Categorie text='Motivacionais' Selecionada={categoria === 'Motivacionais'} onPress={()=>{handleCategoriaPress('Motivacionais')}}/>
                        <Categorie text='Amor' Selecionada={categoria === 'Amor'} onPress={()=>{handleCategoriaPress('Amor')}}/>
                        <Categorie text='Amizade' Selecionada={categoria === 'Amizade'} onPress={()=>{handleCategoriaPress('Amizade')}}/>
                        <Categorie text='Vida' Selecionada={categoria === 'Vida'} onPress={()=>{handleCategoriaPress('Vida')}}/>
                        <Categorie text='Trabalho' Selecionada={categoria === 'Trabalho'} onPress={()=>{handleCategoriaPress('Trabalho')}}/>
                        <Categorie text='Espirtualidade' Selecionada={categoria === 'Espirtualidade'} onPress={()=>{handleCategoriaPress('Espirtualidade')}}/>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        paddingTop: 10,
        paddingHorizontal:15
    },
    bg: {
        gap: 15,
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
    },

})