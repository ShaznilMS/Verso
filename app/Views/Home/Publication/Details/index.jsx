import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, TextInputComponent, View } from 'react-native'
import User from './Components/User'
import ActionBar from './Components/ActionBar'
import InputComent from './Components/InputComent'
import Coment from './Components/Coment'


const Details = ({ route, navigation }) => {

    const { data } = route.params
    console.log(data)
    useEffect(() => {
        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    })

    const tabBarStyl = {
        position: 'absolute',
        bottom: 0,
        rigth: 0,
        left: 0,
        elevation: 0,
        height: 80,
        background: '#fff'
    }
    const comentData = [
        {
        comentLikes: 2,
        user:'Antonio Cossa',
        coment:'Faço minhas suas palavras',
        time:'20/07/24'
    },
    {
        comentLikes: 2,
        user:'Shaznil Sulemane',
        coment:'Gajo mau',
        time:'20/07/24'
    },
    {
        comentLikes: 2,
        user:'Raimundo Chitava',
        coment:'Valeu pessoal',
        time:'20/07/24'
    }
]
    return (
        <View>
            <User back={() => {
                navigation.getParent().setOptions({ tabBarStyle: tabBarStyl })
                navigation.goBack()
            }} user={data.USER_NAME} time={data.DATE_TIME} />
            <View style={styles.content}>
                <Text style={{ paddingHorizontal: 20, fontSize: 15, textAlign: 'center', fontWeight: 400 }}>{data.CONTENT}</Text>
                <Text style={{ textAlign: 'center', fontWeight: 700, top: 30 }}>{data.QUOTE}</Text>
            </View>
            <ActionBar likes='20' shares='25' coments='2' />
            <View style={styles.coments}>
                <InputComent style={styles.InputComent} />

                <FlatList data={comentData}
                style={{flex:1,paddingVertical:20}}
                    renderItem={({ item }) => {
                        return (
                            <Coment ComentLikes={item.comentLikes} user={item.user} time={item.time} coment={item.coment} />
                        )
                    }} />
                
            </View>
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    content: {
        width: '100%',
        minHeight: 250,
        borderTopWidth: 1,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5a4',
        backgroundColor: '#e9e7e7',
        justifyContent: 'center'
    },
    coments: {
        paddingTop: 20,
        width: '100%',
        minHeight: 300,
        gap: 50
    },
    InputComent: {
        top: 5
    }
})
