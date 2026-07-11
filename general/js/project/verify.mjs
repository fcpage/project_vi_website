import {startSession, destroySession, getSessionUser, getSessionAuth, getSessionLogin} from "./sessionFunctions.js";
import {getCookie, setCookie} from "./cookieFunctions.js";

startSession();
getSessionUser();
getSessionAuth();
getSessionLogin();
const user = getCookie("user");
const auth = getCookie("auth");
const login = setCookie(getCookie("login"), true);
const verify = document.getElementById("verify");

if ((user !== String(false)) &&
    (auth !== String(false))){
    let login = setCookie("login", String(true));
    console.log("User: " + user);
    console.log("Auth: " + auth);
    console.log('Login: '+ login);
    verify.innerHTML = `Welcome, ${user}!<br/>` +
        'Please <a href="../../../general/html/requests/logout.html">' +
        'LOG OUT</a> when you\'re finished.';
} else if (login === String(false)) {
    destroySession();
    setCookie("login", String(false));
    console.log("User: " + getCookie("user"));
    console.log('Login: '+ getCookie("login"));
    window.location.replace("../../html/requests/login.html");
}