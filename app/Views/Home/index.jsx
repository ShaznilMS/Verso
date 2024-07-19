import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Views } from '../../../configs/views.config.mjs';
import { faBell, faBookmark, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from '@firebase/auth';
import { app } from '../../../configs/firebase.config.mjs';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

export default function HomeConfigs({ navigation }) {

    if (!getAuth(app).currentUser) {
        // navigation.navigate('SignIn')
    }

    return (
        <NavigationContainer independent={true}>
            
        </NavigationContainer>
    );
}
