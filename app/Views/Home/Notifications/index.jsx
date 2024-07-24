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
import NavBar from '../../../../assets/components/NavBar';
import NewPubCard from './Componentes/NotificationCards/NewPubCard';
import ShareCard from './Componentes/NotificationCards/ShareCard';

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
            MESSAGE: 'maior inimigo do conhecimento nao e a ignorancia, e a ilusao do conhecimento'
        }
    },
    {
        Type: 'New',
        Data: {
            WHO: 'Merry Rose',
            MESSAGE: 'O maior inimigo do conhecimento nao e a ignorancia, e a ilusao do conhecimento',
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
    {
        Type: 'New',
        Data: {
            WHO: 'Merry Rose',
            MESSAGE: 'O maior inimigo do conhecimento nao e a ignorancia, e a ilusao do conhecimento',
        }
    }
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
            <NavBar />


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
                                        <ShareCard user={item.Data.WHO} msg={item.Data.MESSAGE} />
                                    </Swipeable>
                                )
                            case 'Follow':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <FollowCard user={item.Data.WHO} action={item.Data.ACTION} msg={item.Data.MESSAGE} />
                                    </Swipeable>
                                )

                            case 'New':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <NewPubCard user={item.Data.WHO} msg={item.Data.MESSAGE} />
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
