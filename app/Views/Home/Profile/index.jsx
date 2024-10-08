import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Link } from 'expo-router';
import { StackActions } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket, faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import sha256 from 'sha256';

const User_Image = require('./../../../../assets/USER/USER_PROFILE.jpg')

export default function Profile({ navigation }) {

    const [UserInformation, setUserInformation] = useState()
    const [isStarted, setIsStarted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!isStarted) {
            console.log('Is started');
            setIsStarted(true)
        }
    })

    // if (!getAuth(app).currentUser) {
    //     navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'StackNavigator' }],
    //     })
    // }

    function InformationField(props) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginVertical: 7,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center'
                    }}
                >
                    <FontAwesomeIcon size={16} color='#333' icon={props.icon} />
                    <Text
                        style={{
                            fontSize: 16
                        }}
                    >{props.name}</Text>
                </View>

                <View>
                    <Text
                        style={{
                            fontWeight: '700'
                        }}
                    >{props.text}</Text>
                </View>

            </View>
        )
    }

    function Sair() {
        navigation.dispatch(
            StackActions.replace('StackNavigator', { screen: 'SignIn' })
        )
    }

    function RoundCategories(props) {
        return (
            <View style={{
                paddingHorizontal: 15,
                borderRadius: 50,
                paddingVertical: 3,
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 4,
                backgroundColor: "#ffffff"
            }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: "#000"
                    }}
                >{props.name}</Text>

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#aaa'
                    }}
                >{props.num}</Text>

            </View>
        )
    }

    if (isLoading) {
        return (
            <Modal>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator color={"#333"} size={40}></ActivityIndicator>
                </View>
            </Modal>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#111111' style='light' />
                <View style={{
                    backgroundColor: "#111111",
                    height: 130,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    padding: 10,
                    alignItems: 'center',
                    gap: 20
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <View style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        </View>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>
                            {/* {UserInformation.Name} */}
                            Shaznil Mussagy Sulemane
                        </Text>

                        <TouchableOpacity activeOpacity={.8} onPress={Sair}>
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <FontAwesomeIcon size={20} color='#ffffff' icon={faArrowRightFromBracket} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableWithoutFeedback
                        // onPress={GetUser}
                    >
                        <Image source={User_Image} style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            borderWidth: 3,
                            borderColor: "#ffffff"
                        }} />
                    </TouchableWithoutFeedback>
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 50,
                        gap: 5
                    }}
                >
                    <Text style={{ fontSize: 18, fontStyle: 'italic', fontWeight: '700', letterSpacing: 1 }}>@shaznilmussagysulemane</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 8,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#528599",
                                fontWeight: '700'
                            }}
                        >
                            {/* {UserInformation.Country.toUpperCase()} */}
                            Mozambique
                        </Text>
                        <View
                            style={{
                                width: 2,
                                height: '100%',
                                backgroundColor: "#000000"
                            }}>

                        </View>
                        <Text>
                            Joined 2023
                        </Text>
                    </View>

                    <TouchableWithoutFeedback
                    // onPress={() => { console.log(UserInformation.Name) }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                padding: 6,
                                paddingHorizontal: 14,
                                borderWidth: 1,
                                borderColor: "#aaa",
                                borderRadius: 10,
                                marginTop: 10
                            }}
                        >
                            <FontAwesomeIcon icon={faUser} size={18} />
                            <Text
                                style={{
                                    fontWeight: '700'
                                }}
                            >
                                Followers
                            </Text>
                            <Text>
                                •
                            </Text>
                            <Text
                                style={{
                                    fontWeight: '700'
                                }}
                            >
                                {/* {UserInformation.Followers} */}
                                1876
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text
                        style={{
                            fontSize: 14,
                            color: "#aaa",
                            marginHorizontal: 25,
                            lineHeight: 24,
                            fontWeight: '400',
                            textAlign: 'center',
                            marginTop: 6
                        }}
                    >
                        {/* {UserInformation.Biography} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quidem obcaecati rem placeat facilis iure quaerat delectus dolores tempora laboriosam molestias recusandae at veritatis qui error, corrupti pariatur accusantium? Veniam.
                    </Text>

                    <View
                        style={{
                            width: '100%',
                            gap: 4
                        }}
                    >

                        <View
                            style={{
                                gap: 4,
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                borderTopWidth: 1,
                                borderBottomWidth: 1
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: '700',
                                    fontSize: 18
                                }}
                            >
                                Information
                            </Text>
                            <InformationField icon={faUser} name="Name" text={"Shaznil Mussagy Sulemane"} />
                            <InformationField icon={faAt} name="Email" text={"shaznilmussagysulemane@gmail.com"} />
                            <InformationField icon={faPhone} name="Phone" text={"+258 85 193 5325"} />
                            <InformationField icon={faCalendar} name="Joined" text={"2023"} />
                        </View>

                        <ScrollView
                            style={{
                                width: '100%',
                                marginTop: 10
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {/* <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                gap: 10
                                }}
                                >
                                <RoundCategories name="Poemas" num={13} />
                                <RoundCategories name="Vidas" num={4} />
                                <RoundCategories name="Amizade" num={6} />
                                <RoundCategories name="Acolhedoras" num={9} />
                                <RoundCategories name="Amor" num={10} />
                                </View> */}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: "#ffffff"
    }
})