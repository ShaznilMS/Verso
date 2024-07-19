import { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Components
import Loading from '../assets/components/Loading';
import { Stack, Views } from '../configs/views.config.mjs';

// Firebase configs
import { app, auth, analytics } from '../configs/firebase.config.mjs'
import { getAuth } from 'firebase/auth'
import { StatusBar } from 'expo-status-bar';

export default function App() {

	const [isLoading, setIsLoading] = useState(false)
	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		if (getAuth(app).currentUser) {
			setIsLogged(true)
		}
		setIsLoading(false)
	})

	return (
		<>
			<Loading isLoading={isLoading} />
			<NavigationContainer independent={true}>
				<Stack.Navigator
					initialRouteName={isLogged ? 'SignIn' : 'SignIn'}
					screenOptions={{
						headerShown: false
					}}
				>
					<Stack.Screen name='SignIn' component={Views.SignIn} />
					<Stack.Screen name='SignUp' component={Views.SignUp} />
					<Stack.Screen name='HomeC' component={Views.HomeConfigs} />
					{isLogged ?
						<>
							<Stack.Screen name='Chats' component={Views.Chats} />
							<Stack.Screen name='Commentary' component={Views.Commentary} />
							<Stack.Screen name='UserProfile' component={Views.UserProfile} />
						</>
						:
						[]}

				</Stack.Navigator>
			</NavigationContainer>
		</>
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
