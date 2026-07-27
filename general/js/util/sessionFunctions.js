import {setCookie, eatCookie, eatCookies, getCookie} from './cookieFunctions.mjs';
export async function startSession() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/elevator/sessionHandler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const report = xhr.responseText;
            console.log(report);
            console.log('Session started successfully.');}
        else {
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;
        }
    }
    xhr.send(JSON.stringify({action: "start"}));
}

export async function destroySession() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/elevator/sessionHandler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            eatCookies();
            console.log('Session destroyed successfully.');}
        else {
            eatCookies();
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;
        }
    }
    xhr.send(JSON.stringify({action: null}));
}

export async function getSessionUser() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/elevator/sessionHandler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
    if (xhr.status === 200) {
        const user = xhr.responseText;
        if (user !== (String(false)) || 'undefined') {
            setCookie('user', user.replace(/["']/g, ""));}
        else {eatCookie(user);
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return "false";}}
    else {console.error("Error validating session. Error: ", xhr.status);}}
    xhr.send(JSON.stringify({action: "user"}));
}

export async function getSessionAuth() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/elevator/sessionHandler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
    if (xhr.status === 200) {
        const auth = xhr.responseText;
        if (auth !== (String(false)) || 'undefined') {
            setCookie('auth', auth.replace(/["']/g, ""));}
        else {eatCookie(auth);
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;}}
    else {console.error("Error validating session. Error: ", xhr.status);
        return false;}}
    xhr.send(JSON.stringify({action: "auth"}));
}

export async function getSessionLogin() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/elevator/sessionHandler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
    if (xhr.status === 200) {
        const login = xhr.responseText;
        if (login !== (String(false)) || 'undefined') {
            setCookie('login', login.replace(/["']/g, ""));}
        else {eatCookie(login);
            console.error("Error Status: " + xhr.status);
            console.error("Error Message: " + xhr.statusText);
            return false;}}
    else {console.error("Error validating session. Error: ", xhr.status);
        return false;}}
    xhr.send(JSON.stringify({action: "login"}));
}