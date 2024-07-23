import { get, ref, push, update, limitToFirst, getDatabase, set, query } from "firebase/database";
import { app, auth } from "../../configs/firebase.config.mjs";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isLogged = false

export async function VerifyAuthentication() {
    const _authentication_local = await AsyncStorage.getItem('authentication')
    const _authentication_firebase = getAuth(app)

    console.log('Verify Authentication:');
    console.log(_authentication_firebase.currentUser);
    console.log(_authentication_local);

    if (_authentication_firebase.currentUser || _authentication_local) {
        isLogged = true
    } else {
        isLogged = false
    }

    return isLogged;
}

export async function GetAuthentication() {

    const _authentication_local = await AsyncStorage.getItem('authentication')
    const _authentication_firebase = getAuth(app)

    if (isLogged) {
        console.log("Is logged? :" + isLogged);
        if (_authentication_firebase.currentUser) {
            return {type: 'firebase', auth: _authentication_firebase.currentUser}
        }
        if (_authentication_local) {
            return {type: 'local', auth: _authentication_local}
        }
    } else {
        return {type: null, auth: null}
    }

}

async function SaveAuthentication(Authentication) {
    const _authentication = await AsyncStorage.setItem('authentication', JSON.stringify(Authentication))
}

export async function SignIn(Email = '', Password = '') {
    try {
        signInWithEmailAndPassword(auth, Email, Password)
            .then((value) => {
                SaveAuthentication(value.user)
                isLogged = true
            })
    } catch (error) {
        return error.code
    }
}

export async function SignOut() {
    try {
        signOut(auth)
            .then(async () => {
                await AsyncStorage.removeItem('authentication')
                isLogged = false
                console.log(isLogged, "Done|")
            })
    } catch (error) {
        console.log(error);
    }

}