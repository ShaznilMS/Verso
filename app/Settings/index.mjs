import AsyncStorage from "@react-native-async-storage/async-storage";
import sha256 from "sha256";

let isLogged = false

function isEmailValid(Email) {

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

function isPasswordValid(Password = '') {
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