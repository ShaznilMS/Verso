// import { useEffect, useState } from 'react'
// import { Animated, FlatList, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Vibration, View } from 'react-native'
// import { GeneratePosts, GetAuthentication, GetPosts, SignIn, SignOut, SignUp, VerifyAuthentication, AddPosts } from './Settings/index.mjs'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faRecycle, faTrash } from '@fortawesome/free-solid-svg-icons'

// function Separator(extend) {
//     return (
//         <View style={{ flex: 1 }}>

//         </View>
//     )
// }

// function Button({ label, method }) {
//     return (
//         <TouchableOpacity activeOpacity={.9} onPress={method}>
//             <View style={{ width: '100%', height: 60, borderRadius: 10, backgroundColor: "#333", justifyContent: 'center', alignItems: 'center' }}>
//                 <Text style={{ color: "#fff", fontSize: 18, fontWeight: '700' }}>{label}</Text>
//             </View>
//         </TouchableOpacity>
//     )
// }

// function TwoFaceButton({ label1, label2, method1, method2 }) {
//     return (
//         <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
//             <TouchableOpacity style={{ flex: 1 }} activeOpacity={.9} onPress={method1}>
//                 <View style={{ flex: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: "#333", justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ color: "#fff", fontSize: 18, fontWeight: '700' }}>{label1}</Text>
//                 </View>
//             </TouchableOpacity>

//             <TouchableOpacity style={{ flex: 1 }} activeOpacity={.9} onPress={method2}>
//                 <View style={{ flex: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: "orange", justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ color: "#fff", fontSize: 18, fontWeight: '700' }}>{label2}</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     )
// }

// function CreatePost({ isVisible = false, onPressButton1, onPressButton2 }) {
//     const [_conteudo, setConteudo] = useState('')
//     const [_autor, setAutor] = useState('')

//     return (
//         <Modal animationType='slide' visible={isVisible} transparent={true} >
//             <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
//                 <View style={{ flex: 1, paddingTop: 150, backgroundColor: "#3337" }}>
//                     <View style={{ flex: 1, backgroundColor: "#ffffff", borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 20, gap: 15 }}>
//                         <Text style={{ fontSize: 25, fontWeight: '700' }}>Criar postagems</Text>
//                         <Text style={{ fontSize: 18, fontWeight: '600' }}>Conteudo</Text>
//                         <TextInput onChangeText={setConteudo} style={{ width: '100%', backgroundColor: "#fff", paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1 }} multiline placeholder='Insira o text...' />

//                         <Text style={{ fontSize: 18, fontWeight: '600' }}>Autor</Text>
//                         <TextInput onChangeText={setAutor} style={{ width: '100%', backgroundColor: "#fff", paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1 }} multiline placeholder='Insira o autor...' />

//                         <Separator />

//                         <TwoFaceButton
//                             label1={'Voltar'}
//                             method1={onPressButton1}
//                             label2={'Adicionar'}
//                             method2={() => { AddPosts({ CONTEUDO: _conteudo, AUTOR: _autor, CATEGORIA: 'Filosofica' }) }}
//                         />
//                     </View>
//                 </View>
//             </TouchableWithoutFeedback>
//         </Modal>
//     )
// }

// function Item({ Name, Time, Category, Content, Quote, onDelete }) {

//     const transX = useState(new Animated.Value(80))[0]

//     function SHOW() {
//         const show = Animated.timing(transX, {
//             toValue: 0,
//             duration: 200,
//             delay: 300,
//             useNativeDriver: false
//         }).start()
//     }

//     function HIDE() {
//         const hide = Animated.timing(transX, {
//             toValue: 80,
//             duration: 200,
//             delay: 300,
//             useNativeDriver: false
//         }).start()
//     }

