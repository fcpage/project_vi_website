import {startSession, destroySession, getSessionUser, getSessionAuth, getSessionLogin} from "../util/sessionFunctions.js";
import {getCookie, setCookie} from "../util/cookieFunctions.js";

const verify = document.getElementById("verify");   //grab the login verification display field in HTML

startSession();     //make sure there is a session
getSessionUser();   //make a JS cookie for the session user
getSessionAuth();   //make a JS cookie for the session authorization
getSessionLogin();  //make a JS cookie for the login state
const user = getCookie("user");     //assign the cookie to a local variable
const auth = getCookie("auth");     //assign the cookie to a local variable
let login = getCookie("login");     //assign the cookie to a mutable local variable

if ((user !== String(false)) && (auth !== String(false))){    //if both the user and auth credentials are valid
    console.log("User: " + user);   //report to console
    console.log("Auth: " + auth);   //report to console
    console.log('Login: '+ login);  //report to console
    verify.innerHTML = `Welcome, ${user}!<br/>` +
        'Please <a href="../../html/requests/logout.html">' +
        'LOG OUT</a> when you\'re finished.';     //a nice, personalized welcome message
} else if (login === String(false)) {       //unless the login failed
    destroySession();   //kill the session
    setCookie("login", String(false));  //make sure that the login cookie is false after it gets wiped by the session close
    console.log("User: " + getCookie("user"));   //report to console
    console.log('Login: '+ getCookie("login"));   //report to console
    window.location.replace("../../html/requests/login.html");  //redirect to the login page
} else {    //error handling
    fetch(window.location.href, {cache: 'reload'})    //refresh the cache
    .then(() => {window.location.reload();});   //reload the current page
}