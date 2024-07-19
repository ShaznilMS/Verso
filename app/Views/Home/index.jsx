import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Views } from '../../../configs/views.config.mjs';
import { faBell, faBookmark, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from '@firebase/auth';
import { app } from '../../../configs/firebase.config.mjs';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Tab = createBottomTabNavigator();

export default function HomeConfigs({ navigation }) {

    if (!getAuth(app).currentUser) {
        navigation.navigate('SignIn')
    }

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name='Home' component={Views.Home} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab.focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faHome} size={23} color={'#49454F'} />
                            </View>
                        )
                    },
                    title: ''
                }} />

                <Tab.Screen name='Favorite' component={Views.Favorite} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab.focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faBookmark} size={23} color={'#49454F'} />
                            </View>
                        )
                    },
                    title: ''
                }} />

                <Tab.Screen name='Notifications' component={Views.Notifications} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab.focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faBell} size={23} color={'#49454F'} />
                            </View>
                        )
                    },
                    title: ''
                }} />
                

                <Tab.Screen name='Profile' component={Views.Profile} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab.focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faUser} size={20} color={'#49454F'} />
                            </View>
                        )
                    },
                    title: ''
                }} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}


const focusedTab = StyleSheet.create({
    focusedTab: {
        backgroundColor: '#E8DEF8',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20   
    }
})