import React, { useState } from 'react';
import { FlatList, TextInput, View, Text, StyleSheet, KeyboardAvoidingView, Button, Platform } from 'react-native';
import { CHATS } from '../../../assets/Data/Chats.mjs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { faMoon, faPaperPlane, faSun } from '@fortawesome/free-regular-svg-icons';


function NavBar() {

	const navBarStyle = StyleSheet.create({
		container: {
			height: 100,
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 10,
			gap: 20,
			backgroundColor: "#fff"
		},
		profile_image: {
			width: 60,
			height: 60,
			borderRadius: 30,
			backgroundColor: '#000'
		},
		profile: {
			gap: 4
		},
		profile_name: {
			fontSize: 16,
			fontWeight: '700'
		},
		profile_status: {
			fontWeight: '900',
			color: "#999"
		},
		actions: {
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center'
		},
		themeAction: {
			width: 50,
			height: 60,
			justifyContent: 'center',
			alignItems: 'center'
		}
	})

	return (
		<View style={[navBarStyle.container, {backgroundColor: 'rgb(255,255,255)'}]}>
			<View style={navBarStyle.actions}>
				<FontAwesomeIcon icon={faArrowLeft} style={{ margin: 0 }} />
				<View style={navBarStyle.profile_image}>

				</View>
			</View>
			<View style={navBarStyle.profile}>
				<Text style={navBarStyle.profile_name}>Antonio Cossa</Text>
				<Text style={navBarStyle.profile_status}>Online</Text>
			</View>
			<View style={{flex: 1}}></View>
			<TouchableOpacity activeOpacity={.8}>
				<View style={navBarStyle.themeAction}>
					<FontAwesomeIcon icon={faSun} size={25} />
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default function Chats() {

	const [theme, setTheme] = useState('light')

	const [messages, setMessages] = useState([
		{ id: '1', sender: 'Alice', receiver: 'Bob', message: 'Oi, como você está?', timestamp: '2024-07-24T09:00:00Z' },
		{ id: '2', sender: 'Bob', receiver: 'Alice', message: 'Oi Alice, estou bem. E você?', timestamp: '2024-07-24T09:01:00Z' },
		// Adicione mais mensagens aqui
	]);

	const Chats = CHATS

	const [newMessage, setNewMessage] = useState('');

	// Função para enviar uma nova mensagem
	const sendMessage = () => {
		if (newMessage.trim()) {
			const newMsg = {
				id: (messages.length + 1).toString(),
				sender: 'Alice', // Alterar para o remetente correto
				receiver: 'Bob', // Alterar para o destinatário correto
				message: newMessage,
				timestamp: new Date().toISOString(),
			};
			setMessages([...messages, newMsg]);
			setNewMessage('');
		}
	};

	// Renderiza cada item da lista de mensagens
	const renderMessage = ({ item }) => {
		if (item.status == 'sent') {
			return (
				<View style={sent.messageContainer}>
					<View style={sent.message}>
						<Text style={sent.message_body}>{item.message}</Text>
						<Text style={sent.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
					</View>
				</View>
			)
		}
		if (item.status == 'delivered') {
			return (
				<View style={delivered.messageContainer}>
					<View style={delivered.message}>
						<Text style={delivered.message_body}>{item.message}</Text>
						<Text style={delivered.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
					</View>
				</View>
			)
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<NavBar />
			<FlatList
				data={Chats.reverse()}
				inverted
				contentContainerStyle={{ backgroundColor: "#ddd", padding: 10 }}
				renderItem={renderMessage}
				keyExtractor={item => item.id}
				style={styles.messageList}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					value={newMessage}
					onChangeText={setNewMessage}
					placeholder="Digite uma mensagem..."
					style={styles.input}
				/>
				<TouchableOpacity activeOpacity={.8}>
					<View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
						<FontAwesomeIcon icon={faPaperPlane} size={25} />
					</View>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	messageList: {
		flex: 1
	},
	messageContainer: {
		marginBottom: 10,
	},
	sender: {
		fontWeight: 'bold',
	},
	message: {
		fontSize: 16,
	},
	timestamp: {
		fontSize: 12,
		color: 'gray',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		gap: 15,
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		height: 100
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 40,
		padding: 20,
		marginRight: 10,
	},
});


const sent = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	messageList: {
		flex: 1,
		padding: 10,
	},
	messageContainer: {
		marginBottom: 10,
	},
	message: {
		alignSelf: 'flex-end',
		backgroundColor: "#333",
		minWidth: 100,
		width: 'auto',
		padding: 20,
		maxWidth: '70%',
		borderRadius: 20,
		gap: 10,
	},
	message_body: {
		color: '#fff',
		fontSize: 16,
	},
	timestamp: {
		fontSize: 12,
		alignSelf: 'flex-end',
		color: '#aaa',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: '#ddd',
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
	},
});


const delivered = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	messageList: {
		flex: 1,
		padding: 10,
	},
	messageContainer: {
		marginBottom: 10,
	},
	message: {
		alignSelf: 'flex-start',
		backgroundColor: "#fff",
		minWidth: 100,
		width: 'auto',
		padding: 20,
		maxWidth: '70%',
		borderRadius: 20,
		gap: 10,
	},
	message_body: {
		color: '#000',
		fontSize: 16,
	},
	timestamp: {
		fontSize: 12,
		alignSelf: 'flex-start',
		color: 'gray',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: '#ddd',
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
	},
});