//     return (
//         <TouchableWithoutFeedback onLongPress={() => {SHOW(); Vibration.vibrate(40)}} onPress={() => HIDE()} >
//             <View style={{ width: '100%', minHeight: 100, backgroundColor: '#fff', gap: 5, flexDirection: 'row', overflow: 'hidden' }}>
//                 <View style={{flex: 1, padding: 20}}>
//                     <Text style={{ fontSize: 22, fontWeight: '700' }}>{Name}</Text>
//                     <Text style={{ fontSize: 16, fontWeight: '500', color: "#0004", letterSpacing: 2 }}>{Time}</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '900', color: "#0008", letterSpacing: 2 }}>{Category}</Text>
//                     <Text style={{ fontSize: 18, fontWeight: '700' }}>{Content}</Text>
//                     <Text style={{ fontSize: 18, fontWeight: '700' }}>{Quote}</Text>
//                 </View>
//                 <Animated.View style={{ justifyContent: 'center', alignItems: 'center', width: 80, height: 'auto', backgroundColor: "#0000", transform: [{ translateX: transX}] }}>
//                     <TouchableOpacity activeOpacity={.8} onPress={onDelete}>
//                         <View style={{width: 60, height: 60, backgroundColor: "#333", borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
//                             <FontAwesomeIcon icon={faTrash} color="#fff" size={25} />
//                         </View>
//                     </TouchableOpacity>
//                 </Animated.View>
//             </View>
//         </TouchableWithoutFeedback>
//     )
// }

// function ShowPost({ isVisible = false, onPressButton1, onPressButton2 }) {
//     const [_conteudo, setConteudo] = useState('')
//     const [_autor, setAutor] = useState('')
//     const [limit, setLimit] = useState(10)

//     const [data, setData] = useState(GetPosts(limit))

//     function Data() {
//         setData(GetPosts(limit))
//     }

//     function handleReached() {
//         setLimit(limit + 5)
//         Data()
//     }

//     function Delete(index) {
//         console.log('Delete: ' + index);
//         console.log(Object.keys(data)[0]);
//     }

//     return (
//         <Modal animationType='slide' visible={isVisible} transparent={true} >
//             <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//                 <FlatList
//                     data={Object.values(data)}
//                     style={{ backgroundColor: "#0000" }}
//                     onEndReachedThreshold={.10}
//                     onEndReached={() => { handleReached() }}
//                     ListFooterComponent={<View></View>}
//                     renderItem={({ item, index }) => {
//                         return (
//                             <Item onDelete={() => {Delete(index)}} Name={item.USER_NAME} Time={item.DATE_TIME} Category={item.CATEGORY} Content={item.POST} Quote={item.QUOTE} />
//                         )
//                     }}
//                 />
//                 <TwoFaceButton
//                     label1={'Voltar'}
//                     label2={'Atualizar'}
//                     method1={onPressButton1}
//                     method2={() => { console.log('Atualizar'); Data() }}
//                 />
//             </View>
//         </Modal>
//     )
// }

// const email = "shaznilmussagysulemane@gmail.com"
// const password = "Sm030106"

// export default function App() {

//     const [isCreatePostVisible, setIsCreatePostVisible] = useState(false)
//     const [isShowPostVisible, setIsShowPostVisible] = useState(false)
//     const [isStarted, setIsStarted] = useState(true)

//     useEffect(() => {
//         if (!isStarted) {
//             console.log('Started!!!');
//             setIsCreatePostVisible(false)
//             setIsShowPostVisible(false)
//             setIsStarted(true)
//         }
//     })

//     const [isLogged, setIsLogged] = useState(false)

//     const check = () => {
//         VerifyAuthentication().then(
//             (value) => {
//                 console.log(value)
//             }
//         )
//     }
//     console.log(isShowPostVisible)

//     return (
//         <TouchableWithoutFeedback>
//             <View style={styles.container}>
//                 <CreatePost
//                     isVisible={isCreatePostVisible}
//                     onPressButton1={() => { setIsCreatePostVisible(false) }}
//                 />
//                 <ShowPost
//                     isVisible={isShowPostVisible}
//                     onPressButton1={() => { setIsShowPostVisible(false) }}
//                 />

//                 <Button label={'Verify Authentication'} method={check} />
//                 <Button label={'Sign In'} method={() => SignIn(email, password)} />
//                 <Button label={'Sign Out'} method={() => SignOut()} />
//                 <Button label={'Get Authentication'} method={() => GetAuthentication().then((user) => console.log(user))} />
//                 <Button label={'Sign  Up'} method={() => SignUp('shaznilmussagysulemane@gmail.com', 'Sm030106').then((value) => console.log(value))} />
//                 <Button label={'Get Posts'} method={() => GetPosts().then((value) => { console.log(value) })} />
//                 <Button label={'Generate Posts'} method={() => GeneratePosts()} />
//                 <Button label={'Add Posts'} method={() => setIsCreatePostVisible(true)} />
//                 <Button label={'Show Posts'} method={() => setIsShowPostVisible(true)} />

//             </View>
//         </TouchableWithoutFeedback>
//     )
// }

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         padding: 20,
//         gap: 10,
//         backgroundColor: 'orange'
//     }
// })

























