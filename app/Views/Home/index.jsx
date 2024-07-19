import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Views } from '../../../configs/views.config.mjs';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from '@firebase/auth';
import { app } from '../../../configs/firebase.config.mjs';

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
                    headerShown: false
                }}
            >
                <Tab.Screen name='Home' component={Views.Home} options={{}}/>
                <Tab.Screen name='Profile' component={Views.Profile}  options={{}}/>
                <Tab.Screen name='Favorite' component={Views.Favorite}  options={{}}/>
                <Tab.Screen name='Notifications' component={Views.Notifications}  options={{}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}