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
                screenOptions={ScreenOptions}
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tab.Screen name='Home' component={Views.Home} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={focused ? { display: 'flex' } : focusedTab}>
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