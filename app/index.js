// // import { useState } from "react";
// // import { StyleSheet, Text, TouchableOpacity, View, Animated, Vibration } from "react-native";
// // import User from "./Views/Home/Publication/Components/User";
// // import ActionBar from "./Views/Home/Publication/Components/ActionBar";

// // export default function App(props) {

// //     const [selected, setSelected] = useState(false)

// //     const value = useState(new Animated.Value(1))[0]

// //     const font = useState(new Animated.Value(18))[0]

// //     const color = useState(new Animated.Value(0))[0]

// //     const clickIn = Animated.timing(value, {
// //         toValue: .6,
// //         duration: 500,
// //         useNativeDriver: false
// //     })

// //     const clickOut = Animated.timing(value, {
// //         toValue: 1,
// //         duration: 500,
// //         useNativeDriver: false
// //     })

// //     const zoomIn = Animated.timing(font, {
// //         toValue: 30,
// //         duration: 500,
// //         useNativeDriver: false
// //     })

// //     const zoomOut = Animated.timing(font, {
// //         toValue: 18,
// //         duration: 500,
// //         delay: 2000,
// //         useNativeDriver: false
// //     })

// //     // const dark = Animated.timing(color, {
// //     //     toValue: "#333333",
// //     //     duration: 1000,
// //     //     useNativeDriver: false
// //     // })

// //     return (
// //         <View style={styles.container}>

// //             <TouchableOpacity
// //                 onLongPress={() => {
// //                     clickIn.start();
// //                     setSelected(true);
// //                     console.log('Long Press')
// //                     Vibration.vibrate(40)
// //                 }}
// //                 onPressOut={() => {
// //                     clickOut.start()
// //                 }}
// //                 onPressIn={() => {
// //                     console.log('Blur');
// //                     setSelected(false)
// //                 }}
// //                 activeOpacity={1}
// //             >
// //                 <Animated.View style={[card.container, { opacity: value }, { backgroundColor: color }]}>

// //                     <User time={props.time} user={props.name} />
// //                     <View style={styles.content}>
// //                         <View>
// //                             <Animated.Text onLongPress={() => zoomIn.start()} onPressOut={() => zoomOut.start()} style={{ paddingHorizontal: 20, fontSize: font, textAlign: 'center', fontWeight: 500 }}>{props.text}</Animated.Text>
// //                             <Text style={{ textAlign: 'center', fontWeight: 700, top: 30 }}>{props.citation ? props.citation : ''}</Text>
// //                         </View>
// //                     </View>
// //                     <ActionBar likes='50' coments='3' shares='23' />
// //                 </Animated.View>
// //             </TouchableOpacity>
// //         </View>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         paddingVertical: 20,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         backgroundColor: "#ffffff"
// //     },
// //     content: {
// //         width: '100%',
// //         borderTopWidth: 1,
// //         paddingVertical: 30,
// //         borderBottomWidth: 1,
// //         borderColor: '#f5f5f5a4',
// //         backgroundColor: '#f5f5f5a4',
// //     }
// // })

// // const card = StyleSheet.create({
// //     container: {
// //         backgroundColor: "#fff"
// //     }
// // })

// <TouchableWithoutFeedback
// activeOpacity={.9}
// style={{ elevation: 0, shadowColor: "#fff" }}

// onLongPress={() => {
//     onSelect(index)
// }}
// >

// <View style={[publication.container, { backgroundColor: color }]}>
//     <View style={publication.top}>
//         <Image style={publication.user_profile} source={USER_PROFILE} />
//         <Text style={publication.user_name} numberOfLines={1} >{item.USER_NAME}</Text>
//     </View>

//     <Text style={publication.content}>{item.CONTENT}</Text>

//     <View style={publication.bottom_bar}>
//         <View style={publication.bottom}>
//             <FontAwesomeIcon size={22} color='#666666' icon={faHeart} />
//             <FontAwesomeIcon size={22} color='#666666' icon={faMessage} />
//             <FontAwesomeIcon size={22} color='#666666' icon={faArrowUpFromBracket} />
//         </View>
//         {isSelected ?
//             <View style={publication.bottom}>
//                 <TouchableOpacity
//                     onPress={() => {
//                         setEdited(false)
//                         setEdit(true)
//                     }}
//                 >

//                     <FontAwesomeIcon size={22} color='#666666' icon={faPen} />
//                 </TouchableOpacity>
//                 <FontAwesomeIcon size={22} color='#666666' icon={faTrashAlt} />
//             </View>
//             : []}
//     </View>
// </View>
// </TouchableWithoutFeedback>