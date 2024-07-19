import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Importing views
import Home from './Views/Home';
import Chats from './Views/Home/Chats';
import SignIn from './Views/Auth/SignIn';
import SignUp from './Views/Auth/SignUp';
import Profile from './Views/Home/Profile';
import Commentary from './Views/Commentary';
import Favorite from './Views/Home/Favorite';
import UserProfile from './Views/UserProfile';
import Notifications from './Views/Home/Notifications';

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName='SignIn'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='SignUp' component={SignIn}/>
        <Stack.Screen name='Home' component={SignIn}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
