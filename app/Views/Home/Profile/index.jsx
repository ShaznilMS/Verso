import { getAuth, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import { Link } from 'expo-router';
import { StackActions } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket, faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';

const User_Image = require('./../../../../assets/USER/USER_PROFILE.jpg')

export default function Profile({ navigation }) {


    if (!getAuth(app).currentUser) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StackNavigator' }],
        })
    }

    function Sair() {

        console.log('Sair!');
        const user = getAuth(app).currentUser
        if (user) {
            console.log('Usuário', user.email.toUpperCase(), "saiu da conta!");
            signOut(auth)
                .then(() => {
                    console.log('Sign out has been executed successfully!');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'StackNavigator' }],
                    })
                })
        }
    }

    function InformationField(props) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginVertical: 7
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10
                    }}
                >
                    <FontAwesomeIcon size={18} color='#333' icon={props.icon} />
                    <Text
                        style={{
                            fontSize: 18
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

    function RoundCategories(props) {
        return (
            <View style={{
                paddingHorizontal: 15,
                borderRadius: 50,
                borderWidth: 2,
                paddingVertical: 4,
                borderColor: '#aaa',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                flexDirection: 'row'
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: "#000"
                    }}
                >{props.name}</Text>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: "#aaa",
                    }}
                >{props.num}</Text>

            </View>
        )
    }

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
                        fontSize: 30
                    }}>Raimundo Chitava</Text>

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

                <Image source={User_Image} style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: "#ffffff"
                }} />
            </View>

            <View
                style={{
                    alignItems: 'center',
                    paddingTop: 50,
                    gap: 5
                }}
            >
                <Text style={{ fontSize: 18, fontStyle: 'italic', fontWeight: '700', letterSpacing: 1 }}>@mundinho340</Text>
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
                        MOZAMBIQUE
                    </Text>
                    <View
                        style={{
                            width: 2,
                            height: '100%',
                            backgroundColor: "#000000"
                        }}>

                    </View>
                    <Text>
                        Joined March 2023
                    </Text>
                </View>

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
                        1987

                    </Text>
                </View>

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
                    Raimundo Chitava is a dedicated backend developer known for his exceptional skills in building robust, scalable, and efficient backend systems.
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
                            paddingHorizontal: 20
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
                        <InformationField icon={faUser} name="Name" text="Raimundo Chitava" />
                        <InformationField icon={faAt} name="Email" text="mundinho340@gmail.com" />
                        <InformationField icon={faPhone} name="Phone" text="+258 851935325" />
                        <InformationField icon={faCalendar} name="Joined" text="March" />
                    </View>

                    <ScrollView
                        style={{
                            width: '100%',
                            marginTop: 20,
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                gap: 10
                            }}
                        >
                            <RoundCategories name="Poemas" num={13} />
                            <RoundCategories name="Vidas" num={4} />
                            <RoundCategories name="Amizade" num={6} />
                            <RoundCategories name="Acolhedoras" num={9} />
                            <RoundCategories name="Amor" num={10} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: "#ffffff"
    }
})