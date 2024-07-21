import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ActionBar = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} style={styles.holder}>
                <FontAwesomeIcon color='#afaeae' icon={faHeart} />
                <Text style={{color:'#afaeae'}}>{props.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onPress} style={styles.holder}>
                <FontAwesomeIcon color='#afaeae' icon={faMessage} />
                <Text style={{color:'#afaeae'}}>{props.coments}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onPress} style={styles.holder}>
                <FontAwesomeIcon color='#afaeae' icon={faArrowUpFromBracket} />
                <Text style={{color:'#afaeae'}}>{props.shares}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f3f33',
        top:10
    },
    holder: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '20%',
        gap: 5
    }
})
