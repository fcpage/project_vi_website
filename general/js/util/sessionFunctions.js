import {setCookie, eatCookie, eatCookies} from './cookieFunctions.mjs';
export function startSession(){
    fetch("../../php/requests/session_start.php")
        .then(response => {
            if (!response.ok) {eatCookies();
                console.error("Error Status: " + response.status);
                console.error("Error Message: " + response.statusText);}
            else {console.log('Session started successfully.');}})
        .catch(error => {eatCookies();
            console.error('Error verifying session:', error);
            return false;});
}

export function destroySession() {
    fetch("../../php/requests/session_destroy.php")
        .then(response => {
            if (!response.ok) {eatCookies();
                console.error("Error Status: " + response.status);
                console.error("Error Message: " + response.statusText);}
            else {eatCookies();
                console.log('Session destroyed successfully.');}})
        .catch(error => {eatCookies();
            console.error('Error ending session:', error);
            return false;});
}

export function getSessionUser() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/requests/get_session_user.php", true);
    xhr.onload = function() {
    if (xhr.status === 200) {
        const user = xhr.responseText;
        if (user !== (String(false)) || 'undefined') {
            setCookie('user', user);}
        else {eatCookie(user);
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;}}
    else {console.error("Error validating session. Error: ", xhr.status);}}
    xhr.send();
}

export function getSessionAuth() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/requests/get_session_auth.php", true);
    xhr.onload = function() {
    if (xhr.status === 200) {
        const auth = xhr.responseText;
        if (auth !== (String(false)) || 'undefined') {
            setCookie('auth', auth);}
        else {eatCookie(auth);
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;}}
    else {console.error("Error validating session. Error: ", xhr.status);
        return false;}}
    xhr.send();
}

export function getSessionLogin() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/requests/get_session_login.php", true);
    xhr.onload = function() {
    if (xhr.status === 200) {
        const login = xhr.responseText;
        if (login !== (String(false)) || 'undefined') {
            setCookie('login', login);}
        else {eatCookie(login);
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;}}
    else {console.error("Error validating session. Error: ", xhr.status);
        return false;}}
    xhr.send();
}