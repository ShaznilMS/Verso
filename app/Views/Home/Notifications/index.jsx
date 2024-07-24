import { getAuth } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faComment, faCommentAlt, faComments, faCommentSms, faDiamond, faHeart, faThunderstorm, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';

import LikeCard from './Componentes/NotificationCards/LikeCard'
import FollowCard from './Componentes/NotificationCards/FollowCard';

const User_Image = require('./../../../../assets/USER/USER_PROFILE.jpg')

const NOTIFICATIONS = [
    {
        Type: 'Comment',
        Data: {
            WHO: 'Mohammadreza',
            ACTION: 'commented on your',
            WHERE: 'UIUX Mobile'
        }
    },
    {
        Type: 'Like',
        Data: {
            WHO: 'Rose Merry',
            ACTION: 'Curtiu sua publicacao',
            MESSAGE: 'O maior inimigo do conhecimento nao e a ignorancia, e a ilusao do conhecimento'
        }
    },
    {
        Type: 'Shared',
        Data: {
            WHO: 'Sandra Raddon',
            ACTION: 'Joined to',
            WHERE: 'Final Presentation'
        }
    },
    {
        Type: 'New',
        Data: {
            WHO: 'Merry Rose',
            ACTION: 'want to follow your',
        }
    },
    {
        Type: 'Follow',
        Data: {
            WHO: 'Merry Rose Merry Rose',
            ACTION: 'Seguiu Voce',
            MESSAGE: 'Web Ui Design Post.'
        }
    },
]

export default function Notifications({ navigation }) {

    const [isRefreshing, setIsRefrshing] = useState(false)

    function handleRefresh() {
        console.log('Refresh!');
    }

    const leftSwipe = () => {
        return (
            <View style={{ backgroundColor: "#fff", width: 60, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faTrash} size={20} color='#f55' />
            </View>
        )
    }

    const leftFunction = (num) => {
        console.log('Left:', num);
    }

    return (
        <View style={styles.bg}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <View style={{ width: 50, height: 50, backgroundColor: "#ddd", justifyContent: 'center', alignItems: 'center', borderRadius: 25, margin: 10 }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} color='#333' />
                </View> */}
                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 30, fontWeight: '400', color: "#999" }}>Your</Text>
                    <Text style={{ fontSize: 30, fontWeight: '600', color: "#333" }}>Notifications</Text>
                </View>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <FlatList
                    contentContainerStyle={styles.flatlist}
                    data={NOTIFICATIONS}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        switch (item.Type) {
                            case 'Comment':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>

                                    </Swipeable>
                                )
                            case 'Like':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <LikeCard user={item.Data.WHO} action={item.Data.ACTION} msg={item.Data.MESSAGE} />
                                    </Swipeable>
                                )
                            case 'Shared':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>

                                    </Swipeable>
                                )
                            case 'Follow':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <FollowCard user={item.Data.WHO} action={item.Data.ACTION} msg={item.Data.MESSAGE} />
                                    </Swipeable>
                                )

                            default:
                                break;
                        }
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        gap: 15,
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff"
    },
    container: {
        backgroundColor: "#ffffff",
        paddingTop: 10,
    },
    flatlist: {
        gap: 5,
        paddingHorizontal: 10
    }
})
