import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Views } from '../../../configs/views.config.mjs';
import { faBell, faBookmark, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Tab = createBottomTabNavigator();

const ScreenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        rigth: 0,
        left: 0,
        elevation: 0,
        height: 80,
        padding: 30
    }
}

const focusedTab = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#bebec0',
    borderRadius: 20
}

export default function HomeConfigs() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={ScreenOptions}
                initialRouteName='Home'
            >
                <Tab.Screen name='Home' component={Views.Home} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faHome} size={23} color={'#49454F'} />
                            </View>
                        )
                    }
                }} />
                <Tab.Screen name='Profile' component={Views.Profile} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faUser} size={23} color={'#49454F'} />
                            </View>
                        )
                    }
                }} />
                <Tab.Screen name='Favorite' component={Views.Favorite} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faBookmark} size={23} color={'#49454F'} />
                            </View>
                        )
                    }
                }} />
                <Tab.Screen name='Notifications' component={Views.Notifications} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? focusedTab : { display: 'flex' }}>
                                <FontAwesomeIcon icon={faBell} size={23} color={'#49454F'} />
                            </View>
                        )
                    }
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}