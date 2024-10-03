import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Animated, FlatList, StyleSheet, Text, TextInputComponent, TouchableOpacity, View } from 'react-native'
import User from './Components/User'
import ActionBar from './Components/ActionBar'
import InputComent from './Components/InputComent'
import Coment from './Components/Coment'
import sha256 from 'sha256'


const Details = ({ route, navigation }) => {

    const { data } = route.params
    console.log(data.VERIFIED)
    
    const tabBarStyle = {
        position: 'absolute',
        bottom: 0,
        rigth: 0,
        left: 0,
        elevation: 0,
        height: 80,
        background: '#fff'
    }

    const [limitQuery, setLimitQuery] = useState(7)
    const hideValue = useState(new Animated.Value(0))[0]
    const [hideContent, setHideContent] = useState(true)
    const [display, setDisplay] = useState('none')

    const show = Animated.timing(hideValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false
    })

    const hide = Animated.timing(hideValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
    })

    function handleHide() {
        console.log('Handle Hide Function');
        if (hideContent) {
            setDisplay('flex')
            show.start()
            setHideContent(false)
        } else {
            hide.start(() => {
                setDisplay('none')
            })
            setHideContent(true)
        }
    }

    const [Comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [isStarted, setStarted] = useState(false)

    useEffect(() => {
        navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
        if (isRefreshing) {
            getComments(limitQuery)
        }
        setIsRefreshing(false)

        const interval = setInterval(() => {
            getComments(limitQuery)
        }, 1000); // Update every 5 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    });

    function doNothing() {
        // console.log('Do Nothing!');
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <User verified={data.VERIFIED ? { display: 'flex' } : { display: 'none' }} back={() => {
                navigation.getParent().setOptions({ tabBarStyle: tabBarStyle })
                navigation.goBack()
            }} user={data.USER_NAME} time={data.DATE_TIME} onCallHide={() => { handleHide() }} />


            {/* {hideContent ?
                []
                :  */}
            <Animated.View style={[styles.content, { opacity: hideValue, display: display }]}>
                <Text style={{ paddingHorizontal: 20, fontSize: 18, textAlign: 'center', fontWeight: 600 }}>{data.POST}</Text>
                <Text style={{ textAlign: 'center', fontWeight: 700, top: 30 }}>{data.QUOTE}</Text>
            </Animated.View>
            {/* } */}
            {/* <ActionBar likes='20' shares='25' coments='2' /> */}
            <View style={styles.comments}>

                <FlatList
                    data={Object.values(Comments).reverse()}
                    style={{ flex: 1 }}
                    inverted
                    // onEndReached={() => getComments(limitQuery)}
                    // onEndReachedThreshold={0.2}
                    ItemSeparatorComponent={<View style={{ width: '100%', height: 20, backgroundColor: "#fff0" }}></View>}
                    // ListFooterComponent={<Loading isLoading={isRefreshing} />}
                    renderItem={({ item }) => {
                        return (
                            <Coment user={item.Name} time={item.Time} coment={item.Comment} />
                        )
                    }} />
            </View>
            <InputComent onSendComment={() => { }} onText={setText} style={styles.InputComent} />
        </View>
    )
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
}

export default Details

const styles = StyleSheet.create({
    content: {
        flex: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5a4',
        backgroundColor: '#e9e7e7',
        justifyContent: 'center'
    },
    comments: {
        flex: 1,
        paddingTop: 20,
        gap: 20
    },
    InputComent: {
        marginVertical: 20,
        backgroundColor: "#ffffff"
    }
})
