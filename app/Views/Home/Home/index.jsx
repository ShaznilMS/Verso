import { getAuth, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app, auth } from '../../../../configs/firebase.config.mjs';
import NavBar from '../../../../assets/components/NavBar'
import { StackActions } from '../../../../configs/views.config.mjs';
import { Link } from 'expo-router';

export default function Home({ navigation }) {

    const [isRefreshing, setIsRefrshing] = useState(false)

    if (!getAuth(app).currentUser) {

    }

    function handleRefresh() {
        console.log('Refresh!');
    }

    return (
        <FlatList
            data={[{}]}
            style={{ flex: 1, backgroundColor: "#fff" }}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            renderItem={(item) => {
                return (
                    <View style={styles.bg}>
                        <NavBar />
                        <View style={styles.container}>
                            <View style={styles.scrollView_items}>
                                <ScrollView showsHorizontalScrollIndicator={false} bounces={false} alwaysBounceHorizontal={false} bouncesZoom={false} horizontal style={styles.scrollView}>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Tudo</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Filosóficas</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Poemas</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Acolhedoras</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Motivacionais</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Amor</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Amizade</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Vida</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Trabalho</Text>
                                    </View>
                                    <View style={styles.category_item}>
                                        <Text style={styles.category_item_name}>Espirtualidade</Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                )
            }
            }

        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        paddingTop: 10
    },
    bg: {
        gap: 15,
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
    },
    scrollView: {
        height: 30
    },
    scrollView_items: {
        height: 30,
        display: 'flex',
        flexDirection: 'row'
    },
    category_item: {
        paddingHorizontal: 5,
    },
    category_item_name: {
        fontSize: 18
    }
})