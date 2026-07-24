import {startSession, destroySession, getSessionUser, getSessionAuth, getSessionLogin} from "../util/sessionFunctions.js";
import {getCookie, setCookie} from "../util/cookieFunctions.mjs";

const verify = document.getElementById("verify");   //grab the login verification display field in HTML
const page = document.getElementById("page");

startSession();     //make sure there is a session
getSessionUser();   //make a JS cookie for the session user
getSessionAuth();   //make a JS cookie for the session authorization
getSessionLogin();  //make a JS cookie for the login state
let user = getCookie("user");
let auth = getCookie("auth");
let login = getCookie("login");

if ((user !== "undefined") &&
    (user !== "false") &&
    (auth !== "undefined" ) &&
    (auth !== "false") &&
    (login !== "undefined") &&
    (login !== "false")) {    //if each of the user, auth credentials, and login status are valid

    greet();

    if (verify.innerHTML.includes("undefined") || verify.innerHTML.includes("false")){  //check if the script jumped the gun and needs to check again
        shun();
        window.location.reload();   //reload
    } else {
        greet();
    }
} else {
    destroySession();   //kill the session
    setCookie("login", String(false));  //make sure that the login cookie is false after it gets wiped by the session close
    console.log("User: " + getCookie("user"));   //report to console
    console.log('Login: '+ getCookie("login"));   //report to console
    window.location.replace("../../html/requests/login.html");  //redirect to the login page
}

function greet(){
    verify.innerHTML = `Welcome, ${getCookie("user")}!<br/>` +
        'Please <a href="../../html/requests/logout.html">' +
        'LOG OUT</a> when you\'re finished.';     //a nice, personalized welcome message
}

function shun(){
    page.innerHTML = "";
    verify.innerHTML = "";
}