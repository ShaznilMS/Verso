import { get, ref, push, remove, update, limitToFirst, getDatabase, set, query, Database } from "firebase/database";
import { app, auth } from "../../configs/firebase.config.mjs";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sha256 from "sha256";

let isLogged = false

const DATABASE = getDatabase(app)
const USER_REFERENCE = ref(DATABASE, 'USERS/')
const POST_REFERENCE = ref(DATABASE, 'POSTS/')

export function VerifyAuthentication() {
    let _authentication_local = null;

    async function getUserItem() {
        return await AsyncStorage.getItem('authentication').then((value) => { _authentication_local = value })
    }

    getUserItem()
    const _authentication_firebase = getAuth(app)

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

    if (_authentication_local || _authentication_firebase.currentUser) {
        if (_authentication_firebase.currentUser) {
            return { type: 'firebase', auth: _authentication_firebase.currentUser }
        }
        if (_authentication_local) {
            return { type: 'local', auth: _authentication_local }
        }
    } else {
        return { type: null, auth: null }
    }

}

async function SaveAuthentication(Authentication) {
    const _authentication = await AsyncStorage.setItem('authentication', JSON.stringify(Authentication))
}

export async function VersoSignIn(Email = '', Password = '') {
    let localIsLogged = false
    try {
        await signInWithEmailAndPassword(auth, Email, Password)
            .then((value) => {
                SaveAuthentication(value.user)
                isLogged = true
                localIsLogged = true
            })
        return localIsLogged
    } catch (error) {
        return error.code
    }

}

export async function VersoSignOut() {
    try {
        signOut(auth)
            .then(async () => {
                await AsyncStorage.removeItem('authentication')
                isLogged = false
            })
    } catch (error) {
        console.log(error);
    }
}

export async function VersoSignUp(Email = '', Password = '') {
    try {
        if (!_valid_email_combination(Email)) {
            return 'Email Inválido!'
        }

        if (Password.length < 8) {
            return 'A palavra palavra passe precisa ter no minimo 8 caracteres!'
        }

        if (!_valid_password_combination(Password)) {
            return 'Palavra passe inválida!'
        }

        let isCreated = ''

        await createUserWithEmailAndPassword(auth, Email, Password)
            .then(() => {
                isCreated = 'Usuário criado com sucesso!'
            })
            .catch((e) => {
                isCreated = e.code
            })

        return isCreated

        // console.log(_email, _valid_email);
    } catch (error) {
        return error
    }
}

export function GeneratePosts(Num = 3) {
    const QUERY = POST_REFERENCE

    let tm = new Date();

    const time = tm.getUTCFullYear() + '/' + (tm.getUTCMonth() + 1 < 10 ? '0' + (tm.getUTCMonth() + 1) : tm.getUTCMonth() + 1) + '/' + (tm.getUTCDate() < 10 ? '0' + tm.getUTCDate() : tm.getUTCDate())

    for (let i = 0; i < Num; i++) {
        push(QUERY, {
            USER_ID: sha256('shaznilmussagysulemane'),
            USER_NAME: 'Shaznil Mussagy Sulemane',
            POST: "Teste " + i,
            DATE_TIME: time,
            CATEGORY: "Filosoficas",
            QUOTE: '~ Socrates',
            STATUS: "Initial",
            IMAGE_ID: "0"
        }).then(() => {
            return 'Post adicionado com sucesso!'
        })
    }
}

export async function AddPosts(Data) {
    try {
        let LOG = ''
        const QUERY = POST_REFERENCE
        const { CONTEUDO, AUTOR, CATEGORIA, USER_ID, USER_NAME, IMAGE_ID } = Data

        let tm = new Date();
        const time = tm.getUTCFullYear() + '/' + (tm.getUTCMonth() + 1 < 10 ? '0' + (tm.getUTCMonth() + 1) : tm.getUTCMonth() + 1) + '/' + (tm.getUTCDate() < 10 ? '0' + tm.getUTCDate() : tm.getUTCDate())

        // console.log({
        //     USER_ID: USER_ID,
        //     USER_NAME: USER_NAME,
        //     POST: CONTEUDO,
        //     DATE_TIME: time,
        //     CATEGORY: CATEGORIA,
        //     QUOTE: AUTOR,
        //     STATUS: "Initial",
        //     IMAGE_ID: IMAGE_ID,
        //     VERIFIED: false
        // });

        console.log('Chegou!');


        await push(QUERY, {
            USER_ID: USER_ID,
            USER_NAME: USER_NAME,
            POST: CONTEUDO,
            DATE_TIME: time,
            CATEGORY: CATEGORIA,
            QUOTE: AUTOR,
            STATUS: "Initial",
            IMAGE_ID: IMAGE_ID,
            VERIFIED: false
        }).then((v) => {
            LOG =  'Post adicionado com sucesso!'
        })

        return LOG
    } catch (error) {
        return false
    }
}

