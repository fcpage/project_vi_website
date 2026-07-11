import {setCookie, eatCookie, eatCookies} from './cookieFunctions.js';
export function startSession(){
    fetch("../../php/requests/session_start.php")
        .then(response => {
            if (!response.ok) {
                console.error(response.status);
                console.error(response.statusText);
                eatCookies();
            } console.log('Session started successfully.');})
        .catch(error => {
            eatCookies();
            console.error('Error verifying session:', error);});
}

export function destroySession() {
    fetch("../../php/requests/session_destroy.php")
        .then(response => {
            if (!response.ok) {
                console.error(response.status);
                console.error(response.statusText);
                eatCookies();
            } console.log('Session destroyed successfully.');
                eatCookies();})
        .catch(error => {eatCookies();
            console.error('Error ending session:', error);});
}

export function getSessionUser() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/requests/get_session_user.php", true);
    xhr.onload = function() {
    if (xhr.status === 200) {
        const user = xhr.responseText;
        if (user !== (String(false)) || 'undefined') {
            setCookie('user', user);
        } else {
            eatCookie(user);
        }
    } else {console.error("Error validating session. Error: ", xhr.status);}}
    xhr.send();
}

export function getSessionAuth() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/requests/get_session_auth.php", true);
    xhr.onload = function() {
    if (xhr.status === 200) {
        const auth = xhr.responseText;
        if (auth !== (String(false)) || 'undefined') {
            setCookie('auth', auth);
        } else {
            eatCookie(auth);
        }
    } else {console.error("Error validating session. Error: ", xhr.status);}}
    xhr.send();
}

export function getSessionLogin() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/requests/get_session_login.php", true);
    xhr.onload = function() {
    if (xhr.status === 200) {
        const login = xhr.responseText;
        if (login !== (String(false)) || 'undefined') {
            setCookie('login', login);
        } else {
            eatCookie(login);
        }
    } else {console.error("Error validating session. Error: ", xhr.status);}}
    xhr.send();
}