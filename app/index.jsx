import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import '../gesture-handler';
// import InputComent from "./Views/Home/Publication/Details/Components/InputComent";
// import Coment from "./Views/Home/Publication/Details/Components/Coment";
// import Details from "./Views/Home/Publication/Details";

import '../gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Components
import Loading from '../assets/components/Loading';
import { Views } from '../configs/views.config.mjs';

// Firebase configs
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faBookmark, faUser } from '@fortawesome/free-regular-svg-icons';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';

export default function App() {

	const [isLoading, setIsLoading] = useState(false)
	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		setIsLoading(false)
	})

	function TabNavigator() {
		return (
			<Tab.Navigator
				initialRouteName='Home'
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						height: 70,
						paddingTop: 15
					},
				}}
			>
				<Tab.Screen name='Home' component={Views.Home} options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View style={focused ? focusedTab.focusedTab : { display: 'flex' }}>
								<FontAwesomeIcon icon={faHomeAlt} size={23} color={'#49454F'} />
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
		)
	}

	function StackNavigator() {
		return (
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			>
				<Stack.Screen name='SignIn' component={Views.SignIn} />
				<Stack.Screen name='SignUp' component={Views.SignUp} />
				<Stack.Screen name='HomeC' component={Views.HomeConfigs} />
				<Stack.Screen name='Chats' component={Views.Chats} />
				<Stack.Screen name='AddPublication' component={Views.AddPublication}/>
				<Stack.Screen name='Commentary' component={Views.Commentary} />
				<Stack.Screen name='UserProfile' component={Views.UserProfile} />
				<Stack.Screen name='Details' component={Views.Details} />
			</Stack.Navigator>
		)
	}

	function NavigatorManager() {
		return (
			<Stack.Navigator
				initialRouteName='StackNavigator'
				screenOptions={{
					headerShown: false,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			>
				<Stack.Screen name='StackNavigator' component={StackNavigator} />
				<Stack.Screen name='TabNavigator' component={TabNavigator} />

			</Stack.Navigator>
		)
	}

	return (
		<>
			<Loading isLoading={isLoading} />
			<NavigationContainer independent={true}>
				<NavigatorManager />
			</NavigationContainer>
		</>
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