let POSTS = []

export function GetPosts(Limit = 10) {
    const QUERY = query(POST_REFERENCE, limitToFirst(Limit))

    get(QUERY)
        .then((value) => {
            if (value) {
                POSTS = value.val()
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {

        })

    return POSTS;
}

export async function DeletePosts(ID) {
    try {
        const URI = 'POSTS/' + ID
        console.log(URI);
        const QUERY = ref(DATABASE, URI);
        remove(QUERY)
    } catch (error) {

    }
}

export async function CommentPost(ID, NAME, COMMENT) {
    const QUERY = ref(DATABASE, 'POSTS/' + ID + '/COMMENTARY/')

    const tm = new Date()

    const COMMENTARY = {
        Name: NAME,
        Time: tm.getUTCFullYear() + '/' + (tm.getUTCMonth() + 1 < 10 ? '0' + (tm.getUTCMonth() + 1) : tm.getUTCMonth() + 1) + '/' + (tm.getUTCDate() < 10 ? '0' + tm.getUTCDate() : tm.getUTCDate()),
        Comment: COMMENT
    }

    push(QUERY, COMMENTARY)
        .then(() => {

        })
        .catch((e) => {
            console.log(e);
        })
}

export async function LikePost(ID, USER_ID) {
    const QUERY = ref(DATABASE, 'POSTS/' + ID + '/LIKES/')

    const tm = new Date()

    push(QUERY, USER_ID)
        .then(() => {

        })
        .catch((e) => {
            console.log(e);
        })
}

export async function CountPostsLikes(ID) {
    const QUERY = ref(DATABASE, 'POSTS/' + ID + '/LIKES/')

    get(QUERY)
        .then((value) => {
            console.log(Object.values(value.val()).length);
        })
}

export async function CountPostsComments(ID) {
    const QUERY = ref(DATABASE, 'POSTS/' + ID + '/COMMENTARY/')

    get(QUERY)
        .then((value) => {
            console.log(Object.values(value.val()).length);
        })
}


export async function AddUserToDatabase(Email, Data) {
    const email = Email.replace(' ', '').toLowerCase()
    try {
        let LOG = true
        const QUERY = ref(DATABASE, 'USERS/' + sha256(email))

        set(QUERY, Data)
            .then(() => {
                LOG = true
            })
            .catch((error) => {
                console.log("Add to database:", error.code);
                LOG = false
            })
        return LOG
    } catch (error) {
        return error
    }
}

function _valid_email_combination(Email) {

    const _email = Email.toLowerCase()
    const _email_at = _email.includes('@')
    const _email_dot = _email.includes('.')

    let _isValid = true
    const _valid_email = (_email_at && _email_dot)

    if (_valid_email && contarCaractere(_email, '@') == 1 && contarCaractere(_email, ' ') == 0) {
        const _username = _email.split('@')
        if (_username.length > 2) {
            _isValid = false
        } else {
            const _userhost = _email.split('@')[1].split('.')
            const _userhost_prefix = _userhost[0].split('')
            const _userhost_sufix = _userhost[1].split('')

            const _email_domain_name = _username[1].split('.')
            _email_domain_name.map((value) => {
                if (value == '') {
                    _isValid = false
                }
            })
            if (_isValid) {
                _username[0].split('').map((value) => {
                    if (
                        value === 'a' ||
                        value === 'b' ||
                        value === 'c' ||
                        value === 'd' ||
                        value === 'e' ||
                        value === 'f' ||
                        value === 'g' ||
                        value === 'h' ||
                        value === 'i' ||
                        value === 'j' ||
                        value === 'k' ||
                        value === 'l' ||
                        value === 'm' ||
                        value === 'n' ||
                        value === 'o' ||
                        value === 'p' ||
                        value === 'q' ||
                        value === 'r' ||
                        value === 's' ||
                        value === 't' ||
                        value === 'u' ||
                        value === 'v' ||
                        value === 'w' ||
                        value === 'x' ||
                        value === 'y' ||
                        value === 'z' ||
                        value === '1' ||
                        value === '2' ||
                        value === '3' ||
                        value === '4' ||
                        value === '5' ||
                        value === '6' ||
                        value === '7' ||
                        value === '8' ||
                        value === '9' ||
                        value === '0' ||
                        value === '.'
                    ) {

                    } else {
                        _isValid = false
                    }
                })
                _userhost_prefix.map((value) => {
                    if (
                        value === 'a' ||
                        value === 'b' ||
                        value === 'c' ||
                        value === 'd' ||
                        value === 'e' ||
                        value === 'f' ||
                        value === 'g' ||
                        value === 'h' ||
                        value === 'i' ||
                        value === 'j' ||
                        value === 'k' ||
                        value === 'l' ||
                        value === 'm' ||
                        value === 'n' ||
                        value === 'o' ||
                        value === 'p' ||
                        value === 'q' ||
                        value === 'r' ||
                        value === 's' ||
                        value === 't' ||
                        value === 'u' ||
                        value === 'v' ||
                        value === 'w' ||
                        value === 'x' ||
                        value === 'y' ||
                        value === 'z'
                    ) {

                    } else {
                        _isValid = false
                    }
                })
                _userhost_sufix.map((value) => {
                    if (
                        value === 'a' ||
                        value === 'b' ||
                        value === 'c' ||
                        value === 'd' ||
                        value === 'e' ||
                        value === 'f' ||
                        value === 'g' ||
                        value === 'h' ||
                        value === 'i' ||
                        value === 'j' ||
                        value === 'k' ||
                        value === 'l' ||
                        value === 'm' ||
                        value === 'n' ||
                        value === 'o' ||
                        value === 'p' ||
                        value === 'q' ||
                        value === 'r' ||
                        value === 's' ||
                        value === 't' ||
                        value === 'u' ||
                        value === 'v' ||
                        value === 'w' ||
                        value === 'x' ||
                        value === 'y' ||
                        value === 'z'
                    ) {

                    } else {
                        _isValid = false
                    }
                })
            }
        }
    } else {
        _isValid = false
    }

    return _isValid
}

function _valid_password_combination(Password = '') {
    let _isValid = true

    if (contarCaractere(Password, ' ') > 0) {
        return false
    }


    Password.split('').map((value) => {
        // console.log(value);
        if (
            value === 'a' ||
            value === 'b' ||
            value === 'c' ||
            value === 'd' ||
            value === 'e' ||
            value === 'f' ||
            value === 'g' ||
            value === 'h' ||
            value === 'i' ||
            value === 'j' ||
            value === 'k' ||
            value === 'l' ||
            value === 'm' ||
            value === 'n' ||
            value === 'o' ||
            value === 'p' ||
            value === 'q' ||
            value === 'r' ||
            value === 's' ||
            value === 't' ||
            value === 'u' ||
            value === 'v' ||
            value === 'w' ||
            value === 'x' ||
            value === 'y' ||
            value === 'z' ||
            value === 'A' ||
            value === 'B' ||
            value === 'C' ||
            value === 'D' ||
            value === 'E' ||
            value === 'F' ||
            value === 'G' ||
            value === 'H' ||
            value === 'I' ||
            value === 'J' ||
            value === 'K' ||
            value === 'L' ||
            value === 'M' ||
            value === 'N' ||
            value === 'O' ||
            value === 'P' ||
            value === 'Q' ||
            value === 'R' ||
            value === 'S' ||
            value === 'T' ||
            value === 'U' ||
            value === 'V' ||
            value === 'W' ||
            value === 'X' ||
            value === 'Y' ||
            value === 'Z' ||
            value === '1' ||
            value === '2' ||
            value === '3' ||
            value === '4' ||
            value === '5' ||
            value === '6' ||
            value === '7' ||
            value === '8' ||
            value === '9' ||
            value === '0' ||
            value === '!' ||
            value === '@' ||
            value === '#' ||
            value === '$' ||
            value === '%' ||
            value === '^' ||
            value === '&' ||
            value === '*'

            // !, @, #, $, %, ^, &, *

        ) {

        } else {
            _isValid = false
        }
    })

    return _isValid

}

function contarCaractere(str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === char) {
            count++;
        }
    }
    return count;
}