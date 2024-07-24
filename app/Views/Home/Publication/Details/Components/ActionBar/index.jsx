import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ActionBar = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={.8} onPress={props.onPress} style={styles.holder}>
                <FontAwesomeIcon size={18} color='#afaeae' icon={faHeart} />
                <Text style={{ color: '#afaeae', fontSize: 16 }}>{props.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.8} onPress={props.onPress} style={styles.holder}>
                <FontAwesomeIcon size={18} color='#afaeae' icon={faMessage} />
                <Text style={{ color: '#afaeae', fontSize: 16 }}>{props.coments}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.8} onPress={props.onPress} style={styles.holder}>
                <FontAwesomeIcon size={18} color='#afaeae' icon={faArrowUpFromBracket} />
                <Text style={{ color: '#afaeae', fontSize: 16 }}>{props.shares}</Text>
            </TouchableOpacity>
        </View>
    )
}


export default ActionBar

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth:1
    },
    holder: {
        gap: 5,
        width: '20%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    }
})
