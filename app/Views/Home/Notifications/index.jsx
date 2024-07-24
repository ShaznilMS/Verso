import { getAuth } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app } from '../../../../configs/firebase.config.mjs';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faComment, faCommentAlt, faComments, faCommentSms, faDiamond, faHeart, faThunderstorm, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';

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
            WHO: 'Merry Rose',
            ACTION: 'Liked your',
            WHERE: 'Web Ui Design Post.'
        }
    },
    {
        Type: 'Joined',
        Data: {
            WHO: 'Sandra Raddon',
            ACTION: 'Joined to',
            WHERE: 'Final Presentation'
        }
    },
    {
        Type: 'Solicitation',
        Data: {
            WHO: 'Merry Rose',
            ACTION: 'want to follow your',
        }
    },
    {
        Type: 'Like',
        Data: {
            WHO: 'Merry Rose',
            ACTION: 'Liked your',
            WHERE: 'Web Ui Design Post.'
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
                <View style={{paddingLeft: 10}}>
                    <Text style={{ fontSize: 30, fontWeight: '400', color: "#999" }}>Your</Text>
                    <Text style={{ fontSize: 30, fontWeight: '600', color: "#333" }}>Notifications</Text>
                </View>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <FlatList
                    data={NOTIFICATIONS}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        switch (item.Type) {
                            case 'Comment':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <View style={{ width: '100%', height: 100, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }} source={User_Image} />
                                            <Text style={{ lineHeight: 26, fontWeight: '700', fontSize: 16, width: '100%', paddingRight: 110 }}>

                                                {item.Data.WHO}

                                                <Text style={{ color: '#888', fontWeight: '500', fontSize: 16 }}>
                                                    {' '}{item.Data.ACTION}{' '}
                                                </Text>

                                                {item.Data.WHERE}

                                            </Text>
                                            <View style={{ margin: 20, right: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 15, width: 24, height: 24, backgroundColor: "orange", padding: 10 }}>
                                                <FontAwesomeIcon icon={faCommentAlt} size={10} color='#fff' />
                                            </View>
                                        </View>
                                    </Swipeable>
                                )
                            case 'Like':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <View style={{ width: '100%', height: 100, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }} source={User_Image} />
                                            <Text style={{ lineHeight: 26, fontWeight: '700', fontSize: 16, width: '100%', paddingRight: 110 }}>

                                                {item.Data.WHO}

                                                <Text style={{ color: '#888', fontWeight: '500', fontSize: 16 }}>
                                                    {' '}{item.Data.ACTION}{' '}
                                                </Text>

                                                {item.Data.WHERE}

                                            </Text>
                                            <View style={{ margin: 20, right: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 15, width: 24, height: 24, backgroundColor: "#f66", padding: 10 }}>
                                                <FontAwesomeIcon icon={faHeart} size={10} color='#fff' />
                                            </View>
                                        </View>
                                    </Swipeable>
                                )
                            case 'Joined':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <View style={{ width: '100%', height: 100, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }} source={User_Image} />
                                            <Text style={{ lineHeight: 26, fontWeight: '700', fontSize: 16, width: '100%', paddingRight: 110 }}>

                                                {item.Data.WHO}

                                                <Text style={{ color: '#888', fontWeight: '500', fontSize: 16 }}>
                                                    {' '}{item.Data.ACTION}{' '}
                                                </Text>

                                                {item.Data.WHERE}

                                            </Text>
                                            <View style={{ margin: 20, right: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 15, width: 24, height: 24, backgroundColor: "#fd0", padding: 10 }}>
                                                <FontAwesomeIcon icon={faDiamond} size={10} color='#fff' />
                                            </View>
                                        </View>
                                    </Swipeable>
                                )
                            case 'Solicitation':
                                return (
                                    <Swipeable renderRightActions={leftSwipe} overshootLeft={false}>
                                        <View>
                                            <View style={{ width: '100%', height: 100, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                                                <Image style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }} source={User_Image} />
                                                <Text style={{ lineHeight: 26, fontWeight: '700', fontSize: 16, width: '100%', paddingRight: 110 }}>

                                                    {item.Data.WHO}

                                                    <Text style={{ color: '#888', fontWeight: '500', fontSize: 16 }}>
                                                        {' '}{item.Data.ACTION}{' '}
                                                    </Text>

                                                    {item.Data.WHERE}

                                                </Text>
                                                <View style={{ margin: 20, right: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 15, width: 24, height: 24, backgroundColor: "#333", padding: 10 }}>
                                                    <FontAwesomeIcon icon={faBlackTie} size={10} color='#fff' />
                                                </View>
                                            </View>

                                            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', gap: 10}}>
                                                <TouchableOpacity activeOpacity={.8}>
                                                    <View style={{  paddingHorizontal: 40, borderRadius: 40, paddingVertical: 15, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center'}}>
                                                        <Text style={{color: "#fff", fontWeight: '700', letterSpacing: 1}}>Aceitar</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity activeOpacity={.8}>
                                                    <View style={{  paddingHorizontal: 30, borderRadius: 40, paddingVertical: 10, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center'}}>
                                                        <Text style={{color: "#333", fontWeight: '700', letterSpacing: 1}}>Rejeitar</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
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
    }
})
